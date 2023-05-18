import { Book } from './book';

export class Archive {
  archivio: Book[];

  constructor(libri: Book[]) {
    this.archivio = libri;
  }

  cerca(titolo: string) {

    let libriTrovati: Book[] = [];

    for (let libro of this.archivio) {
      let titoloCorrente = libro.titolo;
      let autoreCorrente = libro.autore;
      let bothCorrente = autoreCorrente.concat(" ", titoloCorrente);

      if (bothCorrente.toLowerCase().includes(titolo.toLowerCase())) {
        libriTrovati.push(libro);}
    }
    return libriTrovati;
  }
}
  /*add(tit: string, aut: string) {
    const newDoc = new Book(tit, aut); // Crea un nuovo oggetto Libro
    this.archivio.push(newDoc); // Aggiunge l'oggetto Libro all'array archivio
  }*/

