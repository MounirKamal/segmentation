import { Component } from '@angular/core';
import axios from 'axios';
import * as $ from 'jquery';
import { async } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
datatype: any="";
image: any="";
loading: any="";
resultimages: any=[];



getdatatype(text:any){
  this.datatype=text;
  
}
async getimage(event: any) {
  this.loading = true;
  this.image = event.target.files[0];
  let formData: FormData = new FormData();
  const data = {
    type: this.datatype,
  };

  formData.append('file', this.image);
  formData.append('data', JSON.stringify(data));
  console.log(formData);
  await axios
    .post('http://35.212.140.235:3000/upload', formData)
    .then(async (response) => {
      this.resultimages=response.data['image'];
      for (let i=0 ; i<this.resultimages.length;i++){
        
        this.resultimages[i] = 'data:;base64,' + this.resultimages[i];
      }
console.log(this.resultimages);
      
      
      this.loading= false;
    })
    .catch(function (error) {
      console.log(error);
    });
}
 hexToBase64(str : any ) {
  return btoa(String.fromCharCode.apply(null, str.replace(/\r|\n/g, "").replace(/([\da-fA-F]{2}) ?/g, "0x$1 ").replace(/ +$/, "").split(" ")));
}
}

