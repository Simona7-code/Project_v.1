import { Component, Output, EventEmitter, Input } from '@angular/core';
import { FromReqBinService } from '../call_server.service';
import { CommonModule } from '@angular/common';
import { NgIf } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Archive } from '../archive'


@Component({
  selector: 'app-ricerca',
  templateUrl: './ricerca.component.html',
  styleUrls: ['./ricerca.component.css'],
  imports: [ CommonModule, FormsModule, ReactiveFormsModule,NgIf ],
  standalone: true
})


export class RicercaComponent {

  @Input() mostraRicerca: boolean;
  //raccoglie in automatico l'evento che si trova in input htlm del proprio component
  @Output() newInputEvent= new EventEmitter<string>();
  @Output() closeSearchEvent = new EventEmitter();

  
  ngOnInit() {}
  constructor(private servizio: FromReqBinService) {}

  archivio: Archive; // Dichiarazione della variabile archivio
  risultatoRicerca: string = '';

  search() {

    //input prende il contenuto preso dall input
    var input: HTMLInputElement = document.getElementById("input_ricerca") as HTMLInputElement;
    //newname prende il valore del campo di input
    var newinput = input.value;

    if (!newinput) {
      this.risultatoRicerca="In attesa di un input...";
    }

    else {
      //console.log(newinput);

      this.servizio.getArch().subscribe({
        next: archivio => {
          this.archivio = archivio;
          const risultato = this.archivio.cerca(newinput);
          console.log(risultato)
   
          if (risultato.length === 0) {
            this.risultatoRicerca= "Non ci sono libri corrispondenti alla ricerca";} 

          else if (risultato.length === 1) {

            let libro_match = risultato.map(item => {
              // Verifica se il nominativo è una stringa vuota
              let nominativoString = item.nominativo !== '' ? `Nominativo: ${item.nominativo}` : '';
              return `Autore: ${item.autore}\nTitolo: ${item.titolo}\nPosizione: ${item.posizione}\n${nominativoString}`;
            });
            this.risultatoRicerca = libro_match[0];
          }

          else if (risultato.length > 1) {
            this.risultatoRicerca= "Ci sono " + risultato.length + " corrispondenze all'interno dell'archivio";
          }
        },
        error: error => {
          // Qui puoi gestire gli errori
          console.error('Errore durante la richiesta:', error);
        }
      });
    }
  }
  clean() {
    this.mostraRicerca = false;
    this.risultatoRicerca = '';
    this.closeSearchEvent.emit();
  }

}