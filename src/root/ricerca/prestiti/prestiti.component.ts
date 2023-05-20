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

  constructor(private servizio: FromReqBinService) { }
  ngOnInit() {}

  cancella_libro (){
    console.log(this.Book_found)
    console.log(this.archivio)
    this.archivio.cancellaLibro(this.Book_found)
    console.log(this.archivio)
  }

}