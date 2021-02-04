import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})

export class SearchComponent implements OnInit {
  
  constructor() { }

  @Output('searching') searchedValue = new EventEmitter();

  search(e) {
    if ((e.keyCode >= 48 && e.keyCode <= 57) || (e.keyCode >= 65 && e.keyCode <= 90) || (e.keyCode >= 97 && e.keyCode <= 122)) {
      this.searchedValue.emit(e.key)
    } 
    if(e.keyCode == 8){
      this.searchedValue.emit(e.key)
    }
  }

  ngOnInit(): void { }
} 
