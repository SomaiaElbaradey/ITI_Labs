import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-second',
  templateUrl: './second.component.html',
  styleUrls: ['./second.component.css']
})
export class SecondComponent implements OnInit {
  counter = 1;
  image: string = "assets/slider/1.png";
  slideInterval;
  slide: string = "Slide Show";
  constructor() { }
  ngOnInit(): void {
  }
  next() {
    if (this.counter < 6) {
      this.image = `assets/slider/${++this.counter}.png`
    } else {
      this.counter = 1;
      this.image = `assets/slider/1.png`
    }
  }
  previous() {
    if (this.counter === 1) {
      this.counter = 6;
      this.image = `assets/slider/${this.counter}.png`
    } else {
      this.image = `assets/slider/${--this.counter}.png`
    }
  }
  slideShow(e) {
    // console.log(e.target.value)
    if (this.slide === "Slide Show") {
      this.slideInterval = setInterval(() => {
        if (this.counter < 6) {
          this.image = `assets/slider/${++this.counter}.png`
        } else {
          this.counter = 1;
          this.image = `assets/slider/1.png`
        }
      }, 1000)
      this.slide = "Stop";
    } else {
      clearInterval(this.slideInterval);
      this.slide = "Slide Show";
    }

  }
  // stop() {
  //   clearInterval(this.slideInterval)
  // }
}