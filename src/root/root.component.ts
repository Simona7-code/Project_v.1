import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
//componenti figli
import { RicercaComponent } from './ricerca/ricerca.component';
import { InserisciComponent } from './inserisci/inserisci.component';
//servizi
import { FromReqBinService } from './call_server.service';


@Component({
  selector: 'app-root',
  templateUrl: './root.component.html',
  styleUrls: ['./root.component.css'],
  imports: [ CommonModule, RicercaComponent, InserisciComponent, FormsModule,ReactiveFormsModule ],
  providers: [FromReqBinService],
  standalone: true
})

export class RootComponent implements OnInit {

  //titolo generale del documento 
  title: string = 'Gestore di Biblioteca';

  //bool per regolare la comparsa/scomparsa form di input
  mostraRicerca: boolean = false;

  mostraInserimento: boolean= false;

  //prenderà valore di ricercaEseguita (ricerca.component.ts)
  formRicerca() {
    this.mostraRicerca=true;
    // Altre azioni da eseguire quando viene eseguita la ricerca
  }

  formInserimento() {
    this.mostraInserimento=true;
  }

  closeSearch() {
    this.mostraRicerca = false;
  }

  closeInserisci() {
    this.mostraInserimento = false;
  }

  constructor(){}
  ngOnInit() {}

}

