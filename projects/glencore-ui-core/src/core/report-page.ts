import { ActivatedRoute } from '@angular/router';
import { each } from 'lodash';
import { Page } from './page';

export class ReportPage extends Page {  
  reportRoute: ActivatedRoute;
  
  constructor(
    store,
    route: ActivatedRoute, 
    private _parent
  ) {
    super(store, route);
    this.reportRoute = route;
    setTimeout(this.setActiveTab.bind(this), 10);
  }

  setActiveTab() {
    try {
      const path = this.reportRoute.snapshot.routeConfig.path;

      this._parent.tabTitles.map(v => {
         v.active =  v.href.split('/')[2] === path;
      });
    } catch (e) {
      console.log('error:', e);
    }
  }
}
