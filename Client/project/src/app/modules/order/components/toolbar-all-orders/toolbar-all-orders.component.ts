import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { Roles } from 'src/app/modules/shared/models/Roles';
import { OrderService } from 'src/app/modules/shared/services/order.service';
import { UserService } from 'src/app/modules/shared/services/user.service';

@Component({
  selector: 'app-toolbar-all-orders',
  templateUrl: './toolbar-all-orders.component.html',
  styleUrls: ['./toolbar-all-orders.component.scss']
})
export class ToolbarAllOrdersComponent implements OnInit, OnDestroy {
  private unsubscribeEvents: Subject<void> = new Subject();
  public userIsPharmacist: boolean = false;

  constructor(private userService: UserService, private orderService: OrderService) { }

  ngOnInit() {
    this.userService.userInfo.pipe(takeUntil(this.unsubscribeEvents)).subscribe({
      next: userInfo => this.userIsPharmacist = userInfo == null ? false : userInfo.roles.findIndex(r => r === Roles.Pharmacist) >= 0
    });
  }

  ngOnDestroy(): void {
    this.unsubscribeEvents.next();
    this.unsubscribeEvents.complete();
  }
}
