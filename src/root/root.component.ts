import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
//componenti figli e discendenti
import { RicercaComponent } from './ricerca/ricerca.component';
import { PrestitiComponent } from './ricerca/prestiti/prestiti.component';
import { InserisciComponent } from './inserisci/inserisci.component';
//servizio
import { FromReqBinService } from './call_server.service';
   

@Component({ 
  selector: 'app-root',
  templateUrl: './root.component.html',
  styleUrls: ['./root.component.css'],
  imports: [CommonModule, RicercaComponent, PrestitiComponent, InserisciComponent, FormsModule],
  providers: [FromReqBinService],
  standalone: true
})
        
export class RootComponent implements OnInit {

  //titolo del sito 
  title: string = 'Gestore di Biblioteca';
  //bool per regolare la comparsa/scomparsa dei contenuti dei due component figli:  
  mostraRicerca: boolean = false;
  mostraInserimento: boolean= false;

  constructor(){}
  ngOnInit() {}


  //metodo invocato dal pulsante per ricerca, imposta la variabile a true mostrando il contentuto per la ricerca
  formRicerca() {
    this.mostraRicerca = true;
  }


  //metodo invocato dal pulsante per inserimento, imposta la variabile a true mostrando il contentuto per l'inserimento 
  formInserimento() {
    this.mostraInserimento = true;
  }


  //metodo invocato dal pulsante per ricerca, imposta la variabile a false nascondendo il contentuto per la ricerca
  closeSearch() {
    this.mostraRicerca = false;
  }

  //metodo invocato dal pulsante per inserimento, imposta la variabile a false nascondendo il contentuto per l'inserimento
  closeInserisci() {
    this.mostraInserimento = false;
  }
}

