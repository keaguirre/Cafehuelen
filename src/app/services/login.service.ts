import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment.development';
@Injectable({
  providedIn: 'root'
})
export class LoginService {
  urlAdmin:string = environment.urlApiLogin
  constructor(private http: HttpClient) { }

  //ConsultaApi
  obtenerAdminLogin(admin:any): Promise<any> {
    return new Promise((resolve, reject) => {
      this.http.get(this.urlAdmin+admin).subscribe({
        next: respuesta => {
          resolve(respuesta);
        },
        error: err => {
          if (err.status == 500){
            console.log(err.statusText)
          }
          else if(err.status == 400){
            console.log(err.statusText)
            //bad request
          }
          else if(err.status == 404){
            console.log(err.statusText)
            //404 not found
          }
          else {
            // console.log(err.status)
            reject(err.status);
          }
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