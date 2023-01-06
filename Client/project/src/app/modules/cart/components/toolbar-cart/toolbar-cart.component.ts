import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { Roles } from 'src/app/modules/shared/models/Roles';
import { CartService } from 'src/app/modules/shared/services/cart.service';
import { UserService } from 'src/app/modules/shared/services/user.service';

@Component({
  selector: 'app-toolbar-cart',
  templateUrl: './toolbar-cart.component.html',
  styleUrls: ['./toolbar-cart.component.scss']
})
export class ToolbarCartComponent implements OnInit, OnDestroy {
  private unsubscribeEvents: Subject<void> = new Subject<void>();
  
  public totalItemCount: number = 0;
  public isLoggedIn: boolean = false;
  public deactivateCart: boolean = false;

  constructor(private cartService: CartService, public userService: UserService) { }

  async ngOnInit(): Promise<void> {
    this.cartService.cart.pipe(takeUntil(this.unsubscribeEvents)).subscribe({
      next: cart => {
        if (this.deactivateCart)
          return;

        this.totalItemCount = cart.reduce((sum, current) => sum + current.quantity, 0);
      }
    });

    this.userService.userInfo.pipe(takeUntil(this.unsubscribeEvents)).subscribe({
      next: info => {
        this.deactivateCart = info == null ? false : info.roles.findIndex(r => r === Roles.Customer) < 0
      }
    });

    this.userService.isLoggedIn.pipe(takeUntil(this.unsubscribeEvents)).subscribe({
      next: (isLoggedIn: boolean) => this.isLoggedIn = isLoggedIn
    });

    await this.cartService.getCart();
    await this.userService.getUserInfo();
  }

  ngOnDestroy(): void {
    console.log("destroy");
    this.unsubscribeEvents.next();
    this.unsubscribeEvents.complete();
  }
}
