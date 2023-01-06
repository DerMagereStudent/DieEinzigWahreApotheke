import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/modules/shared/services/cart.service';
import { OrderService } from 'src/app/modules/shared/services/order.service';
import { UserService } from 'src/app/modules/shared/services/user.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {
  public addresses: {text: string, value: string}[] = []
  public shippingAddressId?: string;
  public billingAddressId?: string;
  public differentBillingAddress: boolean = false;

  public orderPlaced: boolean = false;
  public orderId?: string;

  constructor(private orderService: OrderService, private cartService: CartService, private userService: UserService) { }

  public async ngOnInit(): Promise<void> {
    var addressesResult = await this.userService.getAddresses();

    if (addressesResult.succeeded)
      this.addresses = addressesResult.data!.map(a => ({text: `${a.street} ${a.houseNr}, ${a.state}, ${a.country}`, value: a.id}))
  }

  public async placeOrder(): Promise<void> {
    console.log(this);

    if (this.shippingAddressId == null || (this.differentBillingAddress && this.billingAddressId == null))
      return;

    var orderResult = await this.orderService.placeOrder({shippingAddressId: this.shippingAddressId, billingAddressId: this.differentBillingAddress ? this.billingAddressId! : this.shippingAddressId});
    this.orderPlaced = true;
    this.orderId = orderResult.data;

    await this.cartService.getCart();
  }
}
