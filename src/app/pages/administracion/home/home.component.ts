import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js/auto';
import { AnaliticasService } from 'src/app/services/analiticasService/analiticas.service';
// import Chart from 'chart.js/auto';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  public chart: any;
  public chart1: any;
  responseComprasDiaSemana: any = [];
  responseCompraMesActual: any = [];
  responseComprasMesSemana: any = [];
  responseComprasPorMesAnual: any = [];
  responseCompraSemanalAnual: any = [];
  responseComprasHoy: any;
  
  constructor(private analitica:AnaliticasService) {
  }

  onOnInit(): void {
    console.log('home init')
    this.onList();
    this.limitarTamanoPestanaNavegador();
  }


  onList(): void{
    this.analitica.obtenerListadoComprasHoy().then(respuesta => {
      console.log('respuesta: ', respuesta)
      this.responseComprasHoy = respuesta;
      console.log('response: ', this.responseComprasHoy)
    });
  }

  limitarTamanoPestanaNavegador() {
    const tamanoMinimo = 800; // Puedes ajustar este valor según tus necesidades

    if (window.innerWidth < tamanoMinimo) {
      window.resizeTo(tamanoMinimo, window.innerHeight);
    }
  }


}
