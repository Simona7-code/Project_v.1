import { Component, Output, EventEmitter, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
//servizio
import { FromReqBinService } from '../call_server.service';
//classi
import { Archive } from '../archive'
import { Book } from '../book';


@Component({
  selector: 'app-inserisci',
  templateUrl: './inserisci.component.html',
  styleUrls: ['./inserisci.component.css'],
  imports: [ CommonModule, FormsModule],
  standalone: true
})


export class InserisciComponent implements OnInit {

  //variabili prese in input e passate in output a root component 
  @Input() mostraInserimento: boolean;
  @Output() closeInserisciEvent = new EventEmitter();
   
  
  //istanziazione del servizio FromReqBinService tramite il parametro servizio all'interno del costruttore del componente
  constructor(private servizio: FromReqBinService) {}
  ngOnInit() {}
  
  // Dichiarazione variabili
  archivio: Archive; 
  //valori di book di riempiono al submit del form
  book: Book = new Book('', '', '', '');
  successMessage: string;
  errorMessage: string;


  //metodo per inserire nuovo libro nell'archivio (ricarica archivio con nuovo libro)
  formInserimento() {

    // rimuovo da stringhe input caratteri non desiderati, spazi multipli e spazi a inizio e fine stringa
    this.book.autore = this.book.autore.replace(/\s{2,}|[^a-zA-Z0-9À-ÿ\s'.]/g, ' ').trim();
    this.book.titolo = this.book.titolo.replace(/\s{2,}|[^a-zA-Z0-9À-ÿ\s'.]/g, ' ').trim();
    this.book.posizione = this.book.posizione.replace(/\s{2,}|[^a-zA-Z0-9À-ÿ\s'.]/g, ' ').trim();
 
    console.log("TEST libro con stringhe pulite: ", this.book);
  
    // recupero archivio tramite servizio
    this.servizio.getArch().subscribe({
      //nel caso il recupero vada a buon fine
      next: archivio => {
  
        //salvo archivio dentro variabile archivio del componente
        this.archivio = archivio;
        console.log("TEST archivio ricavato dal db: ", this.archivio);

        let contiene = this.archivio.contieneLibro(this.book);
        console.log("TEST Il libro è già contenuto nell'archivio?: ",contiene);

        let posizioneOccupata=this.archivio.stessaPosizione(this.book)
        console.log("TEST Il libro ha la stessa posizione di un altro libro dell'archivio?: ",posizioneOccupata);
  
        //se il libro non è contenuto nell'archivio e la posizione è libera lo aggiungo e aggiorno l'archivio sul server
        if (!contiene && !posizioneOccupata) {

          this.archivio.aggiungiLibro(this.book);
          console.log("TEST archivio post aggiunta nuovo libro: ",this.archivio);
  
          // carico l'archivio sul server remoto
          this.servizio.postArch(this.archivio).subscribe({
             
            //nel caso l'observable vada a buon fine 
            next: () => {
              // messaggio successo della sovrascrittura
              this.successMessage = 'Inserimento nuovo libro avvenuto con successo';
              this.errorMessage = null;
            },

            //nel caso l'observable fallisca
            error: () => {
              
              // messaggio errore nella sovrascrittura
              this.successMessage = null;
              this.errorMessage = 'Errore durante inserimento del nuovo libro, riprovare';
            }
          });
        }

        //se il libro è già contenuto nell'archivio restituisco errore
        else if (contiene){
            this.successMessage = null;
            this.errorMessage = 'Il libro che stai cercando di inserire è già presente nell\'archivio.';
            console.log("TEST ",  this.errorMessage);
        }

        //Se il libro non è contenuto in archivio ma la posizione è già occupata restituisco errore
        else if (posizioneOccupata){
          this.successMessage = null;
            this.errorMessage = 'La posizione in cui stai cercando di aggiungere il libro è già occupata, si prega di cambiare la posizione.';
            console.log("TEST ",  this.errorMessage);
        }
      },

      //nel caso il recupero dell'archivio dal db non andasse a buon fine
      error: error => {
        // mostro in console l'errore
        console.error(error);
        // messaggio di errore
        this.errorMessage = 'Inserimento non andato a buon fine causa errore nel recupero dell\'archivio dal database, si prega di riprovare.';
      } 
    }); 
  }
   
  //metodo che chiude il blocco dell'inserimento e risetta le variabili ai valori originali 
  clean() {

    this.successMessage=null;
    this.errorMessage=null;
    this.mostraInserimento = false;
    this.book = new Book('', '', '', ''); // Reimposta un nuovo oggetto Book con valori vuoti
    // emette l'evento che invoca il metodo closeInserisci di root: imposta mostraInserisci=false nascondendo tutto il blocco inserisci
    this.closeInserisciEvent.emit();
  }
}
