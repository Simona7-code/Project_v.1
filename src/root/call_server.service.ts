import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { ajax, AjaxResponse } from 'rxjs/ajax';

import { Archive } from './archive'

@Injectable({
  providedIn: 'root'
})

export class FromReqBinService {

  private apiKey: string = "bf109f8a";
  private apiUrl: string = "https://eu-central-1.aws.data.mongodb-api.com/app/kvaas-giwjg/endpoint/";

  constructor() {}

  public getArch(): Observable<any> {

    return ajax({
      method: 'GET',
      url: this.apiUrl + 'get?key=' + this.apiKey,
      crossDomain: true
    }).pipe(
    //HERE-------------------------------------------
      map(response => new Archive(JSON.parse((response as any).response))),
      catchError(error => {
        // Gestione dell'errore
        console.error('Errore durante la richiesta:', error);
        return throwError(() => error);
      })
    );
  }

//INPUT ARCH-------------------------------------------------------
  public postArch(arch: Archive): Observable<AjaxResponse<any>> {

    const formattedArch = JSON.stringify(arch);
    return ajax({
      method: 'POST',
      url: this.apiUrl + 'post?key=' + this.apiKey,
      crossDomain: true,
      body: formattedArch,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }
}
