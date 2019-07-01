import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { defer, of } from 'rxjs';

import { AuthActionTypes, Login, Logout } from './auth.actions';
import { StorageItemName } from '../model/storage-item-name.emun';

@Injectable()
export class AuthEffects {

  @Effect({dispatch: false})
  private login$ = this.actions$.pipe(
    ofType<Login>(AuthActionTypes.LoginAction),
    tap(action => localStorage.setItem(StorageItemName.USER, JSON.stringify(action.payload.user))),
  );

  @Effect({dispatch: false})
  private logout$ = this.actions$.pipe(
    ofType<Logout>(AuthActionTypes.LogoutAction),
    tap(() => {
      localStorage.removeItem(StorageItemName.USER);
      this.router.navigateByUrl('/login');
    }),
  );

  @Effect()
  private init$ = defer(() => {
    const user = localStorage.getItem(StorageItemName.USER);
    return user
      ? of(new Login(JSON.parse(user)))
      : <any>of(new Logout());
  });

  constructor(
    private actions$: Actions,
    private router: Router
  ) {}

}
