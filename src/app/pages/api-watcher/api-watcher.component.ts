import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProductosService } from 'src/app/services/ProductosService/productos.service';
import { Observable, interval, Subscription } from 'rxjs';
import { switchMap, startWith } from 'rxjs/operators';

@Component({
  selector: 'app-api-watcher',
  templateUrl: './api-watcher.component.html',
  styleUrls: ['./api-watcher.component.css']
})
export class ApiWatcherComponent implements OnInit, OnDestroy {
  listadoComprasRecientes: any;
  loader: boolean = false;
  banner: boolean = false;
  private subscription: Subscription | undefined;

  constructor(private prodservices: ProductosService) { }

  ngOnInit(): void {
    this.listadoCompras();
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

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
}