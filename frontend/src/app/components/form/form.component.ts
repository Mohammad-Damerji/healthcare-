import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {
  formForm!: FormGroup;


  constructor(private fb: FormBuilder, private userSrv: UserService, private router: Router) { 
    if (!userSrv.isLoggedIn()) {
      this.router.navigate([''])
    }
  }

  ngOnInit(): void {
    this.formForm = this.fb.group({
      Age: ['', Validators.required],
      bmi: ['', Validators.required],
      avg_glucose_level: ['', Validators.required],
      gender: ['', Validators.required],
      residence_type : ['', Validators.required]
    });
  }
 
  get gender() {
    return this.formForm.get('gender');
  }

  get residence_type (){
    return this.formForm.get('residence_type');

  }

  onSubmit(){
    if(this.formForm.valid){
      console.log(this.formForm.value)
    }else
    {
      alert("form is vaild")
      this.validateAllFormFilds(this.formForm);
    }

  }

  private validateAllFormFilds(formGroup:FormGroup){
    Object.keys(formGroup.controls).forEach(field=>{
      const control = formGroup.get(field);
      if(control instanceof FormControl){
        control.markAsDirty({onlySelf:true});
      }else if (control instanceof FormGroup) {
        this.validateAllFormFilds(control)
      }
    })
  }

}
