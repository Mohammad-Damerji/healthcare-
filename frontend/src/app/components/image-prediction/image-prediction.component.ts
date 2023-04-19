import { Component } from '@angular/core';

@Component({
  selector: 'app-image-prediction',
  templateUrl: './image-prediction.component.html',
  styleUrls: ['./image-prediction.component.css']
})
export class ImagePredictionComponent {

  handleUpload(event: any) {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
        console.log(reader.result);
        (document.getElementById("base64-img") as HTMLImageElement).src = (reader.result as string)
    };
}

}
