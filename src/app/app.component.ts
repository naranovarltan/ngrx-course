import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

import { AppState } from './reducers';
import { Logout } from './auth/auth.actions';
import { isLoggedIn } from './auth/auth.selectors';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  isLoggedIn$: Observable<boolean>;

  constructor(
    private store$: Store<AppState>,
    private router: Router
  ) {

  }

  ngOnInit() {
    this.isLoggedIn$ = this.store$
      .pipe(
        select(isLoggedIn)
      );
  }

  logout() {
    this.store$.dispatch(new Logout());
  }


}
