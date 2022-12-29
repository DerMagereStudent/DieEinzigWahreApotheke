import { Component, Input, OnInit } from '@angular/core';
import { CartService } from 'src/app/modules/shared/services/cart.service';

@Component({
  selector: 'app-add-to-cart',
  templateUrl: './add-to-cart.component.html',
  styleUrls: ['./add-to-cart.component.scss']
})
export class AddToCartComponent implements OnInit {
  @Input() public pzn?: string;
  public quantity: number = 1;

  constructor(private cartService: CartService) { }

  ngOnInit() {
  }

  public async addToCart(): Promise<void> {
    if (this.pzn == null)
      return;

    await this.cartService.addToCart({pzn: this.pzn, quantity: this.quantity})
  }
}
