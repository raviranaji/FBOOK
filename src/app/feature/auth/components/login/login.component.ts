import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../../core/services/auth.service';
import { AlertService } from 'src/app/core/services/alert/alert.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private authService: AuthService, private router: Router, private alertService: AlertService) { }

  ngOnInit(): void {
    if (this.authService.isAuth()) {
      this.router.navigate(['/home']);
      this.authService.isLoggedInValue = true;
      this.authService.isAdminLoggedValue = this.authService.getUserDetails().isAdmin
    }
  }

  loginHandler(loginFormData: any): void {
    console.log(loginFormData);

    this.alertService.clear();

    this.authService.login(loginFormData.value)
      .subscribe((res: any) => {
        console.log(res.status);

        if (res && res.token && res.isActive) {
          this.alertService.success('Login success redirected to home ..', true);
          // setTimeout(function(this.authService:){ alert("Hello"); }, 1000);
          this.authService.isLoggedInValue = true;
          this.authService.saveToken(res.token);
          this.authService.saveUserDetails(res);
          this.authService.isAdminLoggedValue = res.isAdmin;
          this.router.navigate(['/home']);
        }else{
          this.alertService.success('Your Account is locked kindly contact administrator..', true);
        }
      });
  }
}
