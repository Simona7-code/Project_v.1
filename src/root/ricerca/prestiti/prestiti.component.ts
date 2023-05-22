import { NgZone, Component, Output, EventEmitter, Input  } from '@angular/core';
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
  successMessage: string;
  errorMessage: string =undefined;
  cancellato:boolean = false;


  constructor(private servizio: FromReqBinService, private ngZone: NgZone) { }
  ngOnInit() {}

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
            this.cancellato = true;
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

      setTimeout(() => {
        this.errorMessage = undefined;
      }, 1200);
    }
    
  }
}