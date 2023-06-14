import { Component } from '@angular/core';
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
    ngOnInit(): void {
        this.CatalogoMenunavbar();
    }

    constructor(
        private carritoService: CarritoService,
        private titlecasePipe: TitleCasePipe,
        private prodService: ProductosService,
        private compraService: CompraService,
        private catalogo: CatalogoComponent
    ) {}

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
                // console.log('categorias', categorias);
                // console.log('preparaciones', preparaciones);

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
                // console.log('MENUCATALOGO', this.MenuCatalogo);
                // console.log('RESPUESTA FINAL', respuestaFinal);
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
    }

    decrementarCantidad(item: any) {
        this.carritoService.decrementarCantidad(item);
    }

    incrementarCantidad(item: any) {
        this.carritoService.incrementarCantidad(item);
    }

    eliminarItem(item: any) {
        this.carritoService.botonEliminarItem(item);
    }

    clearOrderData() {
        this.carritoService.clearOrderData();
    }

    botonPreCheckout() {
        this.carritoService.botonPreCheckout();
    }

    carritoLength() {
        return this.carritoService.getCartTotalItems();
    }

    verCarrito() {
        this.catalogo.mostrarComponenteCarrito();
    }
}
