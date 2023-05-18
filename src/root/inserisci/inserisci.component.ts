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
  @Output() closeInserisciEvent = new EventEmitter();
   
  ngOnInit() {}
  constructor(private servizio: FromReqBinService) {}

  archivio: Archive; // Dichiarazione della variabile archivio
  book: Book = new Book('', '', '', '');
  //risultatoRicerca: string = '';

  formInserimento() {
     // Logica per gestire l'invio del modulo
    let titolo = this.book.titolo
    let posizione = this.book.posizione
    let autore = this.book.autore

     console.log(titolo,posizione,autore);
    // Logica per eseguire la ricerca
    
  }

  clean() {
    this.mostraInserimento = false;
    this.book = new Book('', '', '', ''); // Reimposta un nuovo oggetto Book con valori vuoti
    this.closeInserisciEvent.emit();
  }
}
