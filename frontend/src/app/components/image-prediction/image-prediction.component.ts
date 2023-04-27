import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { RestAPIService } from 'src/app/services/rest-api.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-image-prediction',
  templateUrl: './image-prediction.component.html',
  styleUrls: ['./image-prediction.component.css']
})
export class ImagePredictionComponent {
  uploadForm!: FormGroup;
  url = "./assets/images/upload.png";
  userSelected = false
  success = ""
  error = ""

  constructor(private userSrv: UserService, private router: Router, private api: RestAPIService) {
    if (!this.userSrv.isLoggedIn()) {
      this.router.navigate([''])
    }

    this.uploadForm = new FormGroup({

    })
  }


  onselectFile(e: any) {
    if (e.target.files) {
      var reader = new FileReader();
      reader.readAsDataURL(e.target.files[0]);
      reader.onload = (event: any) => {
        this.url = event.target.result;
        this.userSelected = true;
      }
    }
  }

  onSubmit() {
    if (this.userSelected) {
      console.log("User selected a file.");
      this.api.predictImage(this.url).subscribe(e => {
        if (e.success) {
          this.error = ""
          this.success = e.message
        }

        else {
          this.error = e.message
          this.success = ""
        }
        
      })
    }

    else {
      console.log("User NOT selected a file.");
    }

  }
}

