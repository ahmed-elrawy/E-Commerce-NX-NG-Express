/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @angular-eslint/component-selector */
import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { AlertService } from '../../../services/alert.service';
import { AuthService } from '../../../services/auth/auth.service';
import { CartService } from '../../../services/cart/cart.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
// Reactive forms
authCredentialsDto: FormGroup | undefined;
modalRef: BsModalRef | undefined
showPass = true;
@ViewChild('invalidCredentials', {static: true}) 
invCredentials: TemplateRef<any> | undefined;
constructor(
  private authService: AuthService,
  private router: Router,
  private CartService: CartService,
  private fb: FormBuilder,
  private alertService: AlertService,
  private modalService: BsModalService
) { 
  if (this.authService.isLoggedIn()) {
    this.router.navigate(['/home'])
  }
}

userLogin() {
  
  this.authService.login(this.authCredentialsDto?.value)?.subscribe(
    res => {
      localStorage.setItem("token", res.accessToken);
      this.authService.prepareUserData();
      this.router.navigate(['/home'])
    },
    error => {
      this.alertService.error(error);
      this.openModal(this.invCredentials!);
    }
  )
}

  ngOnInit(): void {
    this.authCredentialsDto = this.fb.group({
      username: new FormControl(null, Validators.required),
      password: new FormControl(null, Validators.required)
   });
  }

openModal(templet: TemplateRef<any>) {
  this.modalRef = this.modalService.show(templet)
}

hide(): void {
  this.modalRef!.hide();
}
}
