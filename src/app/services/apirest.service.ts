import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApirestService {

  constructor() { }

  async getEmail(email: string) {
    const response = await fetch(`http://localhost:3000/usuario?email=${encodeURIComponent(email)}`);
    const person = await response.json();
    console.log(person);
  }
}
