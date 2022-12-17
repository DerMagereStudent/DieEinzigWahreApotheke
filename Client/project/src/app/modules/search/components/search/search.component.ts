import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Medicine } from 'src/app/modules/shared/models/Medicine';
import { MedicineService } from 'src/app/modules/shared/services/medicine.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  public query: string = "";
  public page: number = 0;
  public pages: number = 0;
  public itemsPerPage: number = 20;
  public items: number = 0;

  public searchHits: Medicine[] = [];

  constructor(private router: Router, private activatedRoute: ActivatedRoute, private medicineService: MedicineService) {
    this.activatedRoute.queryParams.subscribe(params => {
      if (params["q"] == null)
        this.router.navigate(['']);

      this.query = params["q"];
      this.loadItems();
    });
  }

  ngOnInit() {
  }

  public onPageChange(event: any) {
    this.page = event.page;
    this.loadItems();
  }

  private loadItems() : void {
    this.medicineService.findBySearchString({searchString: this.query, page: this.page, itemsPerPage: this.itemsPerPage}).then(result => {
      console.log(result);

      if (result == null || result.pageContent == null)
        return;

      this.pages = result.pages;
      this.items = result.hits;
      this.searchHits = result.pageContent;
    });
  }
}
