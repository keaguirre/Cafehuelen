import { Component, OnInit } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { ProductosService } from 'src/app/services/ProductosService/productos.service';
import Swal from 'sweetalert2';
import { CarritoService } from 'src/app/services/carritoService/carrito.service';
import { Subject, Subscription } from 'rxjs';
import { CarritoComponent } from 'src/app/components/carrito/carrito.component';
import { TitleCasePipe } from '@angular/common';
import { NavbarClienteComponent } from 'src/app/components/navbar-cliente/navbar-cliente.component';
import { CompraService } from 'src/app/services/compraService/compra.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';



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
