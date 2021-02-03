import { from } from "rxjs";
import { Component } from '@angular/core'

@Component({
    selector: 'app-first',
    templateUrl: './first.component.html',
    styleUrls: ['./first.component.css']
})

export class firstComponent {
    text: string;
    constructor() {

    }
    onChange(e){
        this.text='';
    }
}