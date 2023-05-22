import { NgZone, Component, Input, ChangeDetectorRef } from '@angular/core';
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
  @Input() InputRestituisciBook:boolean;
  @Input() InputPrestaBook:boolean;
  successMessage: string;
  errorMessage: string;


  constructor(private servizio: FromReqBinService, private ngZone: NgZone, private cdr: ChangeDetectorRef) { }
  ngOnInit() { }

  resetValues() {
    // Reimposta i valori desiderati del componente figlio
    this.InputRestituisciBook = false;
    this.InputPrestaBook = false;
 
    
    // Esegui la change detection per propagare le modifiche nel DOM
    this.cdr.detectChanges();
  }

  InputRestituisci(){
   
    console.log( "REST (dovrebbe prendere FF da ricerca, FT se clicchi e chiudi e riclicchi)",this.InputPrestaBook,this.InputRestituisciBook)
    this.InputRestituisciBook = !this.InputRestituisciBook;
    console.log( "REST (ff se non lo vedi, ft se lo vedi)",this.InputPrestaBook,this.InputRestituisciBook)

  }

  InputPresta(){
    console.log("PREST (dovrebbe prendere FF da ricerca)", this.InputPrestaBook,this.InputRestituisciBook)
    this.InputPrestaBook = !this.InputPrestaBook;
    console.log("PREST", this.InputPrestaBook,this.InputRestituisciBook)
  }

 
  cancella_libro (){

    //console.log(this.Book_found)
    //console.log(this.archivio)
    if ( this.archivio.contieneLibro(this.Book_found) ){
      this.archivio.cancellaLibro(this.Book_found)
    //console.log(this.archivio)
  
    // observable per caricare l'archivio sul server remoto
    this.servizio.postArch(this.archivio).subscribe({

      next: successMessage => {
        this.ngZone.run(() => {
      
          // Gestisci il successo della sovrascrittura
          this.successMessage = 'Rimozione dall\'archivio avvenuta con successo.'

          setTimeout(() => {
            this.successMessage = undefined;
            this.errorMessage = undefined;
       
          }, 1200);
        });
      },

      error: errorMessage => {
        this.ngZone.run(() => {
         
          this.errorMessage = 'Errore durante la sovrascrittura dei dati.';
        
          setTimeout(() => {
            this.successMessage = undefined;
            this.errorMessage = undefined;
          }, 1200);
        });
      }
    });
    }
    else{
      this.errorMessage = 'Questo libro è stato già rimosso, procedere ad una nuova ricerca.';
    }
  }

 
  Presta(){

  }

  Restituisci(){

  }
}