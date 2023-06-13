import { Injectable } from '@angular/core';
import { TitleCasePipe } from '@angular/common';
import { CompraService } from '../compraService/compra.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Injectable({
    providedIn: 'root',
})

export class CarritoService {
    response!: any;
    ultimaCompra: any;

    constructor(
        private titleCasePipe: TitleCasePipe,
        private compraService: CompraService,
        private Router: Router
    ) {}

    getCart(): any {
        return JSON.parse(localStorage.getItem('cart') || '{}');
    }

    getCartItems(): any[] {
        let cart = this.getCart();
        let items: any[] = [];
        for (let producto in cart) {
            items.push(cart[producto]);
            // console.log('items', items);
        }
        return items;
    }

    addtoCart(producto: any): void {
        const nombreProductoTitleCase = this.titleCasePipe.transform(
            producto.nombre_prep
        );
        let cart = this.getCart();
        let id = producto.id_prep;
        let cantidad = cart[id] ? cart[id].cantidad + 1 : 1;
        let estado = (cart[id] = { producto, cantidad });
        localStorage.setItem('cart', JSON.stringify(cart));
        // console.log('cart', item);
        Swal.fire({
            icon: 'success',
            title: `${nombreProductoTitleCase} agregado`,
            showConfirmButton: false,
            timer: 1125,
        });
    }

    clearCart(): void {
        localStorage.removeItem('cart');
    }

    botonClearCart(): void {
        Swal.fire({
            icon: 'error',
            title: `¿Deseas eliminar todos los productos de la lista?`,
            showCancelButton: true,
            confirmButtonText: `Eliminar`,
            cancelButtonText: `Cancelar`,
            confirmButtonColor: '#2b8565',
        }).then((result) => {
            if (result.isConfirmed) {
                this.clearCart();
                Swal.fire({
                    icon: 'success',
                    title: `Lista de productos eliminada`,
                    showConfirmButton: false,
                    timer: 1125,
                });
            } else if (result.isDismissed) {
                Swal.fire({
                    icon: 'info',
                    title: `Lista de productos no eliminada`,
                    showConfirmButton: false,
                    timer: 1125,
                });
            }
        });
    }

    getCartLength(): number {
        let cart = this.getCart();
        return Object.keys(cart).length;
    }

    getCartTotalItems(): number {
        let cart = this.getCart();
        let total = 0;
        for (let item in cart) {
            total += cart[item].cantidad;
        }
        return total;
    }

    eliminarItem(item: any) {
        let cart = this.getCart();
        let id = item.producto.id_prep;
        delete cart[id];
        localStorage.setItem('cart', JSON.stringify(cart));
    }

    botonEliminarItem(item: any) {
        const nombreProductoTitleCase = this.titleCasePipe.transform(
            item.producto.nombre_prep
        );
        Swal.fire({
            icon: 'error',
            title: `¿Deseas eliminar ${nombreProductoTitleCase} de la lista?`,
            showCancelButton: true,
            confirmButtonText: `Eliminar`,
            cancelButtonText: `Cancelar`,
            confirmButtonColor: '#2b8565',
        }).then((result) => {
            if (result.isConfirmed) {
                this.eliminarItem(item);
                Swal.fire({
                    icon: 'success',
                    title: `${nombreProductoTitleCase} eliminado`,
                    showConfirmButton: false,
                    timer: 1125,
                });
            } else if (result.isDismissed) {
                Swal.fire({
                    icon: 'info',
                    title: `${nombreProductoTitleCase} no eliminado`,
                    showConfirmButton: false,
                    timer: 1125,
                });
            }
        });
    }

    incrementarCantidad(producto: any): void {
        let cart = this.getCart();
        // console.log('cart prev', cart)
        let id = producto.producto.id_prep;
        let item = cart[id];
        item.cantidad = item.cantidad + 1;
        // console.log('cart post', cart);
        // let cantidad = cart[id].cantidad + 1;
        // cart[id] = { producto, cantidad };
        localStorage.setItem('cart', JSON.stringify(cart));
    }

    decrementarCantidad(producto: any): void {
        const nombreProductoTitleCase = this.titleCasePipe.transform(
            producto.producto.nombre_prep
        );
        let cart = this.getCart();
        let id = producto.producto.id_prep;
        let item = cart[id];
        item.cantidad = item.cantidad - 1;
        localStorage.setItem('cart', JSON.stringify(cart));
        if (item.cantidad === 0) {
            Swal.fire({
                icon: 'error',
                title: `¿Deseas eliminar ${nombreProductoTitleCase} de la lista?`,
                showCancelButton: true,
                confirmButtonText: `Eliminar`,
                cancelButtonText: `Cancelar`,
                confirmButtonColor: '#2b8565',
            }).then((result) => {
                if (result.isConfirmed) {
                    this.eliminarItem(producto);
                    Swal.fire({
                        icon: 'success',
                        title: `${nombreProductoTitleCase} eliminado`,
                        showConfirmButton: false,
                        timer: 1125,
                    });
                } else if (result.isDismissed) {
                    Swal.fire({
                        icon: 'info',
                        title: `${nombreProductoTitleCase} no eliminado`,
                        showConfirmButton: false,
                        timer: 1125,
                    });
                    item.cantidad = item.cantidad + 1;
                    localStorage.setItem('cart', JSON.stringify(cart));
                }
            });
        }
    }

    getCartTotal(): number {
        let cart = this.getCart();
        let total = 0;
        for (let item in cart) {
            total += cart[item].producto.precio_prep * cart[item].cantidad;
        }
        return total;
    }

    getCartTotalIva(): number {
        let cart = this.getCart();
        let total = 0;
        for (let item in cart) {
            total += cart[item].producto.precio_prep * cart[item].cantidad;
        }
        return total * 0.19;
    }

    OnSubmitItemCompra(id_compra: number) {
        let cart = this.getCart();

        for (let item in cart) {
            let id_prep = cart[item].producto.id_prep;
            let cantidad = cart[item].cantidad;
            let precio = cart[item].producto.precio_prep;
            let itemCompra = { id_compra, id_prep, cantidad, precio };
            this.compraService.crearItemCompra(itemCompra).then((res) => {
                this.response = res;
                console.log('response', this.response);
            });
        }
    }

    sendOrder(order: any): void {
        let tipo_servicio_compra = 'Pa LLevar'; // Pa LLevar, Delivery
        let estado_compra = 'Pendiente'; // Pendiente, Aprobado, Rechazado
        let total_compra = this.getCartTotal(); // Precio total de la compra
        let procesador_pago_compra = 'MercadoPago'; // MercadoPago, PayPal, Stripe
        let id_transaccion_compra = '123456789'; // Id del pago en el procesador de pagos
        let iva = this.getCartTotalIva();
        // let cart = this.getCart();
        let totem_compra = 12;
        // let orderNumber = Math.floor(Math.random() * 1000000000);
        let orderData = {
            tipo_servicio_compra,
            estado_compra,
            total_compra,
            iva,
            procesador_pago_compra,
            id_transaccion_compra,
            totem_compra
        };
        localStorage.setItem('orderData', JSON.stringify(orderData));
    }
    sendOrderItem(orderItem: any): void {
        this.getCartItems().map((item: any) => {
            let id_prep = item.producto.id_prep;
            let id_compra = this.ultimaCompra.id_compra;
            let cantidad_item = item.cantidad;
            let precio_unitario_item = item.producto.precio_prep;
            let total_item = item.producto.precio_prep * item.cantidad;
            let itemCompra = {
                id_prep,
                cantidad_item,
                precio_unitario_item,
                id_compra,
                total_item,
            };

            // console.log('itemCompra', itemCompra);

            this.compraService
                .crearItemCompra(itemCompra)
                .then((res) => {
                    this.response = res;

                })
                .catch((err) => {
                    console.log('err', err);
                });
        });
    }

    clearOrderData(): void {
        localStorage.removeItem('orderData');
    }

    retirarInfoOrden(): any {
        const orderData = localStorage.getItem('orderData');
        if (orderData) {
            return JSON.parse(orderData);
        } else {
            return null;
        }
    }
    itemsCarritoservice: any;

    onCreate(cod: string): void {
        switch (cod) {
            case 'crearCompra':
                try {
                    const InfoOrden = this.retirarInfoOrden();
                    // console.log('infoOrden', InfoOrden);
                    if (InfoOrden) {
                        this.compraService
                            .crearCompra(InfoOrden)
                            .then((respuesta) => {
                                if (respuesta) {
                                    // console.log(respuesta, 'respuesta del if ');
                                    Swal.fire({
                                        icon: 'success',
                                        title: `Compra realizada con éxito`,
                                        showConfirmButton: false,
                                        timer: 1125,
                                    });
                                    this.ultimaCompra = respuesta;
                                    this.Router.navigate(['print'], {queryParams: this.retirarInfoOrden(), skipLocationChange: true});
                                    this.clearOrderData();
                                    this.itemsCarritoservice = this.getCartItems();
                                    this.sendOrderItem(this.getCartItems());
                                    this.clearCart();
                                }
                                // console.log('ultimaCompra', this.ultimaCompra);
                            });
                    }
                } catch (error) {
                    console.log(error);
                    Swal.fire({
                        icon: 'error',
                        title: `Error al realizar la compra`,
                        showConfirmButton: false,
                        timer: 1125,
                    });
                }
                break;
        }
    }

    itemsCarrito() {
        return this.getCartItems();
    }

    botonPreCheckout() {
        // console.log('Items Carrito', this.itemsCarrito());
        // console.log('CarritoArray', this.carritoArray());
        this.sendOrder(this.getCart);
        Swal.fire({
            html:
                '<div class="row">' +
                '<div class="col-md-6">' +
                // '<img src="https://icons8.com/icon/5biqtJIXNcxO/shopping-cart" class="img-fluid" alt="Responsive image">' +
                '</div>' +
                '<h3 class="card-title text-3xl text-center font-bold text-gray-800 mb-2"> Carrito de compras </h3>' +
                '<div class="col-md-6">' +
                '<ul>' +
                this.itemsCarrito().map((item: any) => {
                    const nombreProductoTitleCase =
                        this.titleCasePipe.transform(item.producto.nombre_prep);
                    return (
                        '<li>' +
                        nombreProductoTitleCase +
                        ' x ' +
                        item.cantidad +
                        ' = $ ' +
                        item.producto.precio_prep * item.cantidad +
                        '</li>'
                    );
                }) +
                '</div>' +
                '<div class="col-md-6">' +
                '<p class="text-center">Total: $ ' +
                this.getCartTotal() +
                '</p>' +
                '</div>' +
                '</div>',
            focusConfirm: false,
            confirmButtonText: '<b>Finalizar compra</b>',
            confirmButtonColor: '#2b8565',
            showCancelButton: true,
            cancelButtonText: '<b>Seguir comprando</b>',
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire({
                    title: 'Espere mientras procesamos su pedido',
                    html:
                        '<div class="spinner-border" role="status">' +
                        '<span class="sr-only">Loading...</span>' +
                        '</div>',
                    
                    showConfirmButton: true,
                    allowOutsideClick: false,
                    allowEscapeKey: false,
                    allowEnterKey: false,
                    timer: 2000,
                    didOpen: () => {
                        Swal.showLoading();
                    },
                }).then((result) => {
                    if (result.dismiss === Swal.DismissReason.timer) {
                        this.onCreate('crearCompra');                        
                    }
                    
                });
            }
            else if (result.isDismissed) {
                this.clearOrderData();
                Swal.fire({
                    title: 'Seguimos comprando',
                    text: 'Su pedido no se ha procesado',
                    icon: 'info',
                    confirmButtonColor: '#2b8565',
                    timer: 1250,
                    showConfirmButton: false,
                });
            }
        });
    }
}
