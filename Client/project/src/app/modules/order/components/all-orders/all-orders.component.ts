import { Component, OnInit } from '@angular/core';
import { Order } from 'src/app/modules/shared/models/Order';
import { OrderService } from 'src/app/modules/shared/services/order.service';

@Component({
  selector: 'app-all-orders',
  templateUrl: './all-orders.component.html',
  styleUrls: ['./all-orders.component.scss']
})
export class AllOrdersComponent implements OnInit {
  public page: number = 0;
  public pages: number = 5;
  public totalItemCount: number = 0;
  public itemsPerPage: number = 5;
  public orders: Order[] = [];

  constructor(private orderService: OrderService) { }

  ngOnInit() {
    this.loadOrders();
  }

  public onPageChange(event: any): void {
    this.page = event.page;
    this.loadOrders();
  }

  public loadOrders(): void {
    this.orderService.getOrdersToApprove({page: this.page, itemsPerPage: this.itemsPerPage}).then(result => {
      if (!result.succeeded)
        return;

      this.totalItemCount = result.data!.totalItemCount;
      this.pages = Math.ceil(this.totalItemCount / this.itemsPerPage);
      this.orders = result.data!.items;
    });
  }

}
