import { Component, Output, EventEmitter, Input, ViewChild, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
//componente figlio 
import { PrestitiComponent} from './prestiti/prestiti.component';
//servizio
import { FromReqBinService } from '../call_server.service';
//classi
import { Book } from '../book';
import { Archive } from '../archive'


@Component({
  selector: 'app-ricerca',
  templateUrl: './ricerca.component.html',
  styleUrls: ['./ricerca.component.css'],
  imports: [ CommonModule, PrestitiComponent ], 
  standalone: true
})
 

export class RicercaComponent implements OnInit {

  //riferimento al componente figlio Prestiti che permette a componente ricerca di accedere a metodo resetValues di prestiti
  @ViewChild(PrestitiComponent) childComponent: PrestitiComponent;

  //variabili prese in input e passate in output a root component 
  @Input() mostraRicerca: boolean;
  @Output() closeSearchEvent = new EventEmitter();

    
  //istanziazione del servizio FromReqBinService tramite il parametro servizio all'interno del costruttore del componente
  constructor(private servizio: FromReqBinService) {}

  ngOnInit() {}

  // Dichiarazione della variabile archivio come oggetto di tipo archive
  archivio: Archive; 
  risultatoRicerca: string = '';
  //Variabili da passare a prestiti component
  One_result: boolean = false;
  Prestato:boolean = true;
  Book_found: Book;
  InputPrestaBook: boolean=false;
  InputRestituisciBook: boolean=true;


  //metodo search permette di ottenere l'archivio dal db ed effettuare una ricerca
  search() {
    
    //resetto variabili di interesse nel child prestiti
    this.childComponent.resetValues();

    //risetto book_found ad undefined ad ogni nuova ricerca
    this.Book_found = undefined;
    //boolean per indicare se il contenuto dell'archivio risultante contiene un solo elemento e condizioni prestito del libro 
    this.One_result= false;
    this.Prestato= true;

    //input assume il valore del contenuto preso in input
    var input: HTMLInputElement = document.getElementById("input_ricerca") as HTMLInputElement;
    //newinput prende il valore del campo di input
    var newinput = input.value;
    console.log("TEST input di ricerca :", newinput)

    //nel caso l'input venga svuotato
    if (!newinput) {
      this.risultatoRicerca="In attesa di un input...";
    }

    //se l'input è pieno:
    else {

      //uso il metodo del servizio per ricavare l'archivio
      this.servizio.getArch().subscribe({
        //nel caso l'observable vada a buon fine e ottenga l'archivio
        next: archivio => {
          //salvo dentro archivio l'archivio estratto dal db
          this.archivio = archivio;
          console.log("TEST archivio estratto dal database: ",this.archivio)
          //applico il metodo cerca su archivio
          const risultato = this.archivio.cerca(newinput);
         
   
          //se la lunghezza dell'array archivio è 0, non c'è match tra la stringa e il contenuto dell'archivio
          if (risultato.length === 0) {
            //assegno a risultatoRicerca il messaggio da visualizzare come risposta
            this.risultatoRicerca= "Non ci sono libri corrispondenti alla ricerca";} 

          //se c'è esattamente un match
          else if (risultato.length === 1) {
            
            //salvo il libro in un oggetto che mi porterò nel component prestiti
            this.Book_found= risultato[0];
            console.log("TEST unico libro corrispondente alla ricerca: ",this.Book_found)
            //setto a true la variabile che mi indicherà che il match è precisamente uno
            this.One_result=true;
            //salvo dentro libro_match la stringa che sarà poi assegnata a risultatoRicerca
            let libro_match = risultato.map(item => {
              // Verifica se il nominativo è una stringa vuota: assume valore stringa vuota nel caso affermativo, la stringa idonea alla presentazione altrimenti
              let nominativoString = item.nominativo !== '' ? `Nominativo: ${item.nominativo}` : '';
              //se nominativoString è una stringa vuota la variabile Prestato viene impostata a false (di default è true)
              if (nominativoString === '') {
                this.Prestato = false;
              }
              //definisco contenuto finale di libro_match
              return `Autore: ${item.autore}\nTitolo: ${item.titolo}\nPosizione: ${item.posizione}\n${nominativoString}`;
            });
            //uso la posizione 0 di libro_match perchè la stringa è salvata dentro una lista
            this.risultatoRicerca = libro_match[0];
          }

          //se più di un libro matcha la ricerca
          else if (risultato.length > 1) {
            // salvo dentro risultato ricerca la stringa che mostra il numero di match
            this.risultatoRicerca= "Ci sono " + risultato.length + " corrispondenze all'interno dell'archivio";
          }
        },
        //nel caso il recupero dell'archivio dal db non andasse a buon fine
        error: error => {
          // mostro in console l'errore 
          console.error(error);
          // mostro errore nel contenitore risultato
          this.risultatoRicerca= 'Errore durante la ricerca, si prega di riprovare.';
        }
      });
    }
  }


  //metodo invocato da tasto indietro: riporta tutte le variabili necessarie ai valori originali
  clean() {
    //one_result viene reimpostato a false perchè altrimenti se si trovasse un libro non in prestito e si spingesse chiudi per poi riaprire la ricerca, resterebbero i bottoni.
    this.One_result = false;
    this.Book_found = undefined;
    //risetto risultato ricerca a stringa vuota
    this.risultatoRicerca = '';
    //risetto Presta e restituisci ai valori originali
    this.InputPrestaBook= false;
    this.InputRestituisciBook =true;
    //emette l'evento che invoca il metodo closeSearch di root: imposta mostraRicerca=false nascondendo tutto il blocco ricerca
    this.closeSearchEvent.emit();
  }

}