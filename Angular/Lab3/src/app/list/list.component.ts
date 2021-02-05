import { Component, Input, OnChanges, OnInit } from '@angular/core';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})

export class ListComponent  {
  constructor() { }

  list = [
    {
      name: "Somaya",
      task: "Play an instrument."
    },
    {
      name: "Lucas",
      task: "Write a short story."
    },
    {
      name: "Noah",
      task: "Play a board game."
    },
    {
      name: "Emma",
      task: "Watch a movie solo."
    }
  ]

  @Input('searchKey') searchValue;

  // filteredlist: Array<Object> = this.list;

  // ngOnChanges(changes: any) {
  //   if (this.searchValue) {
  //     if (this.searchValue == "Backspace") {
  //       this.search = this.search.slice(0, -1);
  //     } else {
  //       this.search = this.search.concat(this.searchValue);
  //     }
  //   }
  //   console.log(this.search)
  //   this.filteredlist = this.list.filter((item) => {
  //     return item.name.includes(this.search);
  //   });
  // }
  
}