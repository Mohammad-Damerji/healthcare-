import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-image-prediction',
  templateUrl: './image-prediction.component.html',
  styleUrls: ['./image-prediction.component.css']
})
export class ImagePredictionComponent {
  uploadForm!: FormGroup;

  constructor(private userSrv: UserService, private router: Router) { 
    if (!userSrv.isLoggedIn()) {
      this.router.navigate([''])
    }
  }

  ngOnInit(){

  }
  url="./assets/images/upload.png";

  onselectFile(e: any){
    if(e.target.files){
      var reader = new FileReader();
      reader.readAsDataURL(e.target.files[0]);
      reader.onload=(event:any)=>{
      this.url=event.target.result;
      }
    }
  }
}

