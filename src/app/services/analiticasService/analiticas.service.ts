import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AnaliticasService {
  urlComprasHoy:string =environment.urlComprasHoy
  urlComprasDiaSemana:string = environment.urlApiComprasDiaSemana;
  urlCompraMesActual:string = environment.urlApiCompraMesActual;
  urlComprasMesSemana:string = environment.urlApiTotalComprasMesSemana;
  urlComprasPorMesAnual:string = environment.urlApiTotalComprasPorMesAnual;
  urlCompraSemanalAnual:string = environment.urlApiTotalCompraSemanalAnual;
  urlComprasMesAnteriorSemana:string = environment.urlApiTotalComprasMesAnteriorSemana;
  urlTotalComprasDiariasSemanal:string=environment.urlApiTotalCompraDiariaSemanal
  constructor(private http:HttpClient) { }
  //compras hoy
  obtenerListadoComprasHoy(): Promise<any> {
    return new Promise((resolve, reject) => {
      this.http.get(this.urlComprasHoy).subscribe({
        next: respuesta => {
          console.log('serv comprahoy: ', respuesta)
          resolve(respuesta);
        },
        error: err => {
          console.log('serv_err: ', err)
          if (err.status == 500){
            console.log('500'+err.statusText)
          }
          else if(err.status == 400){
            console.log('400'+err.statusText)
            //bad request
          }
          else if(err.status == 404){
            console.log('404'+err.statusText)
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
  //fin compras hoy
//compras dia de la semana
  obtenerListadoComprasDiaSemana(): Promise<any> {
    return new Promise((resolve, reject) => {
      this.http.get(this.urlComprasDiaSemana).subscribe({
        next: respuesta => {
          resolve(respuesta);
        },
        error: err => {
          console.log('serv_err: ', err)
          if (err.status == 500){
            console.log('500'+err.statusText)
          }
          else if(err.status == 400){
            console.log('400'+err.statusText)
            //bad request
          }
          else if(err.status == 404){
            console.log('404'+err.statusText)
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
  //fin compras dia de la semana
  //compras mes actual
  obtenerListadoComprasMesActual(): Promise<any> {
    return new Promise((resolve, reject) => {
      this.http.get(this.urlCompraMesActual).subscribe({
        next: respuesta => {
          resolve(respuesta);
          
        },
        error: err => {
          console.log('serv_err: ', err)
          if (err.status == 500){
            console.log('500'+err.statusText)
          }
          else if(err.status == 400){
            console.log('400'+err.statusText)
            //bad request
          }
          else if(err.status == 404){
            console.log('404'+err.statusText)
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
  // fin compras mes actual
  //total compras mes semana
  obtenerListadoTotalComprasMesSemana(): Promise<any> {
    return new Promise((resolve, reject) => {
      this.http.get(this.urlComprasMesSemana).subscribe({
        next: respuesta => {
          resolve(respuesta);
          
        },
        error: err => {
          console.log('serv_err: ', err)
          if (err.status == 500){
            console.log('500'+err.statusText)
          }
          else if(err.status == 400){
            console.log('400'+err.statusText)
            //bad request
          }
          else if(err.status == 404){
            console.log('404'+err.statusText)
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
  //fin total compras mes semana
  //total compras por mes anual
  obtenerListadoTotalComprasPorMesAnual(): Promise<any> {
    return new Promise((resolve, reject) => {
      this.http.get(this.urlComprasPorMesAnual).subscribe({
        next: respuesta => {
          resolve(respuesta);
          
        },
        error: err => {
          console.log('serv_err: ', err)
          if (err.status == 500){
            console.log('500'+err.statusText)
          }
          else if(err.status == 400){
            console.log('400'+err.statusText)
            //bad request
          }
          else if(err.status == 404){
            console.log('404'+err.statusText)
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
  //FIn total compras por mes anual
  //total compras semana anual
  obtenerListadoTotalCompraSemanalAnual(): Promise<any> {
    return new Promise((resolve, reject) => {
      this.http.get(this.urlCompraSemanalAnual).subscribe({
        next: respuesta => {
          resolve(respuesta);
          
        },
        error: err => {
          console.log('serv_err: ', err)
          if (err.status == 500){
            console.log('500'+err.statusText)
          }
          else if(err.status == 400){
            console.log('400'+err.statusText)
            //bad request
          }
          else if(err.status == 404){
            console.log('404'+err.statusText)
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
  // fin total compras semana anual
  //compras mes anterior semana
  obtenerListadoComprasMesAnteriorSemana(): Promise<any> {
    return new Promise((resolve, reject) => {
      this.http.get(this.urlComprasMesAnteriorSemana).subscribe({
        next: respuesta => {
          resolve(respuesta);
        },
        error: err => {
          console.log('serv_err: ', err)
          if (err.status == 500){
            console.log('500'+err.statusText)
          }
          else if(err.status == 400){
            console.log('400'+err.statusText)
            //bad request
          }
          else if(err.status == 404){
            console.log('404'+err.statusText)
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
  //fin compras mes anterior semana
  //Total compra diaria semanal
  obtenerListadoTotalComprasDiariaxSemana(): Promise<any> {
    return new Promise((resolve, reject) => {
      this.http.get(this.urlTotalComprasDiariasSemanal).subscribe({
        next: respuesta => {
          resolve(respuesta);
          
        },
        error: err => {
          console.log('serv_err: ', err)
          if (err.status == 500){
            console.log('500'+err.statusText)
          }
          else if(err.status == 400){
            console.log('400'+err.statusText)
            //bad request
          }
          else if(err.status == 404){
            console.log('404'+err.statusText)
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
  //fin Total compra diaria semanal
}
