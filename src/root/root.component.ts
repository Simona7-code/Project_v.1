import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
//componenti figli
import { RicercaComponent } from './ricerca/ricerca.component';
import { PrestitiComponent} from './ricerca/prestiti/prestiti.component';
import { InserisciComponent } from './inserisci/inserisci.component';
//servizi
import { FromReqBinService } from './call_server.service';


@Component({
  selector: 'app-root',
  templateUrl: './root.component.html',
  styleUrls: ['./root.component.css'],
  imports: [ CommonModule, RicercaComponent,PrestitiComponent, InserisciComponent, FormsModule,ReactiveFormsModule ],
  providers: [FromReqBinService],
  standalone: true
})

export class RootComponent implements OnInit {

  //titolo generale del documento 
  title: string = 'Gestore di Biblioteca';

  //bool per regolare la comparsa/scomparsa dei contenuti dei singoli component:
  mostraRicerca: boolean = false;
  mostraInserimento: boolean= false;

  formRicerca() {
    this.mostraRicerca = true;
  }

  formInserimento() {
    this.mostraInserimento = true;
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

