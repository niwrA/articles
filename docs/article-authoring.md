# Artikelstandaard

Deze richtlijn is de gezaghebbende referentie voor nieuwe artikelen en onderhoud aan bestaande artikelen. Gebruik `templates/article.nl.md` of `templates/article.en.md` als vertrekpunt en voer vóór publicatie `npm run lint:content` uit.

## Uitgangspunten

- Schrijf zorgvuldig, onafhankelijk en controleerbaar. Maak onderscheid tussen waarneming, berekening, interpretatie, hypothese en waardeoordeel.
- Geef onzekerheid en relevante tegenargumenten zichtbaar weer. Een model is een vereenvoudiging en geen bewijs.
- Houd alinea's inhoudelijk samenhangend. Vermijd opeenvolgende alinea's van één zin, overbodige herhaling en generieke stijlfiguren.
- Behoud bij redactioneel onderhoud bestaande URL's en `translationKey`-waarden. Verander een slug alleen met een expliciet migratie- en redirectplan.

## Frontmatter

Gebruik deze volgorde:

1. `title`
2. `description`
3. `date`
4. `updated` indien van toepassing
5. `tags`
6. `translationKey`
7. `originalUrl` indien van toepassing
8. afbeeldingsvelden
9. `summary`
10. `keyPoints`
11. `plainLanguage`
12. modelfelden indien van toepassing
13. AI-reviewvelden indien van toepassing
14. `draft`

Voor ieder gepubliceerd artikel zijn `title`, `description`, `date`, `tags`, `translationKey`, `featuredImage`, `featuredImageAlt`, `summary`, minimaal drie `keyPoints` en een complete `plainLanguage`-sectie verplicht. Een artikel met `modelComponent` vermeldt ook `modelLimitations`.

Nederlandse en Engelse edities delen dezelfde `translationKey`. Publicatie- en wijzigingsdatums mogen verschillen als de publicatiegeschiedenis werkelijk verschilt.

## Gewone, korte en eenvoudige weergave

- `summary` vat de centrale redenering samen, niet alleen het onderwerp.
- `keyPoints` bevat drie tot vijf zelfstandig begrijpelijke kernpunten.
- `plainLanguage` is een afzonderlijke, eenvoudige uitleg. Zij bevat een titel, korte introductie, minimaal drie logisch geordende onderdelen en één onthoudzin.
- De eenvoudige versie behoudt essentiële onzekerheden, beperkingen en het verschil tussen bewijs en hypothese. Zij hoeft niet iedere bron of technische afleiding te herhalen.

## Modellen

Gebruik alleen een geregistreerde `modelComponent`. Beschrijf in `modelLimitations` wat de visualisatie wel en niet berekent, welke waarden aannames zijn en waarvoor de uitkomst niet als advies of bewijs mag worden gebruikt. Een model moet een inhoudelijke relatie inzichtelijk maken; interactie op zichzelf is geen reden om een model toe te voegen.

## Afbeeldingen

Ieder gepubliceerd artikel heeft een `featuredImage` en een beschrijvende `featuredImageAlt`. Gebruik `featuredImageFocalPoint` wanneer de standaarduitsnede niet goed werkt en `featuredImageMobileFocalPoint` wanneer mobiel een andere uitsnede nodig heeft. Alt-tekst beschrijft het relevante beeld en herhaalt niet alleen de titel.

## Referenties en noten

Gebruik uitsluitend deze sectiekoppen:

```md
## Referenties
```

of:

```md
## References
```

Zet iedere literatuurverwijzing in één doorlopende genummerde Markdown-lijst:

```md
1. Auteur. *Titel*. Uitgever of tijdschrift, jaar. [Bron bekijken](https://example.org)
2. Organisatie. *Rapporttitel*. Jaar. [Bron bekijken](https://example.org)
```

Verwijs in de tekst met `[1]`, `[2–4]` of `[2,4]`. De nummers verwijzen altijd naar de genummerde referentielijst. Voeg nieuwe bronnen bij voorkeur aan het einde toe zodat bestaande nummers en externe verwijzingen stabiel blijven.

Een sectie `## Noten` of `## Notes` is alleen bedoeld voor inhoudelijke toelichtingen die geen literatuurbron zijn. `Verder lezen` mag worden gebruikt voor een kleine selectie niet-genummerde vervolglinks, maar niet als alternatieve naam of structuur voor de onderbouwing van beweringen.

## Controle en onderhoud

`npm run lint:content` controleert metadata, afbeeldingen, eenvoudige uitleg, modellen, sectiekoppen, referentienummering en verwijzingen. De normale productiebuild voert deze controle eerst uit. Een waarschuwing vraagt redactionele aandacht; een fout blokkeert de build.

Werk bij een inhoudelijke wijziging ook `updated` bij. Controleer bij een vertaalpaar of de andere taal dezelfde inhoudelijke correctie nodig heeft. Een vertaling hoeft niet woordelijk gelijk te zijn, maar verschillen in feiten, brongebruik en stelligheid moeten bewust zijn.
