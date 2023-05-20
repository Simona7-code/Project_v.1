export class Book {
  
  autore: string; 
  titolo:string;
  posizione: string;
  nominativo: string;

  constructor(  aut: string, tit:string, loc: string, client: string) {
    this.autore=aut;
    this.titolo=tit;
    this.posizione=loc;
    this.nominativo= client;
  }
  
  aggiungiNominativo(nome: string) {
    this.nominativo = nome;
  }

  rimuoviNominativo() {
    this.nominativo = "";
  }
}
