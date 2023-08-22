# Mediana-AP
Node.js potreben.
.env datoteko shraniti v mediana-app mapo. 
Podatki potrebni v .env datoteki, po potrebi jih pralogodite:

DB_HOST = "localhost"
DB_USERNAME = "root"
DB_PASSWORD = ''
DB_DATABASE = "baza"

npm install

nodemon server.js
ali
node server.js

http://localhost:5500/index.html


Naloga
    1. Opis

Pred teboj je naloga, pri kateri je potrebno izdelati spletno aplikacijo za izračun mediane. Spodaj so podrobna navodila, ki so ločena na dva dela in sicer frontend ter backend. 
 Repozitorij mora vključevati izvorno kodo:
    • frontend in
    • backend aplikacije.
        1.1. Navodila za izdelavo FRONTEND aplikacije:
    • naloga naj bo napisana v vanilla JS, CSS, HTML z izjemo knjižnice za izvajanje HTTP klicev (Axios, … )
    • Inicialno napolni seznam 5 naključnih števil med 1 in 1000. Seznam je vedno prikazan na web GUI-u. 
    • GUI ima gumb DODAJ NAKLJUČNO ŠTEVILO, ki v seznam doda naključno celo število med 1 in 1000.
    • GUI naj vsebuje input in gumb DODAJ ŠTEVILO, ki omogoča ročno dodati pozitivno celo število na seznam
    • GUI vsebuje gumb ODSTRANI ŠTEVILO, ki s seznama izbriše en naključen element. 
    • GUI vsebuje gumb ODSTRANI VSE, ki s seznama odstrani vse elemente
    • GUI naj vsebuje gumb IZRAČUNAJ MEDIANO, ki na backend pošlje POST metodo, na endpoint »api/mediana/calculate«.  (Request payload: seznam števil)
    • Na GUI-u naj bo izpisana tabela izračunanih median – podatki so pridobljeni z GET metodo na endpoint »api/mediana/get«
    • Poljubno oblikuj izgled web GUI 

        1.2. Navodila za izdelavo BACKEND aplikacije:
    • Za backend uporabi poljuben framework (Node.js, …) primeren za RESTful tehnologije. Dovoljena je uporaba poljubnih knjižnic. 
    • Postavi MySQL bazo, ki naj vsebuje eno tabelo z dvema atributoma »CREATED_AT« in »MEDIANA«.
    • Definiraj dva endpointa 
        ◦ »api/mediana/calculate«  (POST) in
        ◦ »api/mediana/get« (GET)
    • Endpoint »api/mediana/calculate« naj iz pridobljenega request payloada (seznam števil) izračuna mediano in rezultat shrani v MySQL bazo ter rezultat vrne na frontend. Tam se zapiše v tabelo izračunanih median.
    • Endpoint »api/mediana/get« naj iz baze pridobi podatke izračunanih median in jih vrne na frontend. Tam naj se izpišejo v tabelo izračunanih median, razvrščeni po času padajoče. 