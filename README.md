# AI Kysynnänennusteavustaja

AI-pohjainen työkalu kysynnän ennustamiseen ja varastonhallinnan optimointiin.

## Kuvaus
AI Kysynnänennusteavustaja on moderni web-sovellus, joka auttaa yrityksiä ennustamaan tuotteiden kysyntää erityisesti tilanteissa, joissa tilastollista dataa on vähän. Sovellus hyödyntää edistynyttä tekoälyä ja koneoppimista tarjotakseen tarkkoja ennusteita ja parantaakseen varastonhallintaa.

## Ominaisuudet

- 📊 Kysynnän analysointi ja visualisointi
- 📝 Päätösongelmien dokumentointi ja oppiminen
- 🔍 Automaattinen markkinasignaalien seuranta
- 💾 Ennustekorjausten tallennus ja hallinta
- 🔄 Integroitavissa olemassa oleviin järjestelmiin (tbd)
- 🔐 Turvallinen käyttäjienhallinta
- 📈 Automaattinen kuvaajan päivitys korjausten tallennuksen jälkeen
- 🌐 Täysin suomenkielinen käyttöliittymä

## Teknologiat
- React + TypeScript
- Vite
- Tailwind CSS
- Shadcn/ui
- Gemini API
- Vercel (deployment)
- Firebase (backend services)

### Gemini API 
Kysyntä ennusteen tulkitsemisessa käytetään Gemini 2.5 Pro -mallia, joka tukee sekä kuvien analysointia että nettihakua kysynnän ennustamiseen.

## Toiminnalliset speksit

### 1. Chat-ikkuna
- Tukee markdown-muotoilua viesteissä
- Hyperlinkit avautuvat uuteen välilehteen
- Listat näkyvät oikein muotoiltuina
- Teksti on paremmin muotoiltu yleisesti
- Viestit näkyvät eri väreillä käyttäjän ja bottiviestien välillä
- Viestit skrollautuvat automaattisesti alimpaan viestiin
- Latausindikaattori näkyy, kun botti vastaa

### 1.1 Chat-session hallinta

Chat-session hallinta on täysin erillinen toiminnallisuus, joka ei ole sidottu kuvien hallintaan. Tämä mahdollistaa joustavamman käytön ja selkeämmän käyttökokemuksen.

#### Chat-session painikkeet

- **Aloita chat**
  - **Aktiivinen tila (musta fontti):** Painike on käytettävissä, kun olet valinnut tuotteen, tuoteryhmän tai tuoteluokan, eikä chat-istunto ole vielä käynnissä.
  - **Passiivinen tila (harmaa fontti):** Painike on pois käytöstä, jos chat on jo käynnissä tai dataa ladataan.
  - **Toiminta:** Käynnistää uuden chat-istunnon ja alustaa keskustelun Gemini 2.5 Pro -mallilla.

- **Puhdista chat**
  - **Aktiivinen tila (musta fontti):** Painike on käytettävissä, kun chat-istunto on käynnissä.
  - **Passiivinen tila (harmaa fontti):** Painike on pois käytöstä, jos chat-istuntoa ei ole käynnissä tai dataa ladataan.
  - **Toiminta:** Tyhjentää chatin viestit ja nollaa chatin tilan.

### 2. Kuvien hallinta

Kuvien hallinta on nyt täysin erillinen toiminnallisuus, joka toimii itsenäisesti chat-session tilasta riippumatta. Tämä mahdollistaa kuvien lataamisen ja käsittelyn missä tahansa sovelluksen tilassa.

#### Kuvien hallinnan ominaisuudet
- Tuetut tiedostotyypit: PNG, JPG, JPEG
- Kuvat muunnetaan base64-muotoon lähetettäessä
- Kuvat näkyvät viestiketjussa
- Kuvien käsittely tapahtuu asynkronisesti
- Kuvien hallinta on saatavilla riippumatta chat-session tilasta
- Kuvat voidaan ladata ja käsitellä ennen chat-session aloittamista
- Kuvien hallinta säilyttää oman tilansa erillään chat-session tilasta

#### Kuvien hallinnan painikkeet
- **Lataa kuva**: Mahdollistaa kuvien lataamisen missä tahansa sovelluksen tilassa
- **Poista kuva**: Mahdollistaa kuvien poistamisen riippumatta chat-session tilasta
- **Näytä kuva**: Mahdollistaa ladattujen kuvien tarkastelun

### 3. Nettihaku
- Tukee Google-hakuja tuotteista
- Haku tulokset näkyvät markdown-muodossa
- Linkit ovat klikattavia ja avautuvat uuteen välilehteen
- Haku tulokset sisältävät:
  - Viralliset tuotesivut
  - Jälleenmyyjien sivut
  - Tekniset tiedot
  - Uutiset ja markkinatiedot

### 4. Sessiohallinta
- Sessio alkaa tuotteen ja kuvan valinnalla
- Sessio pysyy aktiivisena, kunnes käyttäjä vaihtaa tuotetta
- Edellisen session tiedot tyhjennetään automaattisesti
- Sessio tietoja ei tallenneta pysyvästi

### 5. Virheenkäsittely
- Virheilmoitukset näkyvät käyttäjälle selkeästi
- API-virheet käsitellään asianmukaisesti
- Kuvan käsittelyvirheet ilmoitetaan käyttäjälle
- Nettihakuvirheet käsitellään ja ilmoitetaan

### 6. Testaus
- Yksikkötestit komponenteille
- API-integraatiotestit
- Tyypintarkistus TypeScriptillä
- Testitiedostot löytyvät `tests/`-hakemistosta

### 7. Ennustekorjausten tallennus
- Tallenna ennustekorjaukset JSON-muodossa
- Validointi korjausdatan oikeellisuudelle
- Automaattinen tuoteryhmän liittäminen korjauksiin
- Selkeät virheilmoitukset virheellisestä datasta
- Korjausten tallennus paikalliseen tiedostoon
- Tuki useille korjauksille samassa tallennuksessa
- Automaattinen kuvaajan päivitys tallennuksen jälkeen
- Korjausten selitykset näkyvät kuvaajan tooltipissä

## Käyttöönotto

### Vaatimukset
- Node.js
- npm/yarn/pnpm
- Gemini API -avain

### Asennus
1. Kloonaa repositorio
```bash
git clone https://github.com/your-org/ai-kysyntaennuste.git
```

2. Asenna riippuvuudet
```bash
npm install
```

3. Luo .env-tiedosto ja lisää tarvittavat ympäristömuuttujat
```env
VITE_GEMINI_API_KEY=xxx
```

4. Käynnistä kehityspalvelin
```bash
npm run dev
```

### Testaus
```bash
npm run test
```

### Tuotantoon vieminen
Sovellus on konfiguroitu käyttämään Vercel-palvelua tuotantoon viemiseen. Huomaa, että automaattinen deployment on rikki, joten jokaisen git-pushin jälkeen täytyy ajaa manuaalisesti:

```bash
vercel --prod --force
```

## Projektin rakenne
```
ai-kysyntaennuste/
├── public/              # Staattiset tiedostot
├── src/                # Lähdekoodi
│   ├── api/           # API-integraatiot
│   ├── components/    # React-komponentit
│   │   └── ui/       # UI-komponenttikirjasto
│   ├── hooks/        # React-hookit
│   ├── lib/          # Apukirjastot ja työkalut
│   ├── pages/        # Sivukomponentit
│   ├── types/        # TypeScript-tyypit
│   └── App.tsx       # Pääsovelluskomponentti
├── tests/            # Testitiedostot
├── docs/            # Dokumentaatio
└── config/          # Konfiguraatiotiedostot
```

## Turvallisuus
- Käyttäjienhallinta toteutettu turvallisesti
- API-avaimet suojattu ympäristömuuttujilla
- Virheenkäsittely toteutettu kaikille kriittisille toiminnoille
- Syötteiden validointi ja sanitointi

## Lisenssi
Kaikki tekijänoikeudet kuuluvat SCM Best Oy:lle

## Yhteystiedot
Lisätietoja ja tukea saat osoitteesta [https://wisestein.fi/yhteystiedot](https://wisestein.fi/yhteystiedot)

## Documentation

- See [docs/data-normalization.md](docs/data-normalization.md) for details on the data normalization layer and field mapping.

### Datarakenne
Sovellus käsittelee seuraavia datakenttiä:

- `Quantity`: Toteutunut kysyntä (sininen viiva)
- `old_forecast`: Vanha ennuste (vihreä katkoviiva)
- `new_forecast`: Tilastollinen ennuste (oranssi katkoviiva)
- `new_forecast_manually_adjusted`: Korjattu ennuste (punainen viiva)
- `old_forecast_error`: Ennustevirhe (punainen katkoviiva)
- `correction_percent`: Korjausprosentti
- `explanation`: Korjauksen selitys (näkyy kuvaajan tooltipissä)
- `correction_timestamp`: Korjauksen aikaleima
