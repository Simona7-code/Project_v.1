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
  
  //effettua un controllo case insensitive
  contieneLibro(book: Book): boolean {
    return this.archivio.some(item => 
      item.titolo.toLowerCase() === book.titolo.toLowerCase() 
    && item.autore.toLowerCase() === book.autore.toLowerCase() 
    && item.posizione.toLowerCase() === book.posizione.toLowerCase() 
    );
  }
}
  /*add(tit: string, aut: string) {
    const newDoc = new Book(tit, aut); // Crea un nuovo oggetto Libro
    this.archivio.push(newDoc); // Aggiunge l'oggetto Libro all'array archivio
  }*/

