import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {
  image = '/assets/2.jpg';
  
  constructor() { }

  ngOnInit(): void {
  }

}
