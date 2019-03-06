import { 
  buildTraderFilter, 
  buildDateRangeFilter,
  builderFiltersBaseOnColumns,
  builderFiltersBaseOnColumnsWithOperator,
  buildFilterBaseOnColumn,
  getValue,
  toLowerColumn,
} from './query-builder.helper';

describe('query builder', () => {
  it('build trader filter', () => {
    let traders = ['a'];
    let expectQuery = 'tolower(TraderInitials) eq \'a\'';
    expect(buildTraderFilter(traders)).toBe(expectQuery);
    
    traders = ['a', 'b'];
    expectQuery = 'tolower(TraderInitials) eq \'a\' or tolower(TraderInitials) eq \'b\'';
    expect(buildTraderFilter(traders)).toBe(expectQuery);

    traders = ['a', 'b', 'c'];
    expectQuery = 'tolower(TraderInitials) eq \'a\' or tolower(TraderInitials) eq \'b\' or tolower(TraderInitials) eq \'c\'';
    expect(buildTraderFilter(traders)).toBe(expectQuery);
  });

  it('buildDateRangeFilter', () => {
    let startDate = new Date(2012, 0, 1, 0, 0, 0);
    let endDate = new Date(2013, 0, 1, 23, 59, 59);
    
    let result = buildDateRangeFilter('ReportDate', startDate, endDate);
    let expectResult = '$filter=ReportDate ge 2012-01-01T00:00:00z and ReportDate le 2013-01-01T23:59:59z';
    
    expect(expectResult).toBe(result);

    startDate = new Date(2012, 0, 1, 0, 0, 0);
    endDate = new Date(2013, 2, 28, 23, 59, 59);
    
    result = buildDateRangeFilter('ReportDate', startDate, endDate);
    expectResult = '$filter=ReportDate ge 2012-01-01T00:00:00z and ReportDate le 2013-03-28T23:59:59z';
    
    expect(expectResult).toBe(result);
  });

  it('buildFilterBaseOnColumn', () => {
    let result = buildFilterBaseOnColumn('companies', ['glecore'], 'contains');
    let expectResult = 'contains(tolower(companies), \'glecore\')';
    expect(result).toBe(expectResult);

    result = buildFilterBaseOnColumn('companies', ['glecore'], 'startswith');
    expectResult = 'startswith(tolower(companies), \'glecore\')';
    expect(result).toBe(expectResult);

    result = buildFilterBaseOnColumn('companies', ['glecore'], 'endswith');
    expectResult = 'endswith(tolower(companies), \'glecore\')';
    expect(result).toBe(expectResult);

    result = buildFilterBaseOnColumn('companies', ['glecore'], 'not contains');
    expectResult = 'not contains(tolower(companies), \'glecore\')';
    expect(result).toBe(expectResult);

    result = buildFilterBaseOnColumn('OperatingFlag', ['Y']);
    expect(result).toEqual(`tolower(OperatingFlag) eq 'y'`);

    result = buildFilterBaseOnColumn('ReportingFlag', [true]);
    expect(result).toEqual(`ReportingFlag eq true`);
  });

  it('builderFiltersBaseOnColumns', () => {
    const columnsValuesObj: any = {
      'col1': ['a', 2],
      'col2': [1, '2'],
      'col3': [1, 2],
    };

    let expectResult = '(tolower(col1) eq \'a\' or col1 eq 2) and (col2 eq 1 or col2 eq \'2\') and (col3 eq 1 or col3 eq 2)';
    expect(builderFiltersBaseOnColumns(columnsValuesObj)).toBe(expectResult);

    // specify the logic value
    expectResult = '(tolower(col1) eq \'a\' or col1 eq 2) or (col2 eq 1 or col2 eq \'2\') or (col3 eq 1 or col3 eq 2)';
    expect(builderFiltersBaseOnColumns(columnsValuesObj, 'or')).toBe(expectResult);

    // expectResult = '(tolower(Number) eq \'1\' or tolower(col1) eq 2) or (tolower(col2) eq 1 or tolower(col2) eq 2) or (tolower(col3) eq 1 or tolower(col3) eq 2)';
  });

  it('builderFiltersBaseOnColumnsWithOperator', () => {
    let columnsValuesObj: any = {
      'col1': {value: [1, 2], operator: 'eq'},
      'col2': {value: [1, 2], operator: 'lt'},
      'col3': {value: [1, 2], operator: 'gt'},
    };

    let result = builderFiltersBaseOnColumnsWithOperator(columnsValuesObj);
    let expectResult = '(col1 eq 1 or col1 eq 2) and (col2 lt 1 or col2 lt 2) and (col3 gt 1 or col3 gt 2)';
    expect(result).toBe(expectResult);

    columnsValuesObj = {
      'col1': {value: [1, 2], operator: 'between'},
    };

    result = builderFiltersBaseOnColumnsWithOperator(columnsValuesObj);
    expectResult = '(col1 ge 1 and col1 le 2)';
    expect(result).toBe(expectResult);

    // check the scenario that it contains date
    columnsValuesObj = {
      'col1': {value: [new Date(2018, 8, 11), new Date(2018, 8, 12)], operator: 'between'},
    };

    result = builderFiltersBaseOnColumnsWithOperator(columnsValuesObj);
    expectResult = '(col1 ge 2018-09-11T00:00:00z and col1 le 2018-09-12T00:00:00z)';
    expect(result).toBe(expectResult);


    // check scenario that operator is contains
    columnsValuesObj = {
      'col1': {value: ['glencore'], operator: 'contains'},
    };

    result = builderFiltersBaseOnColumnsWithOperator(columnsValuesObj);
    expectResult = '(contains(tolower(col1), \'glencore\'))';
    expect(result).toBe(expectResult);

    columnsValuesObj = {
      'col1': {value: [true], operator: 'eq'},
    };

    result = builderFiltersBaseOnColumnsWithOperator(columnsValuesObj);
    expectResult = '(col1 eq true)';
    expect(result).toBe(expectResult);


    columnsValuesObj = {
      'Number': {value: ['test'], operator: 'contains'},
      'Name': {value: ['test'], operator: 'contains'},
    };

    result = builderFiltersBaseOnColumnsWithOperator(columnsValuesObj, 'or');
    expectResult = `(contains(tolower(Number), 'test')) or (contains(tolower(Name), 'test'))`;
    expect(result).toEqual(expectResult);
  });

  it('test the scenario that filter value is null', () => {
    // check the scenario that date value is null
    let columnsValuesObj: any = {
      'col1': {value: [null], operator: 'gt'},
    };

    let result = builderFiltersBaseOnColumnsWithOperator(columnsValuesObj);
    expect(result).toBe('');

    columnsValuesObj = {
      'col1': {value: [null], operator: 'gt'},
      'col2': {value: ['t'], operator: 'eq'},
    };

    result = builderFiltersBaseOnColumnsWithOperator(columnsValuesObj);
    expect(result).toEqual('(tolower(col2) eq \'t\')');

    columnsValuesObj = {
      'col2': {value: ['t'], operator: 'eq'},
      'col3': {value: ['t2'], operator: 'eq'},
      'col1': {value: [null], operator: 'gt'},
    };

    result = builderFiltersBaseOnColumnsWithOperator(columnsValuesObj);
    expect(result).toEqual('(tolower(col2) eq \'t\') and (tolower(col3) eq \'t2\')');

    result = builderFiltersBaseOnColumnsWithOperator(columnsValuesObj, 'or');
    expect(result).toEqual('(tolower(col2) eq \'t\') or (tolower(col3) eq \'t2\')');
  });

  it('test scenario that filter is indicator', () => {
    const columnsValuesObj = {
      'Number': {value: ['Test'], operator: 'contains', isIndicator: true},
      'Name': {value: ['test'], operator: 'contains'},
    };

    const result = builderFiltersBaseOnColumnsWithOperator(columnsValuesObj, 'or');
    const expectResult = `(contains(Number, 'Test')) or (contains(tolower(Name), 'test'))`;
    expect(result).toEqual(expectResult);
  });

  it('test scenario that value is empty', () => {
    const columnsValuesObj: any = {
      'col1': {value: [], operator: 'eq'},
      'col2': {value: [2], operator: 'eq'},
    };

    const result = builderFiltersBaseOnColumnsWithOperator(columnsValuesObj);
    expect(result).toBe('(col2 eq 2)');
  });

  it('getValue', () => {
    expect(getValue(1)).toBe(1);
    expect(getValue('a')).toBe(`'a'`);

    // check the scenario that the type of parameter is date
    const testDate = new Date(2018, 8, 12);
    const result  = getValue(testDate);
    expect(result).toBe('2018-09-12T00:00:00z');
  });

  it('toLowerColumn', () => {
    expect(toLowerColumn('test', 'test')).toEqual('tolower(test)');
    expect(toLowerColumn(1, 'test')).toEqual('test');
    expect(toLowerColumn('1', 'test')).toEqual('test');
    expect(toLowerColumn(true, 'test')).toEqual('test');
    expect(toLowerColumn(new Date(), 'test')).toEqual('test');
  });
});
