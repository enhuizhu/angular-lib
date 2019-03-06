import { Injectable } from '@angular/core';

import { ConfigService } from './config.service';
import { HttpService } from './http.service';
import { buildFilterBaseOnColumn, builderFiltersBaseOnColumnsWithOperator } from '../helpers/query-builder.helper';
import { isEmpty } from 'lodash';
import { Type } from '../constants/CompanyType';

@Injectable()
export class QueryService {

  constructor(
    public configService: ConfigService,
    public httpService: HttpService
  ) { 
  }

  getStrategiesContain(start: string, needObservable = false) {
    const columnsValuesObj = {  
      'Number': {value: [start], operator: 'contains'},
      'Name': {value: [start], operator: 'contains'},
    };
    
    const filter = `(${builderFiltersBaseOnColumnsWithOperator(columnsValuesObj, 'or')})&$top=50&$orderby=OpenDateTime`;
    return this.httpService.get(this.getUrl(`strategies?$filter=${filter}`), true, needObservable);
  }

  getStrategyByStrategyNumber(strategyNumber) {
    const filter = buildFilterBaseOnColumn('Number', [strategyNumber], 'eq');
    return this.httpService.get(this.getUrl(`strategies?$filter=(${filter})`), true);
  }

  getTraders() {
    return this.httpService.get(this.getUrl('traders'), true);
  }

  getInternalCompanies() {
    return this.httpService.get(this.getUrl('internalCompanies'), true);
  }

  getCompanies(contain: string, needObservable = false) {
    // const filter = buildFilterBaseOnColumn('Code', [contain], 'contains');
    const columnsValuesObj = { 
      'Code': {value: [contain], operator: 'contains'},
      'Name': {value: [contain], operator: 'contains'},
    };

    const filter = `(${builderFiltersBaseOnColumnsWithOperator(columnsValuesObj, 'or')}) and (Active eq true)&$top=50`;

    return this.httpService.get(this.getUrl(`companies?$filter=${filter}`), true, needObservable);
  }

  getOfficeLocations() {
    return this.httpService.get(this.getUrl('offices'), true);
  }

  getCurrencies() {
    return this.httpService.get(this.getUrl('currencies'), true);
  }

  getCosts() {
    return this.httpService.get(this.getUrl('costs'), true);
  }

  getOperatingDesks() {
    const filter = buildFilterBaseOnColumn('OperatingFlag', ['Y']);    
    return this.httpService.get(this.getUrl(`operatingDesks?$filter=${filter}`));
  }

  getTradingDesks() {
    const filter = buildFilterBaseOnColumn('ReportingFlag', [true]); 
    return this.httpService.get(this.getUrl(`tradingDesks?$filter=${filter}`), true);
  }

  getTradesBaseOnFilters(filterStr, sourceFrom, needObservable = false) {
    if (sourceFrom === 'strategyCosts') {
      if (!isEmpty(filterStr)) {
        filterStr += ' and ';
      }

      filterStr = `${filterStr}(ScrType eq 'Strategy-Level Cost')`;
    }

    return this.httpService.get(this.getUrl(`${sourceFrom}?$filter=${filterStr}`), needObservable);
  }

  getLinesOfBusiness() {
    return this.httpService.get(this.getUrl('linesOfBusiness'));
  }

  getMethodsOfTransport() {
    return this.httpService.get('assets/methodsOfTransport.json');
  }

  // ---------------------------------------------------------------
  // cached? Where does the cache sit and how is it defined?
  getCommodities(contains: string, needObservable = false) {
    const columnsValuesObj = {  
      'CommodityCode': {value: [contains], operator: 'contains'},
      'CommodityName': {value: [contains], operator: 'contains'},
    };

    const filter = `(${builderFiltersBaseOnColumnsWithOperator(columnsValuesObj, 'or')})&$top=50`;
    return this.httpService.get(this.getUrl(`commodities?$filter=${filter}`), true, needObservable);
  }

  getCounterparties(contains: string, needObservable = false) {
    const columnsValuesObj = {  
      'Code': {value: [contains], operator: 'contains'},
      'Name': {value: [contains], operator: 'contains'},
    };

    // Counterparties are of type C
    let filter = `Type eq '${Type.Counterparty}' and `;
    filter += `(${builderFiltersBaseOnColumnsWithOperator(columnsValuesObj, 'or')})&$top=50`;

    return this.httpService.get(this.getUrl(`companies?$filter=${filter}`), true, needObservable);
  }
  // ---------------------------------------------------------------

  getportfolios(filterStr, needObservable = false) {
    return this.httpService.get(this.getUrl(`portfolios?$filter=${filterStr}`), true, needObservable);
  }

  getbooks(filterStr, needObservable = false) {
    return this.httpService.get(this.getUrl(`books?$filter=${filterStr}`), true, needObservable);
  }

  getTradeById(idColumn, id, sourceFrom) {
    const filterStr = buildFilterBaseOnColumn(idColumn, [id], 'eq');
    return this.httpService.get(this.getUrl(`${sourceFrom}?$filter=${filterStr}`));
  }

  // ---------------------Unscheduled----------------------
  getUnscheduledDataDefinitions() {
    return this.httpService.get('assets/unscheduledDataDefinitions.json');
  }
  // ------------------------------------------------------


  // ---------------------Strategy Costs----------------------
  getStrategyCostDataDefinitions() {
    return this.httpService.get('assets/strategyCostDataDefinitions.json'); 
  }

  getStrategyCostUrl(url) {
    return `${this.configService.queryUrl}/Cost/StrategyCost/${url}`;
  }

  updateStrategyCost(data) {
    return this.httpService.put(this.getStrategyCostUrl('Put'), data);
  }

  createStrategyCost(data) {
    return this.httpService.post(this.getStrategyCostUrl('Post'), data);
  }

  getStrategyCost(stratNum, stratScrNum) {
    const filterStr = `strategyNumber=${stratNum}&strategyScrNumber=${stratScrNum}`;
    return this.httpService.get(this.getStrategyCostUrl(`Get?${filterStr}`));
  }

  DeleteStrategyCost(stratNum, stratScrNum) {
    const filterStr = `strategyNumber=${stratNum}&strategyScrNumber=${stratScrNum}`;
    return this.httpService.delete(this.getStrategyCostUrl(`Delete?${filterStr}`));
  }
  // ------------------------------------------------


  // ---------------------SWAPS----------------------
  getSwapViewUrl(url) {
    return `${this.configService.queryUrl}/Swap/SwapView/${url}`;
  }

  getSwapDataDefinitions() {
    return this.httpService.get('assets/swapDataDefinitions.json'); 
  }

  updateSwapView(data) {
    return this.httpService.put(this.getSwapViewUrl('Put'), data);
  }
  // ------------------------------------------------


  // ---------------------User Preferences----------------------
  getUserPref(type) {
    return this.httpService.get(this.getSavedSearchUrl(`GetAll?type=${type}`));
  }
  
  saveUserPref(data) {
    return this.httpService.post(this.getSavedSearchUrl('Create'), data);
  }

  updateUserPref(data) {
    return this.httpService.put(this.getSavedSearchUrl('Update'), data);
  }

  deleteUserPref(id) {
    return this.httpService.delete(this.getSavedSearchUrl(`Delete?id=${id}`));
  }
  // ----------------------------------------------------------

  getUrl(url) {
    return `${this.configService.queryUrl}/OilHubOdata/odata/${url}`;
  }

  getSavedSearchUrl(url) {
    return `${this.configService.savedSearchUrl}/${url}`;
  }
}
