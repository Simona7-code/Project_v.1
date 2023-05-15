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

  /*Book_Obj(): any {
    return {
      titolo: this.titolo,
      posizione: this.posizione,
      autore: this.autore,
      nominativo: this.nominativo
    };
  }*/
}
