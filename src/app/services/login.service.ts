import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment.development';
@Injectable({
  providedIn: 'root'
})
export class LoginService {
  // urlAdmin:string = environment.urlApiLogin
  urlAdmin:string = 'https://fakerapi.it/api/v1/users?_quantity=5'
  constructor(private http: HttpClient) { }

  //ConsultaApi
  obtenerAdminLogin(admin:any): Promise<any> {
    return new Promise((resolve, reject) => {
      this.http.get(this.urlAdmin+admin).subscribe({
        next: respuesta => {
          resolve(respuesta);
        },
        error: err => {
          reject(err);
        }
      });
    });
  }

  obtenerListadoAdmin(): Promise<any> {
    return new Promise((resolve, reject) => {
      this.http.get(this.urlAdmin).subscribe({
        next: respuesta => {
          resolve(respuesta);
        },
        error: err => {
          reject(err);
        }
      });
    });
  }    
}
