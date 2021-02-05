import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/core/services/auth.service';
import { Router } from '@angular/router';
import { FriendRequestService } from './friend-request.service';
import { Friend } from './friend';
import { UsersService } from '../../admin/services/users.service';
import { User } from 'src/app/core/services/user';

@Component({
  selector: 'app-friend-request',
  templateUrl: './friend-request.component.html',
  styleUrls: ['./friend-request.component.css']
})
export class FriendRequestComponent implements OnInit {

  constructor(private authService: AuthService, private router: Router, private friendReqService: FriendRequestService, private userService: UsersService) { }

  friendList: Friend[];
  userList:User[];

  ngOnInit(): void {
    if (this.authService.isAuth()) {
      this.router.navigate(['/friend-request']);
      this.authService.isLoggedInValue = true;
      this.authService.isAdminLoggedValue = this.authService.getUserDetails().isAdmin
    }
   // this.getAllFriends();
   this.getAllUsers();
  }

  getAllFriends() {
    this.friendReqService.getAllFriends()
      .subscribe((res: any) => {
        this.friendList = res;

        // this.friendList.forEach(element => {
        //   let id = element.userId.trim();
        //   console.log(id);
        //   this.userService.findUserById(id)
        //     .subscribe((res: any) => {
        //       console.log("User " + res);
        //       element['userName'] = res.firstName + " " + res.lastName;
        //     });

        // });
      });
  }


  getAllUsers(){
    this.userService.getUserList()
    .subscribe((res:any)=>{
      this.userList = res;
    });
  }    
}
