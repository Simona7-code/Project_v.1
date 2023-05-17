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
  
  ngOnInit() {}
  constructor(private servizio: FromReqBinService) {}

  archivio: Archive; // Dichiarazione della variabile archivio
  risultatoRicerca: string = '';

  search() {

    //input prende il contenuto preso dall input
    var input: HTMLInputElement = document.getElementById("input_ricerca") as HTMLInputElement;
    //newname prende il valore del campo di input
    var newinput = input.value;
    //console.log(newinput);

    this.servizio.getArch().subscribe({
      next: archivio => {
        this.archivio = archivio;
        // Qui puoi accedere al contenuto dell'archivio
        const risultato = this.archivio.cerca(newinput);
        //Array.isArray(risultato) ? risultato.join(', ') : risultato per verificare se risultato è un array. Se è un array, lo uniamo in una singola stringa utilizzando il separatore , ; altrimenti, assegniamo il valore direttamente a risultatoRicerca.
        this.risultatoRicerca = Array.isArray(risultato) ? risultato.join(', ') : risultato;
      },
      error: error => {
        // Qui puoi gestire gli errori
        console.error('Errore durante la richiesta:', error);
      }
    });
    
  }
  clean() {
    this.mostraRicerca = false;
  }
}