import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RestAPIService } from 'src/app/services/rest-api.service';
import { UserService } from 'src/app/services/user.service';
@Component({
  selector: 'app-form',
  templateUrl: './form-stroke.component.html',
  styleUrls: ['./form-stroke.component.css']
})
export class FormStrokeComponent implements OnInit {
  formForm!: FormGroup;
  success: string;
  error: string;


  constructor(private fb: FormBuilder, private userSrv: UserService, private router: Router, private api: RestAPIService) { 
    if (!userSrv.isLoggedIn()) {
      this.router.navigate([''])
    }
    this.success = ""
    this.error = ""
  }

  ngOnInit(): void {
    this.formForm = this.fb.group({
      age: ['', Validators.required],
      bmi: ['', Validators.required],
      avg_glucose_level: ['', Validators.required],
      gender: ['', Validators.required],
      Residence_type : ['', Validators.required],
      hypertension:  ['', Validators.required],
      heart_disease: ['', Validators.required],
      smoking_status: ['default', Validators.required],
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
      this.api.predictStroke(this.formForm.value).subscribe(stroke => {
        console.log(stroke);

        if (stroke.success) {
          this.success = stroke.message
        }

        else {
          this.error += stroke.message
        }
        

        //after the stroke prediction run another prediction
        /*this.api.predictHeartDisease(this.formForm.value).subscribe(heart => {
          console.log(heart);
          this.success = ""
          this.error = ""

          if (stroke.success && heart.success) {
            this.success = stroke.message + "\n" + heart.message
          }

          else {
            this.error += stroke.success ? "" : stroke.message
            this.error += heart.success ? "" : heart.message
          }
        })*/


       

      })
    }
    
    else {
      alert("form is invaild")
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
