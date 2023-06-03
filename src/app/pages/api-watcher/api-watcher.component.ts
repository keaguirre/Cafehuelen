import { Component, OnInit } from '@angular/core';
import { ProductosService } from 'src/app/services/ProductosService/productos.service';
import { Observable, interval } from 'rxjs';
import { startWith, switchMap, Subscription, from, of } from 'rxjs';
import { map, delay } from 'rxjs/operators';


@Component({
  selector: 'app-api-watcher',
  templateUrl: './api-watcher.component.html',
  styleUrls: ['./api-watcher.component.css']
})
export class ApiWatcherComponent implements OnInit {
  response: any;
  listadoComprasRecientes: any;
  refresh$?: Observable<any>;
  private subscription: any;
  loader: boolean = false;
  banner: boolean = false;
  constructor(private prodservices: ProductosService) { }


  ngOnInit(): void {
    // this.refresh$=interval(5000)
    // .pipe(
    //   startWith(0),
    //   switchMap(()=>this.prodservices.obtenerListadoComprasRecientes()),
    // );
    // this.refresh$.subscribe(respuesta=>{
    //   this.listadoComprasRecientes=respuesta;
    // })
    this.listadoCompras();

  }
  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  // listadoCompras() {
  //   this.loader = true;
  //   this.banner = false;
  //   this.subscription = from(this.prodservices.obtenerListadoComprasRecientes())
  //     .pipe(
  //       switchMap((respuesta: any[]) => {
  //         return of(respuesta).pipe(delay(6000));
  //       }),
  //       map((respuesta: any[]) => respuesta.sort((a, b) => b.id_compra - a.id_compra))
  //     )
  //     .subscribe(
  //       (listadoComprasRecientes:any[]) => {
  //         this.listadoComprasRecientes = listadoComprasRecientes;
  //         this.loader = false;
  //         this.banner = true;
  //       },
  //       (err:any[]) => {
  //         console.log('Este es el error:', err);
  //         this.loader = false;
  //         this.banner = false;
  //       }
  //     );
  // }

  // listadoCompras() {
  //   this.loader = true;
  //   this.banner = false;
  //   this.subscription = interval(10000)
  //     .pipe(
  //       switchMap(() => this.prodservices.obtenerListadoComprasRecientes()),
  //       map((respuesta: any[]) => respuesta.sort((a, b) => b.id_compra - a.id_compra))
  //     )
  //     .subscribe(
  //       (listadoComprasRecientes) => {
  //         this.listadoComprasRecientes = listadoComprasRecientes;
  //         this.loader = false;
  //         this.banner = true;
  //       },
  //       (err) => {
  //         console.log('Este es el error:', err);
  //         this.loader = false;
  //         this.banner = false;
  //       }
  //     );
  //   //  this.prodservices.obtenerListadoComprasRecientes().then(respuesta=>{
  //   //    this.listadoComprasRecientes=respuesta;
  //   //  });
  // }

  listadoCompras() {
    this.banner = false;
    this.loader = true;
    this.subscription = interval(10000)
      .pipe(
        switchMap(() => this.prodservices.obtenerListadoComprasRecientes()),
        map((respuesta: any[]) => respuesta.sort((a, b) => b.id_compra - a.id_compra))
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
      )
    //     this.prodservices.obtenerListadoComprasRecientes().then(respuesta=>{
    //       this.loader = false;
    //       this.banner = false;
    //       this.listadoComprasRecientes=respuesta;
    //   });
    //  }
  }
}
