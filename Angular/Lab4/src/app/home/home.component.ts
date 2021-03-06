import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  image: string = '/assets/home/1.png'
  registered: boolean = false;
  myForm = new FormGroup({
    name: new FormControl('', [
      Validators.required,
      Validators.maxLength(8),
      Validators.pattern('[a-zA-Z ]*')
    ]),
    age: new FormControl(null, [
      Validators.required,
      ageValidator
    ]),
    email: new FormControl('', [
      Validators.required,
      emailValidator
    ])
  })
  validForm = true;
  list = [{name:"Somaia", age:23, email:"SomaiaMostafa@angular.com"}];
  metaData = ["Name", "Age", "Email"];

  constructor() { }

  ngOnInit(): void {
  }

  allowRegister() {
    this.registered = true;
  }

  @Output('lastPerson') myEvent = new EventEmitter();

  registration(e) {
    if (this.myForm.valid) {
      this.myEvent.emit(this.myForm.value);
      this.validForm = true;
      this.list.push(this.myForm.value);
    }
    else this.validForm = false;
  }

}

function emailValidator(control: AbstractControl): { [key: string]: any } {
  const email: string = control.value;
  const domain = email.substring(email.lastIndexOf('@') + 1);
  if (email == '' || domain.toLowerCase() !== 'angular.com') return { 'emailDomain': true }
  return null
}

function ageValidator(control: AbstractControl): { [key: string]: boolean } | null {
  const age: number = control.value;
  if (age < 18 || age > 60 || isNaN(age)) return { 'ageValidator': true }
  return null
}