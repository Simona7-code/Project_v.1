import { Component, Output, EventEmitter, Input } from '@angular/core';
import { FromReqBinService } from '../call_server.service';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Archive } from '../archive'
import { PrestitiComponent} from './prestiti/prestiti.component';
import { Book } from '../book';


@Component({
  selector: 'app-ricerca',
  templateUrl: './ricerca.component.html',
  styleUrls: ['./ricerca.component.css'],
  imports: [ CommonModule, FormsModule, ReactiveFormsModule, PrestitiComponent ],
  standalone: true
})

export class RicercaComponent {

  @Input() mostraRicerca: boolean;
  
  //raccoglie in automatico l'evento che si trova in input htlm del proprio component
  @Output() newInputEvent= new EventEmitter<string>();
  @Output() closeSearchEvent = new EventEmitter();

  
  ngOnInit() {}
  constructor(private servizio: FromReqBinService) {}

  // Dichiarazione della variabile archivio come oggetto di tipo archive
  archivio: Archive; 
  risultatoRicerca: string = '';
  //variabili da passare a prestiti component
  One_result: boolean = false;
  Prestato:boolean = true;
  Book_found: Book;
  //per reimpostare i valori di successo e fallimento cancellazione a undefined, cosi ogni volta che viene invocata la search ritrorna pulito

  successMessage: string; // Imposta il valore di successMessage a undefined
  errorMessage: string; // Imposta il valore di errorMessage a undefined
  


  search() {
    
    //per reimpostare i valori di successo e fallimento cancellazione a undefined, cosi ogni volta che viene invocata la search ritrorna pulito
    this.successMessage = undefined; 
    this.errorMessage = undefined; 


    console.log("search success message (und sempre)", this.successMessage)
    console.log("search fail message (und sempre)",this.errorMessage)
    console.log(this.archivio)


    //risetto book_found ad undefined ad ogni nuova ricerca
    this.Book_found = undefined;
    //per indicare se il contenuto dell'archivio risultante è un solo elemento
    this.One_result= false;
    //sempre prestato a meno che non entri nell'if dentro l else if per il caso di un solo libro
    this.Prestato= true;
  
    //input prende il contenuto preso dall input
    var input: HTMLInputElement = document.getElementById("input_ricerca") as HTMLInputElement;
    //newname prende il valore del campo di input
    var newinput = input.value;

    //nel caso l'input venga svuotato
    if (!newinput) {
      this.risultatoRicerca="In attesa di un input...";
    }

    //se l'input è pieno:
    else {

    
      //uso il metodo del servizio per ricavare l'archivio
      this.servizio.getArch().subscribe({
        next: archivio => {
          //salvo dentro archivio (var del componente dichiarata sopra come di tipo archive) l'archivio preso dal db
          this.archivio = archivio;
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
            //setto a true la variabile che mi indicherà che il match è precisamente uno
            this.One_result=true;
            //salvo dentro libro_match la stringa che sarà poi assegnata a risultatoRicerca
            let libro_match = risultato.map(item => {
              // Verifica se il nominativo è una stringa vuota
              let nominativoString = item.nominativo !== '' ? `Nominativo: ${item.nominativo}` : '';
              //se nominativoString è una stringa vuota la variabile Prestato viene impostata a false (di default è true)
              if (nominativoString === '') {
                this.Prestato = false;
              }
              //console.log(this.Prestato)
              return `Autore: ${item.autore}\nTitolo: ${item.titolo}\nPosizione: ${item.posizione}\n${nominativoString}`;
            });
            //uso la posizione 0 di libro_match perchè a stringa è salvata dentro una lista/array #TODO
            this.risultatoRicerca = libro_match[0];
          }

          //se più di un libro matcha la ricerca salvo dentro risultato ricerca la stringa che mostra il numero di match
          else if (risultato.length > 1) {
            this.risultatoRicerca= "Ci sono " + risultato.length + " corrispondenze all'interno dell'archivio";
          }
        },
        //nel caso il recupero dell'archivio dal db non andasse a buon fine
        error: error => {
          // mostro in console l' errore #CHIEDI SE VA BENE 
          console.error('Errore durante la richiesta:', error);
        }
      });
    }
  }

  //Funzione legata al tasto indietro: quando spinto riporta tutte le variabili booleane ai valori originali
  clean() {
    //non serve cambiare la condizione di prestato perchè la condizione dell ngif prevede sempre one_result=true, quindi basta impostarla a false per non mostrare i bottoni; inoltre ad ogni nuova ricerca Prestato diventa true.
    //one_result serve reimpostarlo a false perchè se si trova un libro non in prestito e si spinge chiudi per poi riaprire la ricerca, restano i bottoni.
    this.One_result = false;
    this.Book_found = undefined;
    this.mostraRicerca = false;
    this.risultatoRicerca = '';
    this.closeSearchEvent.emit();
  }

}