import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { login } from 'src/app/core/store/actions/auth.actions';
import {
  endLoading,
  startLoading
} from 'src/app/core/store/actions/spinner.actions';
import { AppState } from 'src/app/core/store/state/app.state';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  form: FormGroup;
  constructor(private fb: FormBuilder, private store: Store<AppState>) {
    this.getForm();
  }

  ngOnInit(): void {}

  getForm() {
    this.form = this.fb.group({
      email: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
  }
  showSpinner() {
    this.store.dispatch(startLoading());
    setTimeout(() => this.hideSpinner(), 5000);
  }
  hideSpinner() {
    this.store.dispatch(endLoading());
  }
  login() {
    if (this.form.invalid) return;
    const { email, password } = this.form.value;
    this.store.dispatch(login({ user: email, key: password }));
  }
}
