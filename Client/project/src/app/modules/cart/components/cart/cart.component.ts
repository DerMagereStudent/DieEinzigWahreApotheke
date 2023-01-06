import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { Medicine } from 'src/app/modules/shared/models/Medicine';
import { ShoppingCartItem } from 'src/app/modules/shared/models/ShoppingCartItem';
import { CartService } from 'src/app/modules/shared/services/cart.service';
import { MedicineService } from 'src/app/modules/shared/services/medicine.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit, OnDestroy {
  private unsubscribe: Subject<void> = new Subject<void>();
  
  public dataLoaded: boolean = false;
  public cart: ShoppingCartItem[] = []
  public medicine: { [pzn: string]: Medicine } = { }
  public total: number = 0.00;

  constructor(private cartService: CartService, private medicineService: MedicineService) { }

  async ngOnInit(): Promise<void> {
    this.cartService.cart.pipe(takeUntil(this.unsubscribe)).subscribe({
      next: cart => {        
        this.medicineService.findByPzns({pzns: cart.map(i => i.pzn)})
          .then(result => {
            this.medicine = Object.assign({}, ...result.map((m) => ({[m.pzn]: m})));

            this.cart = cart
              .filter(i => this.medicine[i.pzn] != null)
              .sort((a, b) => this.medicine[a.pzn].productName.localeCompare(this.medicine[b.pzn].productName))

            this.total = this.cart
              .filter(i => this.medicine[i.pzn] != null)
              .map(i => i.quantity * (this.medicine[i.pzn].price ?? 0))
              .reduce((sum, current) => sum + current, 0) / 100;

            this.dataLoaded = true;
          });
      }
    });
    await this.cartService.getCart();
  }

  ngOnDestroy(): void {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }
}
