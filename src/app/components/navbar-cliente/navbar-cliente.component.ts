import { Component, ElementRef, ViewChild } from '@angular/core';
import { CarritoService } from 'src/app/services/carritoService/carrito.service';
import Swal from 'sweetalert2';
import { TitleCasePipe } from '@angular/common';
import { CarritoComponent } from '../carrito/carrito.component';
import { ProductosService } from 'src/app/services/ProductosService/productos.service';
import { CompraService } from 'src/app/services/compraService/compra.service';
import { CatalogoComponent } from 'src/app/pages/catalogo/catalogo.component';

@Component({
    selector: 'app-navbar-cliente',
    templateUrl: './navbar-cliente.component.html',
    styleUrls: ['./navbar-cliente.component.css'],
})
export class NavbarClienteComponent {
    audioTap!: HTMLAudioElement;
    audioConfirm!: HTMLAudioElement;
    audioTapLow!: HTMLAudioElement;
    
    ngOnInit(): void {
        this.CatalogoMenunavbar();
    }
    constructor(
        private carritoService: CarritoService,
        private titlecasePipe: TitleCasePipe,
        private prodService: ProductosService,
        private compraService: CompraService,
        private catalogo: CatalogoComponent
    ) {
        this.audioTapLow = new Audio();
        this.audioTapLow.src = '../../../assets/audios/tap_low.mp3'
        this.audioTap = new Audio();
        this.audioTap.src = '../../../assets/audios/tap.mp3'
        this.audioConfirm = new Audio();
        this.audioConfirm.src = '../../../assets/audios/confirme_accion.mp3'
    }

    public MenuCatalogonavbar: any[] = [];

    CatalogoMenunavbar() {
        let respuestaFinal: any = {};
        let preparaciones: any = [];
        let categorias: any = [];
        let menu = [];
        this.prodService.obtenerListadoPreparacion().then((respuesta) => {
            preparaciones = respuesta; //obj con listado ngFor

            this.prodService.obtenerListadoCategoria().then((respuesta2) => {
                categorias = respuesta2; //obj con listado ngFor

                preparaciones.forEach((Item: any) => {
                    if (!respuestaFinal[Item.nombre_cat]) {
                        respuestaFinal[Item.nombre_cat] = {
                            categoria: categorias.find(
                                (cat: any) => cat.nombre_cat === Item.nombre_cat
                            ),
                            items: [],
                        };
                    }
                    respuestaFinal[Item.nombre_cat].items.push(Item);
                });
                menu = respuestaFinal;
                this.MenuCatalogonavbar = Object.values(menu);
            });
        });
    }

    carritoArray() {
        return this.carritoService.getCart();
    }

    itemsCarrito() {
        return this.carritoService.getCartItems();
    }

    totalCarrito() {
        return this.carritoService.getCartTotal();
    }

    clearCart(): void {
        return this.carritoService.clearCart();
    }

    botonClearCart() {
        this.carritoService.botonClearCart();
        this.audioTapLow.play();
    }

    decrementarCantidad(item: any) {
        this.carritoService.decrementarCantidad(item);
        this.audioTapLow.play();
    }
    
    incrementarCantidad(item: any) {
        this.carritoService.incrementarCantidad(item);
        this.audioTap.play();
    }

    eliminarItem(item: any) {
        this.carritoService.botonEliminarItem(item);
        this.audioTapLow.play();
    }

    clearOrderData() {
        this.carritoService.clearOrderData();
    }

    botonPreCheckout() {
        this.carritoService.botonPreCheckout();
        this.audioConfirm.play();
    }

    carritoLength() {
        return this.carritoService.getCartTotalItems();
    }

    
    @ViewChild('carritoComponent', { static: false })
    carritoComponent!: ElementRef;
    
    ngAfterViewInit() {
        this.hideCarritoComponent(); // Oculta el componente inicialmente
      }
    
      verBolsa() {
        const carritoContent = this.carritoComponent.nativeElement.innerHTML;
    
        Swal.fire({
          html: carritoContent,
          background: 'rgb(24, 25, 32)',
          width: '80%',
          focusConfirm: false,
          confirmButtonText: '<b>Finalizar compra</b>',
          confirmButtonColor: '#2b8565',
          showCancelButton: true,
          cancelButtonText: '<b>Seguir comprando</b>',
        });
      }
    
      hideCarritoComponent() {
        this.carritoComponent.nativeElement.style.display = 'none';
      }
    
      showCarritoComponent() {
        this.carritoComponent.nativeElement.style.display = 'block';
      }
    
}
