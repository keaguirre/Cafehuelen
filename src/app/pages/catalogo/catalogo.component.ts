import { Component} from '@angular/core';
import { CarritoService } from 'src/app/services/carritoService/carrito.service';




@Component({
    selector: 'app-catalogo',
    templateUrl: './catalogo.component.html',
    styleUrls: ['./catalogo.component.css'],
})



export class CatalogoComponent {
    constructor(
        private carritoService: CarritoService,) { }

    mostrarCarrito: boolean = false;
    mostrarCatalogo: boolean = true;

    // BOTTOM NAV BAR
    mostrarComponenteCarrito() {
        this.mostrarCarrito = true;
        this.mostrarCatalogo = false;
    }
    mostrarCatalogoMenu() {
        this.mostrarCarrito = false;
        this.mostrarCatalogo = true;
    }

    itemsCarrito() {
        return this.carritoService.getCartItems();
    }

    carritoLength() {
        return this.carritoService.getCartTotalItems()
    }
    // BOTTOM NAV BAR



}
