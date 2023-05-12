import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-ricerca',
  templateUrl: './ricerca.component.html',
  styleUrls: ['./ricerca.component.css'],
  standalone: true
})
//ricercaEseguita si popola qui e tramite la chiamata di esegui ricerca nel nodo root, qui si esegue la funzione e viene restituito e popolato il valore di ricercaEseguita, che sarà il valore che sarà passato come output nella chiamata della root
export class RicercaComponent {
  @Output() ricercaEseguita: EventEmitter<void> = new EventEmitter<void>();

  eseguiRicerca() {
    // Logica per eseguire la ricerca
    this.ricercaEseguita.emit(); // Emesso l'evento "ricercaEseguita"
  }
}