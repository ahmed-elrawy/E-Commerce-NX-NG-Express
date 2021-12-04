/* eslint-disable @angular-eslint/component-selector */
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  registrationForm: FormGroup | undefined

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) { }

get username() {
  return this.registrationForm?.get("authCredentialsDto")?.get("username")
}

get password() {
  return this.registrationForm?.get("authCredentialsDto")?.get("password")
}
ngOnInit() {
  if (this.authService.isLoggedIn()) {
    this.router.navigate(['/home']);
  }
  this.registrationForm  = this.fb.group({
    authCredentialsDto: new FormGroup({
      username: new FormControl(null, Validators.required),
      password: new FormControl(null)
    }),
    createProfileDto: new FormGroup({
      firstname: new FormControl(null, Validators.required),
      lastname: new FormControl(null, Validators.required),
      email: new FormControl(null, Validators.required),
      gender: new FormControl(null, Validators.required),
      age: new FormControl(null, Validators.required),
      phone: new FormControl(null, Validators.required),
      country: new FormControl(null, Validators.required),
      city: new FormControl(null, Validators.required),
      address: new FormControl(null, Validators.required),
    })
  });
}


register() {
  const userCredentials = {
    username: this.username?.value,
    password: this.password?.value
  };
 const userData = {
   ...userCredentials,
   ...this.registrationForm?.value.createProfileDto
 }
  this.authService
  .register(userData)
  ?.subscribe(() => {
    this.authService.login(userCredentials)?.subscribe(
      resToken => {
        localStorage.setItem('token', resToken.accessToken);
        this.authService.prepareUserData();
        this.authService.getCurrentUser()?.subscribe(
          resUser => {
            this.authService.currntUser = resUser;
          }
        );
        this.router.navigate(['/home']);
      },
      error => console.log(error)
    )
  })
}

}

