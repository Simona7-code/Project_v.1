import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
//componenti figli
import { RicercaComponent } from './ricerca/ricerca.component';
import { InserisciComponent } from './inserisci/inserisci.component';
//servizi
import { FromReqBinService } from './call_server.service';
import { ArchiveServ } from './archive.service';
//classi
import { Book } from './book';


@Component({
  selector: 'app-root',
  templateUrl: './root.component.html',
  styleUrls: ['./root.component.css'],
  imports: [ CommonModule, RicercaComponent, InserisciComponent ],
  providers: [FromReqBinService, /*ArchiveServ*/],
  standalone: true
})

export class RootComponent implements OnInit {

  title: string = 'Gestore di Biblioteca';

  mostraCampo : boolean = false;

  //prenderà valore di ricercaEseguita (ricerca.component.ts)
  eseguiRicerca() {

    this.mostraCampo = true;
    //console.log("Ricerca eseguita nel componente root.");
    // Altre azioni da eseguire quando viene eseguita la ricerca
  }

  
  eseguiInserimento() {
    console.log("Inserimento eseguito nel componente root.");
    
  }

  constructor(
    /*private archivioService: ArchiveServ,
    private dbService: FromReqBinService*/)
     { }

  ngOnInit() {
  }

}

