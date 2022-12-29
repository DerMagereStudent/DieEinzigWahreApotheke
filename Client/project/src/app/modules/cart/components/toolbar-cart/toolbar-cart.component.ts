import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
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

  constructor(private cartService: CartService, public userService: UserService) { }

  ngOnInit() {
    this.cartService.cart.pipe(takeUntil(this.unsubscribeEvents)).subscribe({
      next: cart => {
        this.totalItemCount = cart.reduce((sum, current) => sum + current.quantity, 0);
      },
      error: error => console.log(error)
    });
  }

  ngOnDestroy(): void {
    console.log("destroy");
    this.unsubscribeEvents.next();
    this.unsubscribeEvents.complete();
  }
}
