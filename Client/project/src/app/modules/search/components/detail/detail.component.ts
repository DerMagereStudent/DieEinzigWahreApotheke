import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Medicine } from 'src/app/modules/shared/models/Medicine';
import { MedicineService } from 'src/app/modules/shared/services/medicine.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit {
  @Input() public medicine?: Medicine;

  constructor(private router: Router, private activatedRoute: ActivatedRoute, private medicineService: MedicineService) { }

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe({
      next: params => {
        if (params['pzn'] == null) {
          this.router.navigateByUrl('');
          return;
        }

        this.medicineService.findByPzn({pzn: params['pzn']}).then(result => this.medicine = result);
      }
    })
  }

}
