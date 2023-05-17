import { Component, Output, EventEmitter, Input } from '@angular/core';
import { FromReqBinService } from '../call_server.service';
import { CommonModule } from '@angular/common';
import { NgIf } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Archive } from '../archive'
import { Book } from '../book';


@Component({
  selector: 'app-inserisci',
  templateUrl: './inserisci.component.html',
  styleUrls: ['./inserisci.component.css'],
  imports: [ CommonModule, FormsModule, ReactiveFormsModule, NgIf ],
  standalone: true
})
export class InserisciComponent {

  @Input() mostraInserimento: boolean;
  @Output() inserimentoEseguito: EventEmitter<void> = new EventEmitter<void>();
   
  ngOnInit() {}
  constructor(private servizio: FromReqBinService) {}

  archivio: Archive; // Dichiarazione della variabile archivio
  book: Book = new Book('', '', '', '');
  //risultatoRicerca: string = '';

  formInserimento() {
     // Logica per gestire l'invio del modulo

     console.log(this.book);
    // Logica per eseguire la ricerca
    this.inserimentoEseguito.emit(); // Emesso l'evento "ricercaEseguita"
  }
}
