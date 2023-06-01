import { Injectable } from '@angular/core';
import axios from 'axios';

@Injectable({
  providedIn: 'root'
})
export class ImgServiceService {

  private apiKey= '812bfb7477b67c2ed0dd674b8a7cf94c';

  constructor() { }
  async uploadImage(file: File): Promise<string> {
    const formData = new FormData();
    formData.append('image', file);

    const response = await axios.post('https://api.imgbb.com/1/upload?key=' + this.apiKey, formData);
    const imageUrl = response.data.data.url;

    return imageUrl;
  }
}
