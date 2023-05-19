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
  public successMessage: string;
  public errorMessage: string;


  //metodo per inserire nuovo libro nell'archivio (ricarica archivio con nuovo libro )
  formInserimento() {

    // Logica per eseguire la ricerca
    for (const key in this.book) {
      if (Object.prototype.hasOwnProperty.call(this.book, key)) {
        let cleanedString = this.book[key]
          .replace(/\s{2,}/g, ' ') // Rimuove gli spazi multipli consecutivi
          .replace(/[^a-zA-Z0-9À-ÿ\s']/g, ''); // Rimuove caratteri non alfanumerici ma lascia caratteri accentati
        this.book[key] = cleanedString.trim(); // Rimuove spazi all'inizio e alla fine della stringa
      }
    }
    //console.log(this.book);
  
    //in questo observable gestisco nella next cosa fare se il recupero archivio funziona e nell'error cosa succede se fallisce
    this.servizio.getArch().subscribe({
  
      next: archivio => {
  
        this.archivio = archivio;
        console.log(this.archivio);
        let contiene = this.archivio.contieneLibro(this.book);
        console.log(contiene);
  
        if (!contiene) {
          this.archivio.aggiungiLibro(this.book);
  
          // observable per caricare l'archivio sul server remoto
          this.servizio.postArch(this.archivio).subscribe({
  
            next: successMessage => {
              console.log(successMessage);
              // Gestisci il successo della sovrascrittura
              this.successMessage = 'Sovrascrittura avvenuta con successo';
              this.errorMessage = null;
            },
            error: errorMessage => {
              console.error(errorMessage);
              // Gestisci l'errore nella sovrascrittura
              this.successMessage = null;
              this.errorMessage = 'Errore durante la sovrascrittura dei dati: ' + errorMessage;
            }
          });
        }
      },
      //fallimento nell'observable del recupero archivio
      error: error => {
        // Qui puoi gestire gli errori
        console.error('Errore durante la richiesta:', error);
      }
    }); 
  }
  
  //Chiude l'inserimento e risetta tutto all'origine
  clean() {

    this.successMessage=null;
    this.errorMessage=null;
    this.mostraInserimento = false;
    this.book = new Book('', '', '', ''); // Reimposta un nuovo oggetto Book con valori vuoti
    this.closeInserisciEvent.emit();
  }
}
