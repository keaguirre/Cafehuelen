import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';


@Injectable({
  providedIn: 'root'
})
export class CompraService {
  urlCompras:string = environment.urlCompras;
  urlItemCompra:string = environment.urlItemCompra

  constructor(private http: HttpClient) { }

  //Crear compras
  crearCompra(compra: any): Promise<any> {
    return new Promise((resolve, reject) => {
      this.http.post(this.urlCompras, compra).subscribe({
        next: respuesta => {
          resolve(respuesta);
        },
        error: err => {
          if (err.status == 500){
            console.log(err.statusText)
            //internal server error
          }
          else if(err.status == 400){
            console.log(err.statusText)
            //bad request
          }
          else if(err.status == 404){
            console.log(err.statusText)
            //404 not found
          }
          else if(err.status == 409){
            console.log(err.statusText)
            //409 Conflict
          }
          else {
            // console.log(err.status)
            reject(err.status);
          }
        }
      });
    });
  }
    


  //Crear ItemCompra 
  crearItemCompra(itCompra: any): Promise<any> {
    return new Promise((resolve, reject) => {
      this.http.post(this.urlItemCompra, itCompra).subscribe({
        next: respuesta => {
          resolve(respuesta);
        },
        error: err => {
          if (err.status == 500){
            console.log(err.statusText)
            //internal server error
          }
          else if(err.status == 400){
            console.log(err.statusText)
            //bad request
          }
          else if(err.status == 404){
            console.log(err.statusText)
            //404 not found
          }
          else if(err.status == 409){
            console.log(err.statusText)
            //409 Conflict
          }
          else {
            // console.log(err.status)
            reject(err.status);
          }
        }
      });
    });
  }

  
//Listar compras
  obtenerListCompra(compra:any): Promise<any> {
    return new Promise((resolve, reject) => {
      this.http.get(this.urlCompras+compra).subscribe({
        next: respuesta => {
          resolve(respuesta)
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
      }); console.log('listCompra', this.obtenerListCompra);
      
    });  
  }

  //Listar ItemCompra
  obtenerListItemCompra(itCompra:any): Promise<any> {
    return new Promise((resolve, reject) => {
      this.http.get(this.urlItemCompra+itCompra).subscribe({
        next: respuesta => {
          resolve(respuesta)
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
      }); console.log('listItCompra', this.obtenerListItemCompra);
    });
  }


  //Actualizar compra
  actualizarCompra(id_compra: any, compraObj: any,): Promise<any> {
    return new Promise((resolve, reject) => {
      this.http.patch(this.urlCompras + id_compra, compraObj)
      .subscribe({
        next: respuesta => {
          resolve(respuesta);
        },
        error: err => {
          if (err.status == 500){ 
            console.log(err.statusText)
            //internal server error
          }
          else if(err.status == 400){
            console.log(err.statusText)
            //bad request
          }
          else if(err.status == 404){
            console.log(err.statusText)
            //404 not found
          }
          else if(err.status == 409){
            console.log(err.statusText)
            //409 Conflict
          }
          else {
            // console.log(err.status)
            reject(err.status);
          }
        }
      });
    });
  }


}