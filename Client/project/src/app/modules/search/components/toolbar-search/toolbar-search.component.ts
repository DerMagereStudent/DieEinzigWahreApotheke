import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Medicine } from 'src/app/modules/shared/models/Medicine';
import { MedicineService } from 'src/app/modules/shared/services/medicine.service';

@Component({
  selector: 'app-toolbar-search',
  templateUrl: './toolbar-search.component.html',
  styleUrls: ['./toolbar-search.component.scss']
})
export class ToolbarSearchComponent implements OnInit {
  public query: string = "";
  public suggestions: Medicine[] = [];

  constructor(private router: Router, private medicineService: MedicineService) { }

  ngOnInit() {
  }

  public inlineSearch(event: any): void {
    this.medicineService.findBySearchString({searchString: event.query, page: 0, itemsPerPage: 5}).then(result => {
      if (result != null && result.pageContent != null)
        this.suggestions = result.pageContent;
    });
  }

  public search(event: any): void {
    if (event.target.value == null || event.target.value.length == 0)
      return;

    this.router.navigate(['/search', ], {queryParams: {q: event.target.value}});
  }

  public onItemSelected(selectedItem: Medicine): void {
    this.router.navigate(['/search', "detail" ], {queryParams: {pzn: selectedItem.pzn}});
  }
}
