import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { passwordMatchValidator } from './password-match.validator';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';
import * as bcrypt from 'bcryptjs';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
})
export class AuthComponent implements OnInit {
  authForm!: FormGroup;
  mode: 'login' | 'register' = 'login';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    if (this.mode === 'login') {
      this.authForm = this.fb.group({
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(6)]],
      });
    } else {
      this.authForm = this.fb.group({
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(6)]],
        confirmPassword: ['', [Validators.required]],
      });
    }
  }

  switchMode(mode: 'login' | 'register'): void {
    this.mode = mode;
    this.initForm();
  }

  onSubmit(): void {
    if (this.authForm.valid) {
      if (this.mode === 'login') {
        this.login();
      } else if (this.mode === 'register') {
        if (passwordMatchValidator(this.authForm)) {
          alert('Les mots de passe ne correspondent pas');
          return;
        }
        this.register();
      }
    }
  }

  login() {
    this.authService.login(this.authForm.value).subscribe(
      (users: any[]) => {
        if (users.length === 0) {
          alert('Erreur dans le pseudo ou le mot de passe');
          return;
        }
        const user = users[0];

        const isPasswordCorrect = bcrypt.compareSync(
          this.authForm.value.password,
          user.password
        );
        if (!isPasswordCorrect) {
          alert('Erreur dans le pseudo ou le mot de passe');
          return;
        }

        this.authService.user = user;
        this.authService.saveUser();
        this.router.navigate(['/']);
      },
      (error: any) => {
        alert('Erreur dans la requête');
      }
    );
  }

  register() {
    this.authService.addUser(this.authForm.value);
    this.mode = 'login';
  }
}
