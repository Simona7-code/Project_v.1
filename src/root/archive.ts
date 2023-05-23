import { Book } from './book';

export class Archive {

  //definisco l'oggetto archivio come una lista di oggetti libro
  archivio: Book[];
  constructor(libri: Book[]) {
    this.archivio = libri;
  }


  //metodo prende in input una stringa e cerca se è contenuta tra i titoli o gli autori
  cerca(titolo: string) {

    //definisco libriTrovati come una lista di oggetti libro
    let libriTrovati: Book[] = [];

    //per ogni libro dell'archivio crea una stringa concatenando autore e titolo
    for (let libro of this.archivio) {
      let titoloCorrente = libro.titolo;
      let autoreCorrente = libro.autore;
      let bothCorrente = autoreCorrente.concat(" ", titoloCorrente);
      //se la stringa concatenata in versione lowercase include la stringa da ricercare
      if (bothCorrente.toLowerCase().includes(titolo.toLowerCase())) {
        //inserisco il libro corrispondente nella lista libriTrovati
        libriTrovati.push(libro);}
    }
    //restituisco la lista contenente i libri che matchano la ricerca
    return libriTrovati;
  }
  

  //metodo che effettua un controllo case insensitive e restituisce vero se il libro è contenuto in archivio, falso altrimenti (controlla solo titolo ed autore)
  contieneLibro(book: Book): boolean {

    return this.archivio.some(item => 
      item.titolo.toLowerCase() === book.titolo.toLowerCase() 
    && item.autore.toLowerCase() === book.autore.toLowerCase()  
    );
  }


  //metodo che dato un libro effettua un controllo sull'archivio: restituisce true se già esiste un libro in quella posizione dell'archivio, false se la posizione è libera
  stessaPosizione(book: Book) {
    const existingBook = this.archivio.find(l => l.posizione === book.posizione);
    if (existingBook) {
      // Un libro con la stessa posizione esiste già nell'archivio
      return true;
    }
    else{
      return false;
    }
  }


  //metodo per aggiungere libro all'archivio
  aggiungiLibro(book: Book) {
    this.archivio.push(book)
  }
  

  //metodo per cancellare libro dall'archivio
  cancellaLibro(book: Book){
    //metodo findIndex() sull'array archivio si esegue per ogni suo elemento: Restituisce l'indice dell'elemento che soddisfa la condizione, oppure -1 se nessun elemento corrisponde alla condizione.
    const index = this.archivio.findIndex(item => 
      item.titolo === book.titolo && 
      item.autore === book.autore &&
      item.posizione === book.posizione && 
      item.nominativo === book.nominativo
    );
    //se l'indice restituito da findIndex() è diverso da -1 (trovato elemento corrispondente nell'archivio)
    if (index !== -1) {
      //rimuovo un elemento dall'array archivio tramite l'indice dell'elemento da rimuovere e il numero di elementi da rimuovere
      this.archivio.splice(index, 1);
    }
  }


  //metodo per rimuovere un nominativo da un libro in archivio
  rimuoviNominativoALibro(book: Book) {
    book.nominativo = "";
  }


  //metodo per inserire un nominativo da un libro in archivio
  inserisciNominativoALibro(book: Book, nome: string ){
    book.nominativo = nome;
  }
}


