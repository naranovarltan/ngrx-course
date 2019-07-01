import { User } from '../model/user.model';
import { AuthAction, AuthActionTypes } from './auth.actions';

export interface AuthState {
  loggedIn: boolean;
  user: User;
}

export const initialAuthState: AuthState = {
  loggedIn: false,
  user: null
};

export function authReducer(
  state: AuthState = initialAuthState,
  action: AuthAction
): AuthState {
  switch (action.type) {
    case AuthActionTypes.LoginAction:
      return {
        loggedIn: true,
        user: action.payload.user
      };
    case AuthActionTypes.LogoutAction:
      return {
        loggedIn: false,
        user: null
      };
    default:
      return state;
  }
}
