import { Component, OnInit, Input, OnChanges, ViewChild } from '@angular/core';
import { UsersService } from 'src/app/feature/admin/services/users.service';
import { User } from 'src/app/core/services/user';
import { Subscription } from 'rxjs';
import { AlertService } from 'src/app/core/services/alert/alert.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.css']
})
export class PopupComponent implements OnInit {

  userDetails: User = {
    isAdmin: false,
    isActive: false,
    _id: '',
    firstName: '',
    lastName: '',
    email: '',
    dob: '',
    gender: '',
    photoId: '',
    createdDate: '',
    token: ''
  };

  userDetailsValueSubscription: Subscription;

  @ViewChild('closebutton') closebutton;

  constructor(public userService: UsersService, private alertService: AlertService, private router: Router) { }

  ngOnInit(): void {
    this.userDetailsValueSubscription = this.userService.userDetails.subscribe(val => {
      this.userDetails = val;
    });
  }

  updateProfileHandler(updateForm) {
    this.alertService.clear();
    console.log(updateForm.value);
    this.userService.updateUserById(this.userDetails._id, updateForm.value)
      .subscribe((res: any) => {
        this.alertService.success("User Record Updated Successfully ...", true);
        console.log(res);
        this.closebutton.nativeElement.click();
      });
      this.router.navigateByUrl('users', {skipLocationChange: true}).then(() => {
        this.router.navigate(['users']);
     });


  }

}
