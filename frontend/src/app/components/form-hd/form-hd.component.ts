import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-form',
  templateUrl: './form-hd.component.html',
  styleUrls: ['./form-hd.component.css']
})
export class FromHdComponent implements OnInit {
  formForm!: FormGroup;


  constructor(private fb: FormBuilder) { }

  get gender() {
    return this.formForm.get('gender');
  }
  
  get RestingBP (){
    return this.formForm.get('RestingBP');
  }

  get FastingBS (){
    return this.formForm.get('FastingBS');
  }
  
  ngOnInit(): void {
    this.formForm = this.fb.group({
      Age: ['', Validators.required],
      Chest_Pain_Type: ['', Validators.required],
      RestingBP: ['', Validators.required],
      gender: ['', Validators.required],
      FastingBS: ['', Validators.required]
    });
  }
  
 

  onSubmit(){
    if(this.formForm.valid){
      console.log(this.formForm.value)
    }else
    {
      this.validateAllFormFilds(this.formForm);
      alert("form is not vaild")
     
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
