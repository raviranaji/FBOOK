import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/core/services/auth.service';
import { Router } from '@angular/router';
import { FriendRequestService } from '../network/friend-request/friend-request.service';
import { Friend } from '../network/friend-request/friend';
import { UsersService } from '../admin/services/users.service';

@Component({
  selector: 'app-friend',
  templateUrl: './friend.component.html',
  styleUrls: ['./friend.component.css']
})
export class FriendComponent implements OnInit {

  constructor(private authService: AuthService, private userService:UsersService,private router: Router,private friendReqService:FriendRequestService) { }

  friendList:Friend[];

  ngOnInit(): void {
    if (this.authService.isAuth()) {
      this.router.navigate(['/friends']);
      this.authService.isLoggedInValue = true;
      this.authService.isAdminLoggedValue = this.authService.getUserDetails().isAdmin
    }
    this.getAllFriends();
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


}
