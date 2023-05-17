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
//ricercaEseguita si popola qui e tramite la chiamata di esegui ricerca nel nodo root, qui si esegue la funzione e viene restituito e popolato il valore di ricercaEseguita, che sarà il valore che sarà passato come output nella chiamata della root

export class RicercaComponent {

  @Input() mostraRicerca: boolean;
  //raccoglie in automatico l'evento che si trova in input htlm del proprio component
  @Output() newInputEvent= new EventEmitter<string>();
  
  ngOnInit() {}
  constructor(private servizio: FromReqBinService) {}

  archivio: Archive; // Dichiarazione della variabile archivio

  search() {

    //console.log(this.archivio)
    //input prende il contenuto preso dall input
    var input: HTMLInputElement = document.getElementById("input_ricerca") as HTMLInputElement;
    //newname prende il valore del campo di input
    var newinput = input.value;
    // Logica per gestire il cambiamento del valore di input
    console.log(newinput);

    this.servizio.getArch().subscribe({
      next: archivio => {
        this.archivio = archivio; 
        // Qui puoi accedere al contenuto dell'archivio
        console.log(archivio);
        console.log(newinput)



      },
      error: error => {
        // Qui puoi gestire gli errori
        console.error('Errore durante la richiesta:', error);
      }
    });
    
  }
}