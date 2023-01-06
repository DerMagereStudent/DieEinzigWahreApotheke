import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Medicine } from 'src/app/modules/shared/models/Medicine';
import { Order } from 'src/app/modules/shared/models/Order';
import { MedicineService } from 'src/app/modules/shared/services/medicine.service';
import { OrderService } from 'src/app/modules/shared/services/order.service';

@Component({
  selector: 'app-all-orders-item',
  templateUrl: './all-orders-item.component.html',
  styleUrls: ['./all-orders-item.component.scss']
})
export class AllOrdersItemComponent implements OnInit {
  private _order?: Order;
  public medicine: { [pzn: string]: Medicine } = { }

  public dataLoaded: boolean = true;

  public get order(): Order | undefined { return this._order; }
  @Input() public set order(value: Order | undefined) {
    this._order = value;

    this.loadMedicine().then(() => {
      if (this._order != null)
        this._order.items = this._order.items.filter(i => this.medicine[i.pzn].requiresPrescription);
    });
  };

  @Output() public onOrderApproved: EventEmitter<void> = new EventEmitter();

  constructor(private medicineService: MedicineService, private orderService: OrderService) { }

  ngOnInit() {
  }

  public async loadMedicine(): Promise<void> {
    if (this._order == null)
      return;

    this.dataLoaded = false;
    var medicine = await this.medicineService.findByPzns({ pzns: this._order.items.map(i => i.pzn)});
    if (!medicine)
      return;

    this.medicine = Object.assign({}, ...medicine.map((m) => ({[m.pzn]: m})));
    this.dataLoaded = true;
  }

  public async approveOrder(): Promise<void> {
    if (this._order == null)
      return;

    var approveResult = await this.orderService.approveOrder({orderId: this._order.id});
    if (approveResult.succeeded)
      this.onOrderApproved.emit();
  }
}
