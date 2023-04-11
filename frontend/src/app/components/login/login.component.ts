import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiLogin, RestAPIService } from 'src/app/services/rest-api.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  type: string = "password";
  isText: boolean = false;
  eyeIcon: string = "fa-eye-slash";
  loginForm!: FormGroup;
  waiting = false;
  alert: string | undefined
  success: string | undefined

  constructor(private fb: FormBuilder, private api: RestAPIService) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  hideShowPass() {
    this.isText = !this.isText;
    this.isText ? this.eyeIcon = "fa-eye" : this.eyeIcon = "fa-eye-slash";
    this.isText ? this.type = "text" : this.type = "password";
  }

  private setSpinner() {
    this.waiting = true;
    this.loginForm.get('username')?.disable()
    this.loginForm.get('password')?.disable()
  }

  private unsetSpinner() {
    this.waiting = false;
    this.loginForm.get('username')?.enable()
    this.loginForm.get('password')?.enable()
  }

  onSubmit(){
    if(this.loginForm.valid){
      console.log(this.loginForm.value)
      this.setSpinner()
      this.api.login(this.loginForm.value).subscribe(e => {
        console.log(e)
        if (e.success) {
          this.unsetSpinner()
          this.success = e.message
          this.alert = undefined
        }
        else {
          this.unsetSpinner()
          this.alert = e.message
          this.success = undefined
        }
        
      });
      
      
    }else
    {
      alert("form is not vaild")
      this.validateAllFormFilds(this.loginForm);
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
