import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.development';
@Injectable({
  providedIn: 'root'
})
export class LoginService {
  urlAdmin:string = environment.urlApiLogin
  constructor(private http: HttpClient) { }

//LISTADOS
//Admin login------------------------------------------------
//Administrador + query
  obtenerAdminDetalle(usr:any): Promise<any> {
    let usuario = usr['usuario']
    return new Promise((resolve, reject) => {
      this.http.post(this.urlAdmin+usuario, usr).subscribe({
        next: respuesta => {
          resolve(respuesta);
        },
        error: err => {
          if (err.status == 500){
            console.log(err.statusText)
          }
          else if(err.status == 400){
            console.log(err.statusText)
            reject(err)
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
  //Listado administradores
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