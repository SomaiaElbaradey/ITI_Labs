import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  searchedKey:string;
  listSearching(e) {
    this.searchedKey = e;
  }
  title = 'Lab3';
}
