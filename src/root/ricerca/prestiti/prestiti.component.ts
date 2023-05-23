import { Component, Input, ChangeDetectorRef, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
//servizio
import { FromReqBinService } from '../../call_server.service';
//classi
import { Archive } from '../../archive'
import { Book } from '../../book';


@Component({
  selector: 'app-prestiti',
  templateUrl: './prestiti.component.html',
  styleUrls: ['./prestiti.component.css'],
  imports: [ CommonModule, FormsModule ], 
  standalone: true
})


export class PrestitiComponent implements OnInit{

  //variabili con valori ereditati in input da Ricerca e definizione nuove variabili 
  @Input() Prestato: boolean;
  @Input() One_result: boolean;
  @Input() Book_found:Book;
  @Input() archivio:Archive;
  @Input() InputPrestaBook:boolean;
  @Input() InputRestituisciBook:boolean;
  successMessage: string;
  errorMessage: string;
  clientInputValue: string;

  //istanziazione del servizio FromReqBinService e ChangeDetectorRef all'interno del costruttore del componente per ricavare/caricare archivio su db e  gestire la rilevazione dei cambiamenti/l'aggiornamento della vista in un componente
  constructor(private servizio: FromReqBinService, private cdr: ChangeDetectorRef) { }
  ngOnInit() { }


  //metodo per visualizzare e nascondere contenuto sezione "presa in prestito"
  InputPresta(){
    this.InputPrestaBook = !this.InputPrestaBook;
  }


  //metodo per "resettare" i valori delle variabili in questo componente ad ogni nuova ricerca nel componente padre
  resetValues() {
    // Reimposta i valori desiderati del componente figlio
    this.InputPrestaBook = false;
    this.InputRestituisciBook=true;
    //questi determinano gli output della cancellazione libro
    this.successMessage = undefined;
    this.errorMessage = undefined;
    // Forza la rilevazione dei cambiamenti e l'aggiornamento della vista del componente prestiti in risposta a tali modifiche apportate dal componente ricerca.
    this.cdr.detectChanges();
  }


  // metodo per cancellare libro da archivio ed effetuare il caricamento della nuova versione dell'archivio nel db
  cancella_libro (){

    console.log("TEST libro da cancellare: ", this.Book_found)
    console.log("TEST archivio pre cancellazione: ", this.archivio)

    if ( this.archivio.contieneLibro(this.Book_found) ){
      this.archivio.cancellaLibro(this.Book_found)

      console.log("TEST archivio POST cancellazione e pre-load: ", this.archivio)
  
      // carico l'archivio sul server remoto
      this.servizio.postArch(this.archivio).subscribe({
        next: () => {
          // messaggio successo della sovrascrittura archivio
          this.successMessage = 'Rimozione libro dall\'archivio avvenuta con successo.';
          // nasconde bottone di prestito
          this.InputPrestaBook=false;
        },
        error: () => {
          // messaggio fallimento della sovrascrittura archivio
          this.errorMessage = 'Errore durante la rimozione del libro. Riprovare.';
          // nasconde bottone di prestito
          this.InputPrestaBook=false;
        }
      });
    
    }
    //se l'archivio non contiene il libro (quindi è stato già eliminato una volta)
    else{

      //messaggio fallimento cancellazione
      this.errorMessage = 'Questo libro è stato già rimosso, procedere ad una nuova ricerca.';
      // nasconde bottone di prestito
      this.InputPrestaBook=false;
    }
  }


  // metodo per restituire libro (rimuove nominativo da libro in archivio ed effetua il caricamento della nuova versione dell'archivio nel db
  Restituisci(){

    console.log("TEST libro da restituire: ", this.Book_found)
    console.log("TEST archivio pre restituzione: ", this.archivio)

    this.archivio.rimuoviNominativoALibro(this.Book_found)
 
    console.log("TEST archivio post restituzione pre-load: ", this.archivio)

    // carica l'archivio sul server remoto
    this.servizio.postArch(this.archivio).subscribe({
      next: () => {
        // messaggio successo della sovrascrittura
        this.successMessage = 'Restituzione inserita con successo.';
        //nascondo tasto di restituzione nel caso successo sovrascrittura
        this.InputRestituisciBook= false;
      },
      error: () => {
        // messaggio fallimento restituzione/caricamento archivio 
        this.errorMessage = 'Errore durante la restituzione del libro. Riprovare.';
      }
    });
  }


  // metodo per dare in prestito un libro (rimuove nominativo da libro in archivio ed effetua il caricamento della nuova versione dell'archivio nel db
  Presta(){

    console.log("TEST libro da prestare: ", this.Book_found)
    console.log("TEST archivio pre prestito: ", this.archivio)

    this.archivio.inserisciNominativoALibro(this.Book_found, this.clientInputValue)

    console.log("TEST archivio post prestito: ", this.archivio)

    // caricamento archivio sul server remoto
    this.servizio.postArch(this.archivio).subscribe({
      next: () => {
        // messaggio successo della sovrascrittura
        this.successMessage = 'Prenotazione inserita con successo.';
        //nascondo tasto di prestito nel caso successo sovrascrittura
        this.InputPrestaBook=false;
      },
      error: () => {
        // messaggio fallimento della sovrascrittura
        this.errorMessage = 'Errore durante la prenotazione del libro. Riprovare.';
      }
    });
  }
}