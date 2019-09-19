import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, 
  ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { first } from 'rxjs/operators';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})

export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  submitted = false;

  constructor(private formBuilder: FormBuilder,
    private authService: AuthService, public router: Router) { 
      if (this.authService.currentUserValue) { 
        this.router.navigate(['/']);
      }
    }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      username: ['', <any>Validators.required],
      password: ['', <any>Validators.required]
    });
  }

register()
{
  if (this.registerForm.invalid) {
    return;
}

this.authService.register(this.registerForm.controls['username'].value, 
this.registerForm.controls['password'].value)
    .pipe(first())
    .subscribe(
        data => {
            this.router.navigate(['']);
        },
        error => {
          alert("Error, try again");
        });
}
}
