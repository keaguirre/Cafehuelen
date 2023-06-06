import { Component } from '@angular/core';
import Chart from 'chart.js/auto';

@Component({
  selector: 'app-graficos-admin',
  templateUrl: './graficos-admin.component.html',
  styleUrls: ['./graficos-admin.component.css']
})


export class GraficosAdminComponent {
  public chart: any;
  public chart1: any;
  ngOnInit(): void {
    this.createChart();
  };
  
  createChart() {
    this.chart = new Chart("MyChart", {
      type: 'bar', //this denotes tha type of chart

      data: {// values on X-Axis
        labels: ['2022-05-10', '2022-05-11', '2022-05-12', '2022-05-13',
          '2022-05-14', '2022-05-15', '2022-05-16', '2022-05-17',],
        datasets: [
          {
            label: "Sales",
            data: ['467', '576', '572', '79', '92',
              '574', '573', '576'],
            backgroundColor: 'blue'
          },
          {
            label: "Profit",
            data: ['542', '542', '536', '327', '17',
              '0.00', '538', '541'],
            backgroundColor: 'limegreen'
          }
        ]
      },
      options: {
        aspectRatio: 2.5
      }

    });

  }
ingresoDiario(){
  this.chart1 = new Chart("ingresoDiario",{
    type:'line',
    data:{
    labels: ['2022-05-10', '2022-05-11', '2022-05-12', '2022-05-13',
    '2022-05-14', '2022-05-15', '2022-05-16', '2022-05-17',],
    datasets: [{
      label: 'My First Dataset',
      data: [65, 59, 80, 81, 56, 55, 40],
      fill: false,
      borderColor: 'rgb(75, 192, 192)',
      tension: 0.1
    }]
    },
    options:{
      aspectRatio:5
    }

  });
}
  
 
  
}
