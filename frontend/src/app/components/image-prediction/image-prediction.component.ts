import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-image-prediction',
  templateUrl: './image-prediction.component.html',
  styleUrls: ['./image-prediction.component.css']
})
export class ImagePredictionComponent {
  uploadForm!: FormGroup;

  constructor(){

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

