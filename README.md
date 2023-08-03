[Edit on StackBlitz ⚡️](https://stackblitz.com/edit/angular-tk7hbp)

Link to Firebase deploy: https://ssw-544298.firebaseapp.com/?613718        

**IMPORTANT:   
The complete project subject to evaluation is located in the main branch.   
The other branches show some of the checkpoints reached during the project development.**   

This application serves as a library manager for facility's employees use-only.
The application allows users to perform searches in the archive, add and remove books, and borrow and return books.

A book is represented as an object with 4 elements: title, author, location, and borrower's name. The archive is implemented as a list of book objects.

The application is divided into two main sections:

1. In the search section, users can search for books in the archive. The search is conducted based on book titles and author names. For each new input entered in the search field, a new search is performed. A search can yield three possible results:
   - No results found.   
   - If multiple results are found, the number of books found is displayed.   
   - If only one result is found, the book details are displayed. In this case:
        
     - If a borrower's name is associated with the book, a "Return Book" button is shown, which removes the borrower's name and makes the book available for new loans. A success or failure message is displayed accordingly.   
      - If no borrower's name is associated with the book, users have the following options:
        
        - Delete the book from the archive: If successful, a positive outcome message is displayed; otherwise, a negative one.
          
        - Borrow the book: If users decide to borrow the book, an input field is shown to enter the borrower's name. A success or failure message is displayed accordingly.   

2. In the insertion section, there are three input fields for the book title, author, and location. The submit button remains disabled until all input fields are filled. When the submit button is pressed, an internal check is performed:
   
   - First, the inputs are cleaned, retaining only alphanumeric characters, periods, and apostrophes. Leading and trailing spaces and any sequence of multiple space characters are also removed.   
   - Then, a check is made to see if the book to be inserted already exists in the archive. This check is case-insensitive and is based on the title and author:
       
     - If this check fails, an error message is displayed, and the insertion does not occur.   
      - If this check is successful, an additional check is made on the location:
        
         - If the input location is already occupied, the insertion does not occur, and an error message is displayed.
           
         - If both checks pass, the book is added to the archive, and the archive is loaded onto the server. If the loading is successful, a message indicating the correct insertion is shown; otherwise, an error message is displayed.

In both sections, a back button is available to return to the home, where the two buttons to access the two sections are displayed.

Additionally, tests have been implemented to verify the proper functioning of the archive's features. The tests are implemented through console.log and can be viewed in the console.    

############################################################################################################ 

**IMPORTANTE:     
Il progetto soggetto a valutazione e completo si trova nel ramo main.     
Gli altri rami mostrano alcuni dei checkpoint raggiunti durante lo sviluppo del progetto.**    

Questa applicazione si propone come un gestore di biblioteche ad uso degli impiegati della struttura.

Questa applicazione permette di effettuare ricerche nell'archivio, inserire e rimuovere libri, dare in prestito e restituire libri. 

Un libro è un oggetto implementato come un oggetto di 4 elementi: titolo, autore, posizione e nominativo. L'archivio invece è implementato come una lista di oggetti libro.        

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

Sono inoltre stati implementati dei TEST che verificano il corretto funzionamento delle funzionalità dell'archivio. I test sono implementati tramite console.log e sono visionabili nella console.
