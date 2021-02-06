import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  searchListValue:string;
  searchMyList(e){
    this.searchListValue=e
  }
  theLastAdded(e){
    console.log(e)
  }
}