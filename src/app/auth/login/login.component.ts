import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { catchError, tap } from 'rxjs/operators';
import { noop } from 'rxjs';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';

import { AuthService } from '../auth.service';
import { AppState } from '../../reducers';
import { Login } from '../auth.actions';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private store$: Store<AppState>
  ) {

    this.form = fb.group({
      email: ['test@angular-university.io', [Validators.required]],
      password: ['test', [Validators.required]]
    });

  }

  ngOnInit() {

  }

  login() {
    // this.store.dispatch(new Login());
    const { email, password } = this.form.value;
    this.authService.login(email, password)
      .pipe(
        tap(user => {
          this.store$.dispatch(new Login({user}));
          this.router.navigate(['/courses']);
        }),
        catchError((error) => {
          return error;
        })
      )
      .subscribe();
  }


}
