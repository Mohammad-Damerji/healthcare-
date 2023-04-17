import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {
  disease: FormGroup

  constructor () {
    this.disease = new FormGroup({
      gender: new FormControl(),
      age: new FormControl()
    })
  }

  ngOnInit(): void {
    
  }

  onSubmit(form: FormGroup) {
    console.log(form.value.gender);
    console.log(form.value.age);
    
  }

  /*
  gender,
  age
  */

}
