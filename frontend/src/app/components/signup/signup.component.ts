import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  type: string = "password";
  isText: boolean = false;
  eyeIcon: string = "fa-eye-slash";
  signupForm!: FormGroup;

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.signupForm = this.fb.group({
      FirstName: ['', Validators.required],
      LastName: ['', Validators.required],
      Email: ['', Validators.required],
      username: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  hideShowPass() {
    this.isText = !this.isText;
    this.isText ? this.eyeIcon = "fa-eye" : this.eyeIcon = "fa-eye-slash";
    this.isText ? this.type = "text" : this.type = "password";
  }

  onSubmit(){
    if(this.signupForm.valid){
      console.log(this.signupForm.value)
    }else
    {    
      this.validateAllFormFilds(this.signupForm);
      alert("Your form is invaild")
    }

  }

  private validateAllFormFilds(signupForm:FormGroup){
    Object.keys(signupForm.controls).forEach(field=>{
      const control = signupForm.get(field);
      if(control instanceof FormControl){
        control.markAsDirty({onlySelf:true});
      }else if (control instanceof FormGroup) {
        this.validateAllFormFilds(control)
      }
    })
  }
}
