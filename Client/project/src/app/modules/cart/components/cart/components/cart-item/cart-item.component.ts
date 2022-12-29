import { Component, Input, OnInit } from '@angular/core';
import { Medicine } from 'src/app/modules/shared/models/Medicine';
import { CartService } from 'src/app/modules/shared/services/cart.service';
import { MedicineService } from 'src/app/modules/shared/services/medicine.service';

@Component({
  selector: 'app-cart-item',
  templateUrl: './cart-item.component.html',
  styleUrls: ['./cart-item.component.scss']
})
export class CartItemComponent implements OnInit {
  private _quantity: number = 1;

  @Input() public pzn?: string;
  @Input() public set initialQuantity(value: number) { this._quantity = value };

  public get quantity(): number { return this._quantity; }
  public set quantity(value: number) {
    let oldValue = this._quantity;
    this._quantity = value;
    this.updateQuantity(oldValue);
  }

  @Input() public medicine?: Medicine;

  constructor(private cartService: CartService, private medicineService: MedicineService) { }

  ngOnInit() {
  }

  private async updateQuantity(oldValue: number): Promise<void> {
    if (this.pzn == null)
      return;

    var updateResult = await this.cartService.updateQuantity({pzn: this.pzn, quantity: this._quantity});
    if (!updateResult.succeeded) {
      this._quantity = oldValue;
      return;
    }

    await this.cartService.getCart();
  }
}
