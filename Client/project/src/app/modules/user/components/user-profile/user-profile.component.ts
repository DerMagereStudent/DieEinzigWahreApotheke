import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {
  public menuItems: MenuItem[] = [
    {label: 'Persönlich', items: [{label: "Profil", styleClass: "ml-3", routerLink: "/user/profile/info"}]},
    {label: 'Bestellungen', items: [
      {label: "Bestellungen", styleClass: "ml-3", routerLink: "/user/profile/orders"},
      {label: "Rechnungen", styleClass: "ml-3"},
    ]},
  ]

  constructor() { }

  ngOnInit() {
  }

}
