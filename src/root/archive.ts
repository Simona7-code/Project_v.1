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
  
  //effettua un controllo case insensitive e restituisce vero se è contenuto, falso altrimenti
  contieneLibro(book: Book): boolean {

    return this.archivio.some(item => 
      item.titolo.toLowerCase() === book.titolo.toLowerCase() 
    && item.autore.toLowerCase() === book.autore.toLowerCase() 
    && item.posizione.toLowerCase() === book.posizione.toLowerCase() 
    );
  }

  //aggiungi libro all'archivio
  aggiungiLibro(book: Book) {
    this.archivio.push(book)
  }
  
  //cancellare libro da archivio
  cancellaLibro(book: Book){
    //metodo findIndex() sull'array archivio. Prende una funzione di callback come argomento e si esegue per ogni elemento di archivio: Restituisce l'indice dell'elemento che soddisfa la condizione, oppure -1 se nessun elemento corrisponde alla condizione.
    const index = this.archivio.findIndex(item => 
      item.titolo === book.titolo && 
      item.autore === book.autore &&
      item.posizione === book.posizione && 
      item.nominativo === book.nominativo
    );
    //se l'indice restituito da findIndex() è diverso da -1. Se l'indice è diverso da -1, è stato trovato un elemento corrispondente nell'array archivio e può essere rimosso.
    if (index !== -1) {
      //rimuovere un elemento dall'array archivio.Prende come argomenti l'indice dell'elemento da rimuovere (index) e il numero di elementi da rimuovere (in questo caso, 1).
      this.archivio.splice(index, 1);
    }
  }
}


