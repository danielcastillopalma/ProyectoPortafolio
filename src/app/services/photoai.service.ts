import { Injectable } from '@angular/core';
import axios from 'axios';
@Injectable({
  providedIn: 'root'
})
export class PhotoaiService {
  private apiKey = 'AIzaSyCrLXQQtGJv6Xm783kJDm__YKRWMMgEGBM'; // Reemplaza con tu clave real
  private apiUrl = `https://vision.googleapis.com/v1/images:annotate`;

  constructor() { }

  async analyzeImage(base64Image: string): Promise<any> {
    const body = {
      requests: [
        {
          image: {
            content: base64Image,
          },
          features: [
            {
              type: 'LABEL_DETECTION',
              maxResults: 5,
            },
          ],
        },
      ],
    };

    try {
      const response = await axios.post(`${this.apiUrl}?key=${this.apiKey}`, body);
      return response.data;
    } catch (error: any) {
      console.error('Error al analizar imagen con Google Vision:', error);
      throw error;
    }
  }
}
