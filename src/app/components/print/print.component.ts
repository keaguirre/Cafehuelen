import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CarritoService } from 'src/app/services/carritoService/carrito.service';

@Component({
  selector: 'app-print',
  templateUrl: './print.component.html',
  styleUrls: ['./print.component.css']
})
export class PrintComponent implements OnInit {

  //   ngOnInit(): void {
  //     const orderData = localStorage.getItem('orderData');
  //     console.table(orderData)
  // }

  orderCarrito: any;
  itemsCarrito: any;
  infoBack: any;

  constructor(private _route: ActivatedRoute, private carritoService: CarritoService) { }

  ngOnInit(): void {
    this._route.queryParams.subscribe(params => {
      this.orderCarrito = params;
      this.itemsCarrito = this.carritoService.itemsCarritoservice
      this.infoBack = this.carritoService.ultimaCompra
    })
      console.log('print')
    }

  }

