import { Injectable } from '@angular/core';
import { Libro } from './libro'; // Importa la classe Libro dal file libro.ts


@Injectable({
  providedIn: 'root'
})

export class ArchiveServ {
  
  private archivio: Libro[] = []; // Inizializza l'array archivio come un array di oggetti Libro

  constructor() {}

  add(tit: string, aut: string) {
    const newDoc = new Libro(tit, aut); // Crea un nuovo oggetto Libro
    this.archivio.push(newDoc); // Aggiunge l'oggetto Libro all'array archivio
  }

  cerca(titolo: string) {
    if (!titolo) {
      return "In attesa di un titolo...";
    } else {
      let libriTrovati: string[] = [];

      for (let libro of this.archivio) {
        let titoloCorrente = libro.titolo;
        let autoreCorrente = libro.autore;
        let bothCorrente = autoreCorrente.concat(" ", titoloCorrente);

        if (bothCorrente.toLowerCase().includes(titolo.toLowerCase())) {
          libriTrovati.push(libro.titolo + ", Scritto da " + libro.autore);
        }
      }

      if (libriTrovati.length === 0) {
        return "Non ci sono libri corrispondenti alla ricerca";
      } else if (libriTrovati.length === 1) {
        return libriTrovati;
      } else if (libriTrovati.length > 1) {
        return "Ci sono " + libriTrovati.length + " corrispondenze all'interno dell'archivio";
      }
    }
  }
}
