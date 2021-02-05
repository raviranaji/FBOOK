import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/core/services/auth.service';
import { Router } from '@angular/router';
import { UsersService } from '../services/users.service';
import { User } from 'src/app/core/services/user';
import { AlertService } from 'src/app/core/services/alert/alert.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  userList: User[];
  userId: any;
  constructor(private authService: AuthService, private userService: UsersService, private router: Router, private alertService: AlertService) { }

  ngOnInit(): void {
    this.alertService.clear();
    if (this.authService.isAuth()) {
      this.router.navigate(['/users']);
      this.authService.isLoggedInValue = true;
      this.authService.isAdminLoggedValue = this.authService.getUserDetails().isAdmin
    }

    this.userService.getUserList()
      .subscribe((res: any) => {
        this.userList = res;
        console.log("userList : " + this.userList);
      });
  }


  passDataToPopUp(userid) {
    // document.getElementsByClassName('showHidePopupContainer')[0] = 'none';
    console.log("userId passed to Popup");

    this.userService.findUserById(userid)
      .subscribe((res: any) => {
        console.log("User " + res);
        this.userService.userDetailsValue = res;
        
        // document.getElementById('showHidePopupContainer')[0].display = 'visible';
      });
  }

  blockUser(){
    alert("Under Development");
  }
}
