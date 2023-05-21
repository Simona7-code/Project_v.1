import { Component, Output, EventEmitter, Input } from '@angular/core';
import { FromReqBinService } from '../../call_server.service';
import { CommonModule } from '@angular/common';
import { NgIf } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Archive } from '../../archive'
import { Book } from '../../book';

@Component({
  selector: 'app-prestiti',
  templateUrl: './prestiti.component.html',
  styleUrls: ['./prestiti.component.css'],
  imports: [ CommonModule, FormsModule, ReactiveFormsModule,NgIf ],
  standalone: true
})
export class PrestitiComponent{


  @Input() Prestato: boolean;
  @Input() One_result: boolean;
  @Input() Book_found:Book;
  @Input() archivio:Archive;
  @Input() successMessage: string;
  @Input() errorMessage: string;


 
  constructor(private servizio: FromReqBinService) { }
  ngOnInit() {}

  cancella_libro (){

  
    console.log("inizio cancella (undefined succ ereditato da padre)-->", this.successMessage)
    console.log("inizio cancella (undefined fail ereditato da padre)-->", this.errorMessage)

    console.log(this.Book_found)
    console.log(this.archivio)
    this.archivio.cancellaLibro(this.Book_found)
    console.log(this.archivio)
  
      // observable per caricare l'archivio sul server remoto
    this.servizio.postArch(this.archivio).subscribe({
      next: successMessage => {
        //nON è MAI UNDEFINED QUA
        console.log("pre success (undefined)-->",successMessage);
        // Gestisci il successo della sovrascrittura
        this.successMessage = 'Sovrascrittura avvenuta con successo';
        //this.errorMessage = null;
        console.log("post success (pieno)-->", successMessage);
      },
      error: errorMessage => {
        console.error("pre fallimento (undefined)-->", errorMessage);
        // Gestisci l'errore nella sovrascrittura
        //this.successMessage = null;
        this.errorMessage = 'Errore durante la sovrascrittura dei dati: ' + errorMessage;
        console.error("post fallim (pieno se fallito)-->",errorMessage);
      }     
    });

  }

}