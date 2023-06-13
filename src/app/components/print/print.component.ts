import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CarritoService } from 'src/app/services/carritoService/carrito.service';

@Component({
  selector: 'app-print',
  templateUrl: './print.component.html',
  styleUrls: ['./print.component.css']
})
export class PrintComponent implements OnInit {

  orderCarrito: any;
  itemsCarrito: any;
  infoBack: any;
  infoQr: string = '';


  constructor(private _route: ActivatedRoute, private carritoService: CarritoService) {
    this.infoQr = JSON.stringify(this.infoBack)
    this.infoBack
  }

  ngOnInit(): void {
    this._route.queryParams.subscribe(params => {
      this.orderCarrito = params;
      this.itemsCarrito = this.carritoService.itemsCarritoservice
      this.infoBack = this.carritoService.ultimaCompra
      this.infoQr = JSON.stringify(this.infoBack)
      console.log('qr: ',this.infoQr)
    })
      console.log('print')
    }

  }

