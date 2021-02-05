import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../../core/services/auth.service';
import { Router } from '@angular/router';
import { AlertService } from 'src/app/core/services/alert/alert.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  signupInfo: any = {
    email: 'eve.holt@reqres.in',
    password: 'pistol'
  };
  
  constructor( private authService: AuthService, private router: Router,private alertService : AlertService) { }

  ngOnInit(): void {
  }

  signupHandler(signupFormData): void{
    this.alertService.clear();
    console.log(signupFormData.value);
    this.authService.signup(signupFormData.value)
      .subscribe( (res: any) => {
        console.log(res);
        this.alertService.success('Signup successful! Redirected to Login Page...',true);
        this.router.navigate(['login']);
      });

  }

}
