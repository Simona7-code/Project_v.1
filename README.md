# https-github.com-Simona7-code-Project

[Edit on StackBlitz ⚡️](https://stackblitz.com/edit/angular-tk7hbp)

Link del deploy su Firebase: https://ssw-544298.firebaseapp.com/?613718

########################################################################################################

-----------------------------     IMPORTANTE    --------------------------------------------------------
Il progetto soggetto a valutazione e completo si trova nel ramo main. 
Gli altri rami mostrano alcuni dei checkpoint raggiunti durante lo sviluppo del progetto.

########################################################################################################

Questa applicazione si propone come un gestore di biblioteche ad uso degli impiegati della struttura.

Questa applicazione permette di effettuare ricerche nell'archivio, inserire e rimuovere libri, dare in prestito e restituire libri. 

Un libro è un oggetto implementato come un dizionario di 4 elementi: titolo, autore, posizione e nominativo. L'archivio invece è implementato come una lista di oggetti libro.

########################################################################################################

L'applicazione si divide in due macrosezioni:

Nella sezione ricerca è possibile cercare libri nell'archivio e la ricerca viene effettuata sui titoli dei libri e nome degli autori.
Per ogni nuovo input inserito all'interno del campo, viene effettuata una nuova ricerca. Una ricerca può portare a 3 possibili risultati: 
- Nessun risultato;
- Se ci sono più risultati viene mostrato il numero di libri trovati;
- Se c'è un solo risultato viene mostrata la scheda del libro. In questo caso:

    - Se esiste un nominativo per il libro, viene mostrato il bottone "Restituisci libro", che rimuove il contenuto dal nominativo e lo rende disponibile a nuovi prestiti. Nel caso di successo viene mostrato un esito positivo, altrimenti negativo.
    - Se non esiste un nominativo per il libro è possibile:

      - Cancellare il libro dall'archivio: nel caso di successo viene mostrato un messaggio di esito positivo, altrimenti negativo.
      - Prendere in prestito il libro; nel caso si decida di prenderlo in prestito viene mostrato un campo di input in cui inserire il nominativo del cliente che lo prende in prestito. Nel caso di successo viene mostrato un messaggio di esito positivo, altrimenti negativo.


Nella sezione di inserimento ci sono 3 campi di input, uno per il titolo, uno per l'autore e uno per la posizione. Il tasto di invio resta disabilitato finchè tutti i campi di input non sono riempiti. Quando viene spinto il tasto di invio avviene un controllo a livello interno:
Per prima cosa vengono puliti gli input lasciando solo caratteri alfanumerici, punti, apici; vengono inoltre rimossi gli spazi a inzio e fine stinga e qualsiasi sequenza composta da più caratteri di spazio. 
A quel punto viene controllato se il libro che si vuole inseire è già presente nell'archivio; questo controllo viene fatto solo sul titolo e l'autore ed è un controllo case insensitive:
- Nel caso questo controllo non venga superato viene mostrato un messaggio di errore e l'inserimento non avviene; 
- Nel caso in cui viene superato, segue un ulteriore controllo sulla posizione:  

  - Nel caso in cui la posizione in input sia già occupata, l'inserimento non avviene e viene mostrato un messaggio di errore. 
  - Nel caso questi controlli vengano superati il libro viene aggiunto all'archivio e l'archivio viene caricato sul server. 
  Nel caso il caricamento vada a buon fine viene mostrato un messaggio di corretto inserimento, altrimenti un messaggio di errore.


In entrambe le sezioni è disponibile un tasto indietro per ritornare alla home, quindi alla visualizzazione dei due bottoni per accedere alle due sezioni.

########################################################################################################

Sono inoltre stati implementati dei TEST che verificano il corretto funzionamento delle funzionalità dell'archivio. I test sono implementati tramite console.log e sono visionabili nella console.
