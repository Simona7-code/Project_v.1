import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { ajax, AjaxError } from 'rxjs/ajax';
//classe
import { Archive } from './archive'

@Injectable({
  providedIn: 'root'
})

export class FromReqBinService {

  //definisco le variabili necessarie per fare richieste al server
  private apiKey: string = "bf109f8a";
  private apiUrl: string = "https://eu-central-1.aws.data.mongodb-api.com/app/kvaas-giwjg/endpoint/";

  constructor() {}
 

  //metodo per recuperare contenuto dal server: restituisce un observable di tipo oggetto archivio 
  public getArch(): Observable<Archive> {

    return ajax({
      method: 'GET',
      url: this.apiUrl + 'get?key=' + this.apiKey,
      crossDomain: true

    }).pipe(
    //nel caso la richiesta ajax abbia successo il metodo restituisce come response un oggetto Archivio ottenuto parsando la stringa JSON contenuta nel server
      map(response => new Archive(JSON.parse((response as any).response))),
      //nel caso la richiesta ajax fallisca restituisce errore
      catchError(error => {
        console.error('Errore durante recupero archivio dal database, si prega di riprovare:', error);
        return throwError(() => error);
      })
    );
  }


  //metodo per sovrascrivere contenuto nel server: prende in input un oggetto archivio e restituisce un observable di tipo sting
  public postArch(arch: Archive): Observable<string> {

    //trasformo l'oggetto archivio in una stringa JSON
    const formattedArch = JSON.stringify(arch.archivio);
    
    return ajax({
      method: 'POST',
      url: this.apiUrl + 'set?key=' + this.apiKey,
      crossDomain: true,
      body: formattedArch,
      headers: {
        'Content-Type': 'application/json'
      }

    }).pipe(
      //nel caso la richiesta ajax abbia successo il metodo restituisce una stringa
      map(() => 'Sovrascrittura dell\'archivio nel database avvenuta con successo'),
      catchError((error: AjaxError) => {
        //nel caso la richiesta ajax fallisca restituisce errore
        return throwError(() => new Error('Errore durante il caricamento dell\' archivio nel database, si prega di riprovare. Dettagli: ' + error.message));
      })
    );
  }

}
