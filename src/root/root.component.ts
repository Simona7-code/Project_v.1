import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
//componenti figli
import { RicercaComponent } from './ricerca/ricerca.component';
import { InserisciComponent } from './inserisci/inserisci.component';
//servizi
import { FromReqBinService } from './call_server.service';
//classi
import { Book } from './book';
import { Archive } from './archive'

@Component({
  selector: 'app-root',
  templateUrl: './root.component.html',
  styleUrls: ['./root.component.css'],
  imports: [ CommonModule, RicercaComponent, InserisciComponent, FormsModule ],
  providers: [FromReqBinService],
  standalone: true
})

export class RootComponent implements OnInit {

  //istanza archivio
  archiveInstance: Archive = new Archive();
  //titolo generale del documento 
  title: string = 'Gestore di Biblioteca';

  //bool per regolare la comparsa/scomparsa form di input
  mostraInserimento: boolean= true;
  mostraRicerca: boolean= true;

  //valore del campo ricerca 
  valoreCampo: string;

  //prenderà valore di ricercaEseguita (ricerca.component.ts)
  eseguiRicerca() {

    this.mostraInserimento=false;
  
    console.log("Ricerca eseguita nel componente root.");
    // Altre azioni da eseguire quando viene eseguita la ricerca
  }

  
  eseguiInserimento() {
    this.mostraRicerca=false;
    console.log("Inserimento eseguito nel componente root.");
    
  }

  constructor(
    /*private archivioService: ArchiveServ,
    private dbService: FromReqBinService*/)
     { }

  ngOnInit() {
  }

}

