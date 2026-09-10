# Afbeeldingen bij artikelen

Bewaar afbeeldingen per artikel in `public/images/artikelen/<slug>/`. Voor *De Woningmarkt* wordt dat bijvoorbeeld:

```text
public/images/artikelen/de-woningmarkt/
  wooncapaciteit-knoppen.webp
  woningvoorraad-per-type.webp
```

Gebruik bij voorkeur WebP voor foto's en samengestelde figuren, PNG alleen wanneer transparantie of scherpe pixelweergave nodig is, en SVG voor zelfgemaakte diagrammen. Bewaar het bewerkbare bronbestand desgewenst buiten `public/`; alleen het webformaat hoeft mee naar productie.

## In Markdown

Voor een gewone afbeelding volstaat:

```md
![Staafdiagram van de gemiddelde woningoppervlakte per woningtype](/images/artikelen/de-woningmarkt/woningvoorraad-per-type.webp)
```

Gebruik de figure-component wanneer onderschrift of bronvermelding nodig is:

```md
::ArticleFigure
---
src: /images/artikelen/de-woningmarkt/wooncapaciteit-knoppen.webp
alt: Vergelijking van beleidsmaatregelen naar snelheid, potentieel en uitvoerbaarheid
caption: Indicatieve vergelijking van de belangrijkste beleidsknoppen.
source: Eigen analyse op basis van CBS en Platform31
sourceUrl: https://www.cbs.nl/
---
::
```

## Afspraken

- De alt-tekst beschrijft de informatiewaarde, niet het uiterlijk. Schrijf `Ontwikkeling van ...`, niet `Afbeelding van een grafiek`.
- Zet tekst en cijfers die essentieel zijn voor het betoog ook in de lopende tekst of een toegankelijke tabel. Een afbeelding alleen is niet goed doorzoekbaar of toegankelijk.
- Vermeld bij materiaal van derden de maker, bronlink en licentie. Een bronvermelding is geen vervanging voor gebruiksrecht.
- Exporteer foto's meestal op maximaal 1.600–2.000 pixels breed; grotere bestanden leveren voor een artikel zelden zichtbaar voordeel op.
- Gebruik bestandsnamen in kleine letters met koppeltekens en zonder versienamen zoals `final-v2`.
- Gebruik geen externe afbeelding-URL in een artikel. Bewaar een toegestane kopie in de repository, zodat het archief niet breekt wanneer de bronsite verandert.
- Een decoratieve afbeelding krijgt een lege alt-tekst (`alt: ''`). Een inhoudelijke grafiek nooit.
