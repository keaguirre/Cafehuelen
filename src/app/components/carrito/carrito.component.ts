import { Component } from '@angular/core';
import { CarritoService } from 'src/app/services/carritoService/carrito.service';

@Component({
    selector: 'app-carrito',
    templateUrl: './carrito.component.html',
    styleUrls: ['./carrito.component.css'],
})
export class CarritoComponent {
    paraServir: boolean = false;
    paraLlevar: boolean = false;
    botonHabilitado: boolean = false;
    decision!: string;
    audioTap!: HTMLAudioElement;
    audioConfirm!: HTMLAudioElement;
    audioTapLow!: HTMLAudioElement;
    
    constructor(private carritoService: CarritoService) {
      this.audioTapLow = new Audio();
      this.audioTapLow.src = '../../../assets/audios/tap_low.mp3'
      this.audioTap = new Audio();
      this.audioTap.src = '../../../assets/audios/tap.mp3'
      this.audioConfirm = new Audio();
      this.audioConfirm.src = '../../../assets/audios/confirme_accion.mp3'

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

    onCheckChange(checkbox: string) {
        if (checkbox === 'paraServir') {
            this.paraServir = !this.paraServir;
            this.paraLlevar = false;
            this.decision = 'Para Servir';
        } else if (checkbox === 'paraLlevar') {
            this.paraLlevar = !this.paraLlevar;
            this.paraServir = false;
            this.decision = 'Para Llevar';
        }
        this.carritoService.setDecision(this.decision);
        this.actualizarEstadoBoton();
    }

    private actualizarEstadoBoton() {
        this.botonHabilitado = this.paraServir || this.paraLlevar;
    }
}
