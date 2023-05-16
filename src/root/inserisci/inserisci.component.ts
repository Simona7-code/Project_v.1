import { Component, Output, EventEmitter} from '@angular/core';

@Component({
  selector: 'app-inserisci',
  templateUrl: './inserisci.component.html',
  styleUrls: ['./inserisci.component.css'],
  standalone: true
})
export class InserisciComponent {

  @Output() inserimentoEseguito: EventEmitter<void> = new EventEmitter<void>();

  eseguiInserimento() {
    // Logica per eseguire la ricerca
    this.inserimentoEseguito.emit(); // Emesso l'evento "ricercaEseguita"
  }
}
