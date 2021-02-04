import { Component, Input, OnChanges, OnInit } from '@angular/core';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})

export class ListComponent implements OnChanges {
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
  search: string = '';
  filteredlist: Array<Object> = this.list;

  ngOnChanges() {
    if (this.searchValue) {
      console.log(this.filteredlist)
      this.search = this.search.concat(this.searchValue);
    }
    if (this.searchValue == "Backspace") {
      this.search = this.search.slice(0, -1);
    }
    this.filteredlist = this.list.filter((item) => {
      return item.name.includes(this.search)
    });
  }
}