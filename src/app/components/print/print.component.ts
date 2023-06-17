import { Component, OnInit, Renderer2, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CarritoService } from 'src/app/services/carritoService/carrito.service';
import { ElementRef } from '@angular/core';
import { jsPDF } from "jspdf";


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
  

  constructor(private _route: ActivatedRoute, 
              private carritoService: CarritoService,
              private renderer: Renderer2,
              ) {
    this.infoQr = JSON.stringify(this.infoBack)
    this.infoBack
  }

  ngOnInit(): void {
    this._route.queryParams.subscribe(params => {
      this.orderCarrito = params;
      this.itemsCarrito = this.carritoService.itemsCarritoservice
      this.infoBack = this.carritoService.ultimaCompra
      this.infoQr = JSON.stringify(this.infoBack)
      // console.log('qr: ',this.infoQr)
    })
    this.imprimirPDF
      console.log('print')
    }

    imprimirBoleta(): void {
      const contenidoBoleta = document.getElementById('invoice-POS');
      const elementosBody = Array.from(document.body.children) as HTMLElement[];
    
      elementosBody.forEach((elemento: HTMLElement) => {
        if (elemento !== contenidoBoleta) {
          elemento.style.display = '';
        }
      });
    
      window.print();
    
      elementosBody.forEach((elemento: HTMLElement) => {
        if (elemento !== contenidoBoleta) {
          elemento.style.display = '';
        }
      });
    }


    imprimirPDF(contenido: string): void {
      const doc = new jsPDF();
      doc.text(contenido, 10, 10);
      doc.save('test.pdf');
    }
  
    
    @ViewChild('invoice-POS')
    hiddenButtonRef!: ElementRef;
    
    // forceClickHiddenButton(): void {
    //   const hiddenButton = this.hiddenButtonRef.nativeElement as HTMLButtonElement;
    //   hiddenButton.click();
    // }

  }

