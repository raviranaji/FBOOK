import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/core/services/auth.service';
import { User } from 'src/app/core/services/user';
import { UsersService } from '../../admin/services/users.service';
import { AlertService } from 'src/app/core/services/alert/alert.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-profile-setting',
  templateUrl: './profile-setting.component.html',
  styleUrls: ['./profile-setting.component.css']
})
export class ProfileSettingComponent implements OnInit {

  user:User;

  constructor(private route: ActivatedRoute, private router: Router, private authService:AuthService,private userService:UsersService,private alertService:AlertService) { }

  ngOnInit(): void {
    this.user = this.authService.getUserDetails();
  }

  updateProfileHandler(updateForm){
    this.alertService.clear();
    console.log(updateForm.value);
    this.userService.updateUserById(this.user._id,updateForm.value)
    .subscribe((res:any)=>{
      this.alertService.success("User Record Updated Successfully ...",true);
      console.log(res);
    });
    this.router.navigateByUrl('setting', {skipLocationChange: true}).then(() => {
      this.router.navigate(['setting']);
   });
    // this.router.navigate(['/setting'],{ relativeTo: this.route});
  }
}
