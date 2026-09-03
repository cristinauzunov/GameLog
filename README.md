
GameLog e un'applicazione web full-stack che ho sviluppato come progetto capstone del mio bootcamp. E una libreria personale di videogiochi con funzionalita social: permette di tenere traccia dei giochi che si possiedono, organizzarli per stato, scrivere recensioni, seguire altri utenti e scoprire cosa stanno giocando.

Descrizione:

L'idea nasce dal voler avere un unico posto dove gestire il proprio backlog di videogiochi e condividere la propria esperienza con altri giocatori. Ogni utente puo costruire la propria collezione, valutare i giochi, scrivere recensioni e interagire con gli altri tramite un sistema di follow e un feed delle attivita.
I dati dei giochi, come copertine, descrizioni, generi, piattaforme, voti, screenshot e trailer, arrivano in tempo reale dall'API pubblica di RAWG.

Funzionalita:

Per quanto riguarda la gestione dell'account, ho implementato la registrazione e il login con autenticazione tramite JWT, le password vengono cifrate con BCrypt, e ogni utente ha un profilo personale che puo modificare (nome, email, avatar da URL o caricato dal computer, e cambio password con verifica di quella attuale).
La libreria personale permette di aggiungere giochi alla propria collezione cercandoli tramite RAWG, di organizzarli per stato (da giocare, in corso, finito, abbandonato), e di assegnare voto, ore giocate e note personali. La collezione si puo filtrare per stato, cercare al suo interno, ordinare ed esportare in formato CSV.
Per la scoperta dei giochi c'e una home con giochi in evidenza, trending e categorie, una ricerca in tempo reale, e una pagina di dettaglio completa con descrizione, voto Metacritic, generi, piattaforme, sviluppatore, screenshot, trailer e giochi simili.
Nella sezione statistiche si vedono il numero totale di giochi, le ore giocate, il voto medio e un grafico interattivo dei giochi divisi per stato.
La parte social e quella a cui ho dedicato piu tempo: c'e un sistema di recensioni con voto, modificabili ed eliminabili, con la possibilita di rispondere alle recensioni degli altri. C'e un sistema di follow per seguire altri utenti, un feed che mostra le loro attivita (nuovi giochi aggiunti, cambi di stato, recensioni scritte), le notifiche quando qualcuno inizia a seguirti, e i profili pubblici degli utenti con la loro collezione, le statistiche e le recensioni.
Per l'interfaccia ho scelto un tema scuro con effetto vetro, un design responsive che funziona sia su desktop che su mobile, e una sidebar compatta che si espande al passaggio del mouse.

Tecnologie utilizzate:

Per il backend ho usato Java con Spring Boot, Spring Security insieme a JWT per l'autenticazione e l'autorizzazione, Spring Data JPA con Hibernate per la gestione dei dati, PostgreSQL come database e Maven per le dipendenze.
Per il frontend ho usato React con Vite, React Router per la navigazione, React Bootstrap e Bootstrap per i componenti, Axios per le chiamate al backend, e del CSS personalizzato per il tema e le animazioni.
Come API esterna ho utilizzato RAWG Video Games Database per tutti i dati dei giochi.

Installazione e avvio:

Per far girare il progetto servono Java 17 o superiore con Maven, Node.js con npm, PostgreSQL installato e in esecuzione, e una API key di RAWG (gratuita, si ottiene dal loro sito).
Come prima cosa bisogna creare un database PostgreSQL chiamato GameLog.

Poi, nella cartella principale del progetto, va creato un file env.properties con le proprie configurazioni:

DB_URL=jdbc:postgresql://localhost:5432/GameLog
DB_USERNAME=postgres
DB_PASSWORD=la_tua_password
JWT_SECRET=una_stringa_segreta_a_piacere
RAWG_KEY=la_tua_api_key_rawg

A questo punto si avvia il backend con il comando mvn spring-boot:run, e partira su localhost porta 8080.
Per il frontend bisogna spostarsi nella cartella frontend, installare le dipendenze con npm install e avviarlo con npm run dev. Partira su localhost porta 5173.
Infine si apre il browser su localhost:5173, ci si registra e si puo iniziare a usare l'applicazione.

Note:

Il file env.properties contiene dati sensibili e non e incluso nel repository, perche e presente nel gitignore. I dati dei giochi arrivano da RAWG, quindi alcuni giochi potrebbero non avere tutte le informazioni disponibili, come trailer o screenshot.

Sviluppi futuri:

Alcune idee per far evolvere il progetto in futuro sono un sistema di messaggistica tra utenti, il login tramite provider social come Google o Discord, i mi piace alle recensioni, una sezione dove vedere in quali negozi acquistare i giochi.

Crediti

I dati dei videogiochi sono forniti da RAWG (rawg.io).