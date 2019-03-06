import { ActivatedRoute } from '@angular/router';
import { recievePageTitle } from '../actions/pageTitle.action';
import { Base } from './base';

export class Page extends Base {  
  constructor(
    store,
    private route: ActivatedRoute, 
  ) {
    super(store);
    setTimeout(this.init.bind(this), 0);
  }

  init() {
    let title = '';

    if (this.route.snapshot.data.title) {
      title = this.route.snapshot.data.title;
    }

    if (!title 
      && this.route.parent
      && this.route.parent.snapshot.data.title) {
      title = this.route.parent.snapshot.data.title;
    }

    if (!title) {
      return ;
    }

    this._store.dispatch(recievePageTitle(title));
  }
}
