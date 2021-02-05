import { Component } from '@angular/core';
import { combineLatest } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  emittedKey: string = '';

  listSearching(e) {
    if (e == "Backspace") {
      if(this.emittedKey != '') this.emittedKey = this.emittedKey.slice(0, -1);
    } else {
      this.emittedKey = this.emittedKey.concat(e);
    }
  }

  title = 'Lab3';
}
