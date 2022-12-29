import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/modules/shared/services/user.service';

@Component({
  selector: 'app-user-toolbar',
  templateUrl: './user-toolbar.component.html',
  styleUrls: ['./user-toolbar.component.scss']
})
export class UserToolbarComponent implements OnInit {
  public menuItems = [
    {
      label: "Profile",
      command: () => {/*profile*/}
    },
    {
      label: "Logout",
      command: () => {
        this.userService.logout().then(() => window.location.reload())
      }
    }
  ];

  constructor(public userService: UserService) {
    this.userService.checkAuthenticated();
  }

  ngOnInit() {
  }

}
