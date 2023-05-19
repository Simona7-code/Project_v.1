import { Component, Output, EventEmitter, Input } from '@angular/core';
import { FromReqBinService } from '../../call_server.service';
import { CommonModule } from '@angular/common';
import { NgIf } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Archive } from '../../archive'

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
  constructor(private servizio: FromReqBinService) { }
  ngOnInit() {}

  archivio: Archive; // Dichiarazione della variabile archivio
  //console.log(Prestato)

}