import { CompraService } from 'src/app/services/compraService/compra.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProductosService } from 'src/app/services/ProductosService/productos.service';
import { Observable, interval, Subscription } from 'rxjs';
import { switchMap, startWith } from 'rxjs/operators';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-api-watcher',
  templateUrl: './api-watcher.component.html',
  styleUrls: ['./api-watcher.component.css']
})
export class ApiWatcherComponent implements OnInit, OnDestroy {
  listadoComprasRecientes: any;
  loader: boolean = false;
  banner: boolean = false;
  audio!: HTMLAudioElement;
  response!:any;
  
  private subscription: Subscription | undefined;

  constructor(private prodservices: ProductosService, private compraServ: CompraService) {
    this.audio = new Audio();
    this.audio.src = '../../../assets/audios/correct_bell.mp3'
  }

  ngOnInit(): void {
    this.listadoCompras();
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  //TOAST OK----------------------------------------------------------------------------------------
toastCheck = Swal.mixin({
  toast: true,
  icon:'success',
  position: 'bottom-right',
  iconColor: 'green',
  showConfirmButton: false, 
  timer: 5000,
  timerProgressBar: true,
  didOpen: (toast) => {
    toast.addEventListener('mouseenter', Swal.stopTimer)
    toast.addEventListener('mouseleave', Swal.resumeTimer)
  },
  customClass: {
    popup: 'colored-toast',
  },
})
//Fin TOAST OK------------------------------------------------------------------------------------
//TOAST ERROR-------------------------------------------------------------------------------------
toastError = Swal.mixin({
  toast: true,
  position: 'bottom-right',
  icon:'error',
  iconColor: 'red',
  showConfirmButton: false, 
  timer: 5000,
  timerProgressBar: true,
  didOpen: (toast) => {
    toast.addEventListener('mouseenter', Swal.stopTimer)
    toast.addEventListener('mouseleave', Swal.resumeTimer)
  },
  customClass: {
    popup: 'colored-toast'
  },
})

  listadoCompras() {
    this.loader = true;
    this.subscription = interval(15000)
      .pipe(
        startWith(0), // Realizar la primera carga al inicio
        switchMap(() => this.prodservices.obtenerListadoComprasRecientes())
      )
      .subscribe(
        (listadoComprasRecientes) => {
          this.listadoComprasRecientes = listadoComprasRecientes;
          this.loader = false;
          this.banner = true;
        },
        (err) => {
          console.log('Este es el error:', err);
          this.loader = false;
          this.banner = false;
        }
      );
  }

  onActualizarPedido(id: number, cod: string): void{
    switch(cod) { 
      case 'Pagado': { 
        try{
          let estado = {"estado_compra": cod}
          this.compraServ.actualizarApiWatcher(id, estado).then(respuesta => {
            this.response = respuesta;
            this.toastCheck.fire({title: 'Orden pagada.'})
            this.audio.play();
          });
        }catch (e: any){console.log('err:',e);}
      break; 
      } 
      case 'Preparando': { 
        try{
          let estado = {"estado_compra": cod}
          this.compraServ.actualizarApiWatcher(id, estado).then(respuesta => {
            this.response = respuesta;
            this.toastCheck.fire({title: 'Orden preparada.'})
            this.audio.play();
          });
        }catch (e: any){console.log(e);}
      break; 
      } 
      case 'Entregado': { 
        try{
          let estado = {"estado_compra": cod}
          this.compraServ.actualizarApiWatcher(id, estado).then(respuesta => {
            this.response = respuesta;
            this.toastCheck.fire({title: 'Orden entregada.'})
            this.audio.play();
          });
        }catch (e: any){console.log(e);}
      break; 
      } 
      
      default: { 
        console.log('Error codigo: '+cod)
        this.toastError.fire({icon: 'error',title: 'Error desconocido, intente nuevamente más tarde. Inténtelo nuevamente más tarde.'})  
      break; 
      } 
    } 
  }


}