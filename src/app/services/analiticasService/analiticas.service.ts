import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AnaliticasService {
  //analiticas de compras
  urlComprasHoy:string =environment.urlComprasHoy
  urlComprasDiaSemana:string = environment.urlApiComprasDiaSemana;
  urlCompraMesActual:string = environment.urlApiCompraMesActual;
  urlComprasMesSemana:string = environment.urlApiTotalComprasMesSemana;
  urlComprasPorMesAnual:string = environment.urlApiTotalComprasPorMesAnual;
  urlCompraSemanalAnual:string = environment.urlApiTotalCantidadComprasSemanalAnual;
  urlComprasMesAnteriorSemana:string = environment.urlApiTotalComprasMesAnteriorSemana;
  //Fin analiticas de compra
  //Analiticas de total monetario
  urlTotalComprasHoy:string = environment.urlApiTotalComprasHoy;
  urlTotalSemanalAldia:string =environment.urlApiTotalSemanalAldia;
  urlTotalCompraDiariaSemanal:string =environment.urlApiTotalCompraDiariaSemanal;
  urlTotalComprasDiariasSemanal:string=environment.urlApiTotalCompraDiariaSemanal
  urlTotalCompraSemanalAnual:string =environment.urlApiTotalCompraSemanalAnual;
  urlTotalCompraSemanalMes:string =environment.urlApiTotalCompraSemanalMes;
  urlTotalCompraSemanalMesAnterior:string =environment.urlApiTotalCompraSemanalMesAnterior;
  urlTotalComprasPorMesAnual:string =environment.urlApiComprasPorMesAnual;
  //Fin analiticas de total monetario
  constructor(private http:HttpClient) { }
  //compras hoy
  obtenerListadoComprasHoy(): Promise<any> {
    return new Promise((resolve, reject) => {
      this.http.get(this.urlComprasHoy).subscribe({
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

//total compras hoy
obtenerTotalComprasHoy(): Promise<any> {
  return new Promise((resolve, reject) => {
    this.http.get(this.urlTotalComprasHoy).subscribe({
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
//fin total compras hoy
//total semanal al dia
obtenerTotalSemanalAldia(): Promise<any> {
  return new Promise((resolve, reject) => {
    this.http.get(this.urlTotalSemanalAldia).subscribe({
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
//fin total semanal al dia
// total compras diarias semanal
obtenerTotalCompraDiariaSemanal(): Promise<any> {
  return new Promise((resolve, reject) => {
    this.http.get(this.urlTotalCompraDiariaSemanal).subscribe({
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
// fin total compras diarias semanal
//total compras semanal anual
obtenerTotalCompraSemanalAnual(): Promise<any> {
  return new Promise((resolve, reject) => {
    this.http.get(this.urlTotalCompraSemanalAnual).subscribe({
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
//total compras semanal anual
obtenerTotalCompraSemanalMes(): Promise<any> {
  return new Promise((resolve, reject) => {
    this.http.get(this.urlTotalCompraSemanalMes).subscribe({
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
// fin total compras semanal anual
//total compra semanal mes anterior
obtenerTotalCompraSemanalMesAnterior(): Promise<any> {
  return new Promise((resolve, reject) => {
    this.http.get(this.urlTotalCompraSemanalMesAnterior).subscribe({
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
//fin total compra semanal mes anterior
//total compras por mes anual
obtenerTotalComprasPorMesAnual(): Promise<any> {
  return new Promise((resolve, reject) => {
    this.http.get(this.urlTotalComprasPorMesAnual).subscribe({
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
//total compras por mes anual




}    
