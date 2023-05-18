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
    for (const key in this.book) {
      if (Object.prototype.hasOwnProperty.call(this.book, key)) {
        let cleanedString = this.book[key]
          .replace(/\s{2,}/g, ' ') // Rimuove gli spazi multipli consecutivi
          .replace(/[^a-zA-Z0-9À-ÿ\s]/g, ''); // Rimuove caratteri non alfanumerici ma lascia caratteri accentati
    
          this.book[key] = cleanedString.trim(); // Rimuove spazi all'inizio e alla fine della stringa
      }
    }

    console.log(this.book);


    this.servizio.getArch().subscribe({
      next: archivio => {
        this.archivio = archivio;

        console.log(this.archivio)

        let contiene = this.archivio.contieneLibro(this.book)
        console.log(contiene)
        if (!contiene){
          
        }
      
        
        
      },
      error: error => {
        // Qui puoi gestire gli errori
        console.error('Errore durante la richiesta:', error);
      }
    });
    
  }

  clean() {
    this.mostraInserimento = false;
    this.book = new Book('', '', '', ''); // Reimposta un nuovo oggetto Book con valori vuoti
    this.closeInserisciEvent.emit();
  }
}
