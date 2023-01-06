import { Component, OnInit } from '@angular/core';
import { Order } from 'src/app/modules/shared/models/Order';
import { OrderService } from 'src/app/modules/shared/services/order.service';

@Component({
  selector: 'app-user-orders',
  templateUrl: './user-orders.component.html',
  styleUrls: ['./user-orders.component.scss']
})
export class UserOrdersComponent implements OnInit {
  public page: number = 0;
  public pages: number = 5;
  public totalItemCount: number = 0;
  public itemsPerPage: number = 5;
  public orders: Order[] = [];

  constructor(private orderService: OrderService) { }

  ngOnInit() {
    this.orderService.getOrders({page: this.page, itemsPerPage: this.itemsPerPage}).then(result => {
      if (!result.succeeded)
        return;

      this.totalItemCount = result.data!.totalItemCount;
      this.pages = Math.ceil(this.totalItemCount / this.itemsPerPage);
      this.orders = result.data!.items;
    });
  }

  public async onPageChange(event: any): Promise<void> {

  }
}
