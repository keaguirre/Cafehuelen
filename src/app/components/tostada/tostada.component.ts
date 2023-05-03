import { Component, Input } from '@angular/core';

@Component({
  selector: 'tostadaComponent',
  templateUrl: './tostada.component.html',
  styleUrls: ['./tostada.component.css']
})
export class TostadaComponent {

constructor(){}

@Input() toastMessage: string = '';//Respuesta de la api para mostrar al cliente

@Input() showToast = false;

onCreateStyle(){
}
onUpdateStyle(){
}
onDeleteStyle(){
}



}