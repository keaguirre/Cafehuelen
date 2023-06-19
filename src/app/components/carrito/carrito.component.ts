import { Component } from '@angular/core';
import { CarritoService } from 'src/app/services/carritoService/carrito.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.css']
})
export class CarritoComponent {
  audioTap!: HTMLAudioElement;
  constructor(private carritoService: CarritoService) {
    this.audioTap = new Audio();
    this.audioTap.src = '../../../assets/audios/tap.mp3'
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
    this.carritoService.botonClearCart();;
  }
  
  decrementarCantidad(item: any) {
    this.carritoService.decrementarCantidad(item);
  }

  incrementarCantidad(item: any) {
    this.carritoService.incrementarCantidad(item);
  }

  eliminarItem(item: any) {
    this.carritoService.botonEliminarItem(item);
    this.audioTap.play();
  }

 
  botonPreCheckout() {
   this.carritoService.botonPreCheckout();
  }

}
