import { Component, Input, OnInit } from '@angular/core';
import { Medicine } from 'src/app/modules/shared/models/Medicine';
import { Order } from 'src/app/modules/shared/models/Order';
import { MedicineService } from 'src/app/modules/shared/services/medicine.service';

@Component({
  selector: 'app-user-order',
  templateUrl: './user-order.component.html',
  styleUrls: ['./user-order.component.scss']
})
export class UserOrderComponent implements OnInit {
  private _order?: Order;
  public medicine: { [pzn: string]: Medicine } = { }

  public get order(): Order | undefined { return this._order; }
  @Input() public set order(value: Order | undefined) {
    this._order = value;
    this.loadMedicine();
  };

  public dataLoaded: boolean = true;

  constructor(private medicineService: MedicineService) { }

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
}
