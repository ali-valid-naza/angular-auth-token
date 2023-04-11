import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../services/auth-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm = this.fb.group({
    username: ['', [Validators.required,
      Validators.maxLength(12),
      Validators.minLength(3)],
    ],
    password: ['', [Validators.required,
      Validators.maxLength(12),
      Validators.minLength(3),]],
  });

  constructor(
    private formBuilder: FormBuilder,
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService,
  ) {
  }

  onSubmit() {
    if (this.loginForm.value.username && this.loginForm.value.password) {
      const {username, password} = this.loginForm.value;
      this.authService.login({username: username, password: password})
        .then(() => this.router.navigateByUrl('/counter'))
        .catch((message: string) => message);
    }
  }
}

