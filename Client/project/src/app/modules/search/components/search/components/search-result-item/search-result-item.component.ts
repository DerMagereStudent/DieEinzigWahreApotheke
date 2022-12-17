import { Component, Input, OnInit } from '@angular/core';
import { Medicine } from 'src/app/modules/shared/models/Medicine';

@Component({
  selector: 'app-search-result-item',
  templateUrl: './search-result-item.component.html',
  styleUrls: ['./search-result-item.component.scss']
})
export class SearchResultItemComponent implements OnInit {
  @Input() public medicine?: Medicine;

  constructor() { }

  ngOnInit() {
  }

}
