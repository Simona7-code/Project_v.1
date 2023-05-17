export class Book {
  
  titolo:string;
  posizione: string;
  autore: string; 
  nominativo: string;

  constructor( tit:string, loc: string, aut: string, client: string) {
    this.titolo=tit;
    this.posizione=loc;
    this.autore=aut;
    this.nominativo= client;
  }
}
