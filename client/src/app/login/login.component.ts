import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm = this.fb.group({
    name: ['', [Validators.required,
      Validators.maxLength(12),
      Validators.minLength(3)],
    ],
    password: ['', [Validators.required,
      Validators.maxLength(12),
      Validators.minLength(3),]],
  });

  constructor(
    private formBuilder: FormBuilder,
    private fb: FormBuilder,) {
  }

  onSubmit() {
    console.warn(this.loginForm.value);
  }
}

