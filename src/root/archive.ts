import { Book } from './book';

export class Archive {
  archivio: Book[];

  constructor(libri: Book[]) {
    this.archivio = libri;
  }

  cerca(titolo: string) {
    //console.log('Nuovo valore inserito:', this.valoreCampo);
    if (!titolo) {
      return "In attesa di un titolo...";
    } else {
      let libriTrovati: string[] = [];

      for (let libro of this.archivio) {
        let titoloCorrente = libro.titolo;
        let autoreCorrente = libro.autore;
        let posizioneCorrente=libro.posizione;
        let nominativoCorrente=libro.nominativo;

        let bothCorrente = autoreCorrente.concat(" ", titoloCorrente);

        if (bothCorrente.toLowerCase().includes(titolo.toLowerCase())) {
          libriTrovati.push("Titolo: " + titoloCorrente +
          "Autore: " + autoreCorrente + 
          "Posizione: " + posizioneCorrente + 
          "Nominativo: " + nominativoCorrente);
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



  /*add(tit: string, aut: string) {
    const newDoc = new Book(tit, aut); // Crea un nuovo oggetto Libro
    this.archivio.push(newDoc); // Aggiunge l'oggetto Libro all'array archivio
  }*/

