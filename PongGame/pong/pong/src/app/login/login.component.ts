import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, 
  ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { first } from 'rxjs/operators'; 

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})

export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  submitted = false;

  constructor(private formBuilder: FormBuilder,
    private authService: AuthService, public router: Router) { 
      if (this.authService.currentUserValue) { 
        this.router.navigate(['/']);
      }
    }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: ['', <any>Validators.required],
      password: ['', <any>Validators.required]
    });
  }

 login()
 {
  this.submitted = true;

  if (this.loginForm.invalid) {
      return;
  }

  localStorage.removeItem('currentUser');
  
  this.authService.login(this.loginForm.controls['username'].value, 
    this.loginForm.controls['password'].value)
    .subscribe(
      data => {
        localStorage.setItem('currentUser', JSON.stringify(
          { token: data, name: this.loginForm.controls['username'].value }));
        this.router.navigate(['/game']);
      })
 }
}
