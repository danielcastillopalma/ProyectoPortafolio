import { Injectable } from '@angular/core';
import axios from 'axios';

@Injectable({
  providedIn: 'root',
})
export class PhotoaiService {
  // 🔐 Asegúrate de restringir esta clave en producción (por IP, referer, etc.)
  private apiKey = `AIzaSyCYrAfH759HdkzdEOdGWxAS57WBiB1EHoE`;
  private apiUrl = `https://vision.googleapis.com/v1/images:annotate`;

  constructor() { }

  async analyzeImage(base64Image: string): Promise<any> {
    const body = {
      requests: [
        {
          image: {
            content: base64Image, // Solo el contenido Base64, sin el prefijo
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
      const response = await axios.post(
        `${this.apiUrl}?key=${this.apiKey}`,
        body,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      this.procesarJSON(response.data);
      return response.data;
    } catch (error: any) {
      console.error('🛑 Error al analizar imagen con Google Vision:', error.response?.data || error.message);
      throw error;
    }
  }

  public procesarJSON(jsongoogle: any): { descripcion: string; puntuacion: number }[] {
    const resultados: { descripcion: string; puntuacion: number }[] = [];

    // Si no existe jsongoogle.responses o no es un array, devuelve un array vacío.
    if (!jsongoogle.responses || !Array.isArray(jsongoogle.responses)) return resultados;

    jsongoogle.responses.forEach((response: any) => {
      if (response.labelAnnotations && Array.isArray(response.labelAnnotations)) {
        response.labelAnnotations.forEach((item: any) => {
          if (item.description && typeof item.score === "number") {
            resultados.push({
              descripcion: item.description,
              puntuacion: item.score,
            });
          }
        });
      }
    });
    console.log(resultados);
    return resultados;
  }

}
