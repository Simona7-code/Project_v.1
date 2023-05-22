import { Component, Input, ChangeDetectorRef } from '@angular/core';
import { FromReqBinService } from '../../call_server.service';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Archive } from '../../archive'
import { Book } from '../../book';

@Component({
  selector: 'app-prestiti',
  templateUrl: './prestiti.component.html',
  styleUrls: ['./prestiti.component.css'],
  imports: [ CommonModule, FormsModule, ReactiveFormsModule ],
  standalone: true
})
export class PrestitiComponent{

  @Input() Prestato: boolean;
  @Input() One_result: boolean;
  @Input() Book_found:Book;
  @Input() archivio:Archive;
  @Input() InputPrestaBook:boolean;
  @Input() InputRestituisciBook:boolean;
  successMessage: string;
  errorMessage: string;
  clientInputValue: string;


  constructor(private servizio: FromReqBinService,private cdr: ChangeDetectorRef) { }
  ngOnInit() { }


  InputPresta(){
    this.InputPrestaBook = !this.InputPrestaBook;
  }

  resetValues() {
    // Reimposta i valori desiderati del componente figlio
    this.InputPrestaBook = false;
    this.InputRestituisciBook=true;
    //questi determinano gli output della cancellazione libro
    this.successMessage = undefined;
    this.errorMessage = undefined;
    // Esegui la change detection per propagare le modifiche nel DOM ad ogni nuovo input di ricerca
    this.cdr.detectChanges();
  }


  cancella_libro (){

    //console.log(this.Book_found)
    //console.log(this.archivio)
    if ( this.archivio.contieneLibro(this.Book_found) ){
      this.archivio.cancellaLibro(this.Book_found)
      //console.log(this.archivio)
  
      // observable per caricare l'archivio sul server remoto
      this.servizio.postArch(this.archivio).subscribe({
        next: () => {
          // Gestisci il successo della sovrascrittura
          this.successMessage = 'Rimozione dall\'archivio avvenuta con successo.';
          this.InputPrestaBook=false;
        },
        error: () => {
          this.errorMessage = 'Errore durante la rimozione del libro. Riprovare.';
          this.InputPrestaBook=false;
        }
      });
    
    }
    else{
      this.errorMessage = 'Questo libro è stato già rimosso, procedere ad una nuova ricerca.';
      this.InputPrestaBook=false;
    }
  }

  Restituisci(){

    this.archivio.rimuoviNominativoALibro(this.Book_found)
 
    // observable per caricare l'archivio sul server remoto
    this.servizio.postArch(this.archivio).subscribe({
      next: () => {
        // Gestisci il successo della sovrascrittura
        this.successMessage = 'Restituzione inserita con successo.';
        this.InputRestituisciBook= false;
      },
      error: () => {
        this.errorMessage = 'Errore durante la restituzione del libro. Riprovare.';
      }
    });
  }

  Presta(){

    this.archivio.inserisciNominativoALibro(this.Book_found, this.clientInputValue )
    // observable per caricare l'archivio sul server remoto
    this.servizio.postArch(this.archivio).subscribe({
      next: () => {
        // Gestisci il successo della sovrascrittura
        this.successMessage = 'Prenotazione inserita con successo.';
        this.InputPrestaBook=false;
      },
      error: () => {
        this.errorMessage = 'Errore durante la prenotazione del libro. Riprovare.';
      }
    });
  }
}