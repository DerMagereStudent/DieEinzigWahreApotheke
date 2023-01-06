import { Component, Input, OnInit } from '@angular/core';
import { Medicine } from 'src/app/modules/shared/models/Medicine';
import { OrderItem } from 'src/app/modules/shared/models/OrderItem';

@Component({
  selector: 'app-user-order-item',
  templateUrl: './user-order-item.component.html',
  styleUrls: ['./user-order-item.component.scss']
})
export class UserOrderItemComponent implements OnInit {
  @Input() public medicine?: Medicine;
  @Input() public orderItem?: OrderItem;

  constructor() { }

  ngOnInit() {
  }

}
