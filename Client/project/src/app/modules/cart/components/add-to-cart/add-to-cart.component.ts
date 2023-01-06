import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { Roles } from 'src/app/modules/shared/models/Roles';
import { CartService } from 'src/app/modules/shared/services/cart.service';
import { UserService } from 'src/app/modules/shared/services/user.service';

@Component({
  selector: 'app-add-to-cart',
  templateUrl: './add-to-cart.component.html',
  styleUrls: ['./add-to-cart.component.scss']
})
export class AddToCartComponent implements OnInit, OnDestroy {
  private unsubscribeEvents: Subject<void> = new Subject();

  @Input() public pzn?: string;
  public deactivateCart: boolean = false;
  public quantity: number = 1;

  constructor(private cartService: CartService, private userService: UserService) { }

  ngOnInit() {
    this.userService.userInfo.pipe(takeUntil(this.unsubscribeEvents)).subscribe({
      next: userInfo => this.deactivateCart = userInfo == null ? false : userInfo.roles.findIndex(r => r === Roles.Customer) < 0
    });
  }

  ngOnDestroy(): void {
    this.unsubscribeEvents.next();
    this.unsubscribeEvents.complete();
  }

  public async addToCart(): Promise<void> {
    if (this.pzn == null)
      return;

    await this.cartService.addToCart({pzn: this.pzn, quantity: this.quantity})
  }
}
