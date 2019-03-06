declare var require: any;

import { each, isEmpty, isNumber, isDate, isArray, isBoolean, isObject } from 'lodash';

const moment = require('moment');
const serverTimeFormat = 'YYYY-MM-DDTHH:mm:ss';

const stringOperators = [
  'contains',
  'not contains',
  'startswith',
  'endswith',
];

// TODO need to be removed, only generic function can be put here
export function buildTraderFilter(traders) {
  return this.buildFilterBaseOnColumn('TraderInitials', traders);
}

// TODO need to be removed, the whole function can be replaced by buildFilterBaseOnColumn
export function buildDateRangeFilter(columnName, startDate, endDate) {
  return `$filter=${buildRangeFilter(columnName, getTimeIgnoreTimeZone(startDate), getTimeIgnoreTimeZone(endDate))}`;
}

export function getTimeIgnoreTimeZone(date) {
  return moment(date).format(serverTimeFormat) + 'z';
}

export function getUTCtime(date) {
  return moment(date).utc().format();
}

export function buildFilterBaseOnColumn(columnName: string, values: any[] = [], operator: string = 'eq', isIndicator: boolean = false) {
  let queryStr = '';

  if (operator === 'between') {
    if (values.length !== 2) {
      throw new Error('the length of values array must be 2');
    }

    // should check if values[0] or values[1] is Date
    queryStr += buildRangeFilter(columnName, 
      isDate(values[0]) ? getTimeIgnoreTimeZone(values[0]) : values[0], 
      isDate(values[1]) ? getTimeIgnoreTimeZone(values[1]) : values[1]
    );
  } else {
    values.forEach((value, i) => {
      if (i !== 0 && i < values.length) {
        queryStr += ' or ';
      }
      
      const transformedValue = getValue(value, isIndicator);
      
      if (transformedValue === null) {
        return '';
      } 

      if (stringOperators.indexOf(operator) !== -1) {
        queryStr += `${operator}(${toLowerColumn(value, columnName, isIndicator)}, ${getValue(value, isIndicator)})`;
      } else {
        queryStr += `${toLowerColumn(value, columnName, isIndicator)} ${operator} ${getValue(value, isIndicator)}`;
      }
    });
  }

  return queryStr;
}

export function getValue(value, isIndicator = false) {
  if (isNumber(value) || isBoolean(value)) {
    return value;
  } else if (isDate(value)) {
    return getTimeIgnoreTimeZone(value);
    // return getUTCtime(value);
  } else if (isIndicator) {
    return `'${value}'`;
  } else {
    const transformedValue = value && value.toLowerCase() || null;

    return transformedValue === null ? transformedValue : `'${transformedValue}'`;
  }
}

// Because OData is Case Sensitive...
export function toLowerColumn(value: any, columnName, isIndicator = false) {
  if (isNaN(value) && typeof(value) === 'string' && !isIndicator) {
    return columnName = 'tolower(' + columnName + ')';
  }
  return columnName;
}

export function buildRangeFilter(columnName, minValue, maxValue) {
  return `${columnName} ge ${minValue} and ${columnName} le ${maxValue}`;
}

export function builderFiltersBaseOnColumns(columnsValuesObj, logic = 'and', hasOperator = false) {
  let queryStr = '';
  let index = 0;

  each(columnsValuesObj, (obj, columnName) => {
    if (isEmpty(obj)) {
      return ;
    }

    if (obj.value 
      && isArray(obj.value)
      && obj.value.length === 0
    ) {
      return ;
    }

    if (index !== 0) {
      queryStr += ` ${logic} `;
    }

    queryStr += `(${buildFilterBaseOnColumn(columnName, hasOperator ? obj.value : obj, hasOperator ? obj.operator : 'eq', hasOperator ? obj.isIndicator : false )})`;
    index++;
  });

  // need to strip all the empty filter string
  queryStr = queryStr
    .replace(/\(\)\s(and|or)\s/, '')
    .replace(/\s(and|or)\s\(\)/, '')
    .replace(/\(\)/, '');
 
  return queryStr;
}

export function builderFiltersBaseOnColumnsWithOperator(filtersObj, logic = 'and') {
  return builderFiltersBaseOnColumns(filtersObj, logic, true);
}

