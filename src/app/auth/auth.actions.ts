import { Action } from '@ngrx/store';

export enum AuthActionTypes {
  LoginAction = '[Auth] Login Action',
  LogoutAction = '[Auth] Logout Action'
}

export class Login implements Action {
  readonly type = AuthActionTypes.LoginAction;
  constructor(public payload: {user}) {

  }
}

export class Logout implements Action {
  readonly type = AuthActionTypes.LogoutAction;
}

export type AuthAction = Login | Logout;
