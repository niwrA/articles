---
title: De groenste koffiebeker bestaat niet
description: Waarom een mok soms wint, een wegwerpbeker soms verrassend dichtbij komt en vooral de gebruikspraktijk de uitslag bepaalt.
date: 2026-09-13
tags: [Duurzaamheid, Systemen, Modellen]
translationKey: coffee-cups
draft: false
---

***Noot van de auteur:*** *Dit artikel is een voorbeeld van de gedachte achter Interactive Thought: vervang een te algemene stelling waar mogelijk door een controleerbaar model dat laat zien onder welke omstandigheden een conclusie geldt. Bij het onderzoeken, structureren en uitwerken van het artikel is AI als hulpmiddel gebruikt. De aannames en uitkomsten van het model zijn nadrukkelijk bewerkbaar; de uiteindelijke interpretatie en publicatie vallen onder mijn verantwoordelijkheid.*

## Waarom een mok soms wint, een wegwerpbeker soms verrassend dichtbij komt, en vooral ons gedrag de uitslag bepaalt

Op kantoor lijkt de keuze eenvoudig. Een papieren beker voelt natuurlijker dan plastic. Een eigen mok voelt nog beter: die gooi je immers niet weg. Maar zodra we de hele levenscyclus meetellen, wordt de vraag ongemakkelijker. Een mok moet worden gemaakt, vervoerd en honderden keren afgewassen. Een papieren beker is bijna nooit alleen van papier, want voor warme dranken heeft hij meestal een kunststof coating nodig. Een plastic beker gebruikt fossiele grondstoffen, maar kan zeer licht zijn. Recycling helpt alleen als de beker daadwerkelijk apart wordt ingezameld, voldoende schoon is en terechtkomt bij een proces dat het materiaal opnieuw benut.

De juiste vraag is daarom niet: **welk materiaal is groen?** De juiste vraag is: **onder welke omstandigheden veroorzaakt één koffiemoment de minste milieubelasting?**

Dat verschil is belangrijk. Een materiaal heeft geen vaste milieuscore. De score ontstaat uit een systeem: productie, gebruik, afwas, energie, inzameling, recycling en afdanking. Verander je één onderdeel, dan kan de rangorde veranderen. Precies daarom is dit een goede kandidaat voor een interactief model.

> **Kernidee:** de productie-impact van een herbruikbare mok wordt kleiner per gebruik naarmate hij langer meegaat. De afwasimpact komt daar bij ieder wasmoment opnieuw bovenop. Bij een wegwerpbeker ontstaat vrijwel de volledige impact opnieuw bij iedere nieuwe beker.

---

## Eerst bepalen wat we vergelijken

Een eerlijke vergelijking begint met een *functionele eenheid*: dezelfde dienst die alle alternatieven moeten leveren. In dit geval is dat bijvoorbeeld:

> **Eén consumptie van 180 milliliter warme drank op kantoor, inclusief de beker en het reinigen of verwerken daarvan.**

Dit voorkomt een veelgemaakte fout. Eén keramische mok vergelijken met één papieren beker zegt bijna niets, omdat de mok bedoeld is voor hergebruik. We moeten de productie van de mok verdelen over alle keren dat hij werkelijk wordt gebruikt. Tegelijk mogen we het afwassen niet vergeten.

Voor een herbruikbare mok kan de impact per consumptie vereenvoudigd worden geschreven als:

> **Impact mok = (productie + transport + afdanking) ÷ totaal aantal gebruiken + impact wasbeurt ÷ consumpties per wasbeurt**

Voor een wegwerpbeker wordt dat:

> **Impact wegwerp = productie + transport + afvalverwerking − daadwerkelijk gerealiseerd recyclingvoordeel**

Hierin is \(N_{gebruik}\) het totale aantal keren dat de mok wordt gebruikt voordat hij breekt, verdwijnt of ongebruikt in een kast eindigt. \(K\) is het aantal koffies dat uit dezelfde mok wordt gedronken voordat hij wordt afgewassen. Die twee getallen lijken onschuldig, maar hebben grote invloed op de uitkomst.

---

## Waar zit de milieubelasting?

### De keramische mok: een investering die moet renderen

Keramiek wordt gemaakt uit minerale grondstoffen en op hoge temperatuur gebakken. Daardoor begint een keramische mok met een relatief hoge productie-impact. Dat is niet automatisch een probleem: bij langdurig gebruik wordt die eenmalige impact over steeds meer koffies verdeeld. Een mok die duizend keer wordt gebruikt, draagt per consumptie nog maar een duizendste van zijn productie-impact.

Maar een mok die na twintig keer gebruiken breekt, wordt vervangen of thuis in een kast blijft staan, heeft weinig gelegenheid om die investering terug te verdienen. De levensduur in kalenderjaren is daarbij minder relevant dan het werkelijke aantal gebruiken. Een verzameling van twintig “duurzame” mokken waarvan steeds maar één exemplaar wordt gebruikt, is materiaaltechnisch iets anders dan één mok die jarenlang dienstdoet.

### De vaatwasser: klein per kopje, groot als systeem

Bij een herbruikbaar systeem verschuift een deel van de belasting van productie naar gebruik. De vaatwasser vraagt elektriciteit, water, reinigingsmiddel en apparatuur. De impact per mok hangt vervolgens af van vier vragen:

1. Hoeveel elektriciteit en water verbruikt het gekozen programma?
2. Hoe vol is de machine wanneer hij draait?
3. Hoeveel consumpties vinden plaats voordat de mok wordt gewassen?
4. Wat is de milieu-impact van de gebruikte elektriciteit op dat moment?

Een machine van 0,8 kWh die 80 stuks servies reinigt, schrijft gemiddeld 0,01 kWh toe aan ieder stuk. Dezelfde machine met 20 stuks komt uit op 0,04 kWh per stuk: viermaal zoveel. Dat is geen exacte levenscyclusanalyse—mokken nemen niet allemaal evenveel ruimte in en ander servies profiteert ook van de wasbeurt—maar het maakt de gevoeligheid zichtbaar.

Ook het tijdstip kan uitmaken. De klimaatintensiteit van elektriciteit varieert met de actuele productiemix. Veel zon of wind kan de uitstoot van een extra kilowattuur verlagen; extra vraag op een ander moment kan juist door een fossiele centrale worden opgevangen. Een dynamisch model kan daarom werken met een instelbare uitstootfactor in gram CO₂-equivalent per kWh. Het moet daarbij wel duidelijk zeggen of het een gemiddelde of een marginale factor gebruikt: dat zijn verschillende vragen en ze kunnen verschillende antwoorden geven.

Met de hand afwassen is evenmin per definitie beter. Een mok onder een stromende warme kraan reinigen kan relatief veel warm water kosten. Afwassen in een kleine hoeveelheid water, zonder papieren handdoeken en met efficiënt verwarmd water kan juist gunstiger uitvallen. “Met de hand” is dus geen proces, maar een verzameling sterk verschillende gedragingen.

### De papieren beker: papier plus een barrière

Papier kan uit hernieuwbare vezels bestaan, maar een warme drank stelt eisen. De beker moet vloeistofdicht blijven en krijgt daarom doorgaans een kunststof barrièrelaag. Die combinatie maakt verwerking ingewikkelder dan het woord *papier* suggereert. De productie vraagt hout, water, energie en chemicaliën; de coating vraagt een ander materiaal en kan recycling bemoeilijken.

Een papieren beker kán worden gerecycled, maar “recyclebaar” is geen beschrijving van wat er daadwerkelijk gebeurt. Daarvoor zijn aparte inzameling, weinig vervuiling, geschikte sortering en een afnemer nodig. Bekers met drankresten in een gemengde afvalstroom worden niet vanzelf grondstof. In een Nederlandse kantoorstudie bleek bovendien dat resultaten voor papieren, PLA- en polystyreenbekers sterk overlapten zodra verschillende realistische datasets en aannames over afvalverwerking werden gebruikt. De onderzoekers konden daardoor geen universeel beste wegwerpmateriaal aanwijzen.

### De plastic beker: licht, fossiel en afhankelijk van de keten

Een plastic beker kan zeer weinig materiaal bevatten. Dat lage gewicht beperkt productie- en transportimpact. Daar staan fossiele grondstoffen, zwerfafvalrisico en een nieuwe materiaalvraag bij iedere beker tegenover. Recycling kan de impact verminderen, maar alleen bij een werkende inzamelketen. Het theoretische percentage recyclebaar materiaal is dus minder belangrijk dan het percentage bekers dat daadwerkelijk wordt ingezameld én hoogwaardig verwerkt.

Biobased plastic lost dit niet automatisch op. *Biobased* zegt iets over de herkomst van de koolstof; *biologisch afbreekbaar* zegt iets over afbraak onder bepaalde omstandigheden; *composteerbaar* verwijst doorgaans naar gespecificeerde industriële condities. Deze eigenschappen zijn niet uitwisselbaar. Een composteerbare beker die in een installatie niet wordt geaccepteerd, gedraagt zich in de praktijk niet als gecomposteerd product.

---

## Wat de wetenschap vooral laat zien: de uitslag is voorwaardelijk

Levenscyclusanalyses van bekers leveren niet steeds dezelfde winnaar op. Dat is geen teken dat wetenschap nutteloos is. Het laat juist zien welke variabelen beslissend zijn en waar stellige claims meer zekerheid suggereren dan de data toelaten.

Een peer-reviewed studie naar Nederlandse kantooromgevingen vergeleek polystyreen, PLA, gecoat papier en herbruikbare bekers. De spreiding tussen realistische aannames was groot en overlapte. Bij de herbruikbare beker werd de uitkomst sterk bepaald door afwasgedrag en de belading van de vaatwasser. Opvallend was een robuuste, praktische bevinding: twee consumpties uit dezelfde beker vóór het wassen halveerden ongeveer het afwasgerelateerde aandeel per consumptie; een derde consumptie gaf nog extra winst, al nam het voordeel daarna af.

Dat leidt tot een belangrijker inzicht dan de vraag “papier of plastic?”. **Voorkomen van een nieuw product of een nieuwe washandeling is vaak krachtiger dan optimaliseren van het materiaal aan het einde van de keten.** Dezelfde wegwerpbeker nog eenmaal gebruiken vermijdt een tweede beker. Dezelfde mok nog eenmaal gebruiken vóór de vaatwasser verdeelt één reiniging over twee koffies. In beide gevallen verandert gedrag direct de noemer van de berekening.

Andere LCA-studies vinden vaak een omslagpunt waarna herbruikbaar gunstiger wordt dan eenmalig gebruik. Maar dat omslagpunt is geen natuurconstante. Het verschuift met het materiaal en gewicht van de mok, de vergeleken wegwerpbeker, de levensduur, het elektriciteitssysteem, de waswijze en de gekozen milieucategorie. Een getal als “na 30 keer is een mok beter” is alleen geldig binnen de aannames van het onderzoek dat het getal berekende.

---

## Klimaat is niet hetzelfde als milieu

De verleiding is groot om alles om te rekenen naar gram CO₂-equivalent. Dat is nuttig, maar onvolledig. Een levenscyclusanalyse kan onder meer kijken naar:

- klimaatverandering;
- energie- en grondstoffengebruik;
- watergebruik en lokale waterschaarste;
- verzuring en vermesting;
- toxiciteit en fijnstofvorming;
- landgebruik;
- afval, zwerfafval en microplastics.

Een alternatief kan op klimaat beter scoren en tegelijk meer water vragen. Papier kan aantrekkelijk zijn vanwege hernieuwbare grondstoffen, maar zwaarder zijn en veel proceswater vragen. Plastic kan een lage productiemassa hebben, maar fossiele koolstof gebruiken en bij verlies naar het milieu langdurige vervuiling veroorzaken. Keramiek kan lang meegaan, maar vraagt energie bij productie en reiniging.

Daarom zou het interactieve model de effecten naast elkaar moeten tonen. Een samengestelde “milieuscore” is alleen verantwoord als gebruikers zelf zien welke weging eraan ten grondslag ligt. Wie klimaat twee keer zo zwaar laat meetellen als watergebruik maakt een normatieve keuze, geen natuurkundige berekening.

---

## Probeer het zelf: het bekermodel

Het model vergelijkt drie routes per koffiemoment:

- een keramische of glazen mok;
- een gecoate papieren wegwerpbeker;
- een plastic wegwerpbeker, bijvoorbeeld van PP of PS.

::CoffeeCupModel
::

De standaardwaarden zijn bedoeld om het gedrag van het model inzichtelijk te maken, niet om één specifieke bekerketen definitief te beoordelen. Voor een concrete keuze moeten de productiedata, de feitelijke belading en het energieverbruik van de vaatwasser, het aantal keren dat een beker werkelijk wordt gebruikt en de lokale afvalverwerking worden ingevuld. Met de voorbeeldscenario’s is direct zichtbaar welke veranderingen de rangorde en de omslagpunten verschuiven.

## Wat kan een kantoor morgen al doen?

De grootste praktische verbeteringen vragen geen discussie over de perfecte beker. Ze volgen direct uit de factoren die de uitkomst domineren:

1. **Gebruik wat er al is.** Een bestaande mok vervangen door een nieuwe “duurzamere” mok veroorzaakt nieuwe productie-impact.
2. **Drink vaker uit dezelfde beker voordat je hem wast.** Twee of drie koffies per wasbeurt verminderen de reinigingsimpact per consumptie sterk, mits dat hygiënisch passend is en gebruikers hun beker niet delen.
3. **Draai volle vaatwassers op een efficiënt programma.** De belading is minstens zo relevant als het energielabel van de machine.
4. **Meet de praktijk.** Noteer een week lang het aantal koffies, wascycli, de gemiddelde belading en het aantal ingekochte wegwerpbekers. Zonder deze gegevens optimaliseer je aannames.
5. **Voorkom verlies en breuk.** Een mok die lang meegaat hoeft zijn productie-impact maar eenmaal terug te verdienen.
6. **Als wegwerp nodig is: ontwerp de inzameling als systeem.** Kies beker, afvalbak, logistiek en recycler samen. Alleen een recyclinglogo op de beker verandert nog geen afvalstroom.

In Nederland beweegt ook de regelgeving richting hergebruik. Volgens de eind 2025 aangekondigde aanpassing wordt herbruikbaar op kantoren vanaf 2027 de standaard en verdwijnt daar de recyclinguitzondering voor wegwerpbekers. Dat is een beleidskeuze om eenmalig gebruik terug te dringen; het vervangt geen analyse van het daadwerkelijke gebruikssysteem.

---

## Dus: welke beker is het milieuvriendelijkst?

Als een bestaande mok lang wordt gebruikt, meerdere consumpties meegaat vóór hij wordt gewassen en efficiënt in een volle vaatwasser terechtkomt, is hergebruik doorgaans een sterke strategie. Maar het woord *herbruikbaar* is geen vrijstelling van rekenen. Een zware mok die nauwelijks wordt gebruikt en na iedere koffie apart met veel heet water wordt gewassen, kan slechter presteren dan zijn groene imago suggereert.

Tussen papieren en plastic wegwerpbekers bestaat evenmin een universele winnaar. Gewicht, coating, productie-energie, inzameling en verwerking zijn vaak belangrijker dan de eenvoudige tegenstelling tussen “natuurlijk” papier en “fossiel” plastic. Recycling kan helpen, maar alleen voor het deel dat daadwerkelijk correct wordt ingezameld en verwerkt.

De meest betrouwbare conclusie is daardoor tegelijk minder bevredigend en bruikbaarder:

> **De groenste beker is meestal de beker die al bestaat, vaak wordt gebruikt, niet onnodig wordt gewassen en onderdeel is van een efficiënt georganiseerd systeem.**

Het interactieve model maakt van die conclusie geen nieuw dogma. Het laat zien wanneer zij klopt, wanneer niet, en welke verandering in jouw kantoor het meeste verschil maakt.

---

## Referenties

De onderstaande bronnen vormen de wetenschappelijke en beleidsmatige basis van het artikel. De waarden in het interactieve model zijn bewust als bewerkbare, illustratieve middenwaarden opgenomen en mogen niet zonder controle als parameters uit één van deze onderzoeken worden geïnterpreteerd.

- Van der Harst, E. & Potting, J. (2015), *Facility arrangements and the environmental performance of disposable and reusable cups*, International Journal of Life Cycle Assessment, 20, 1143–1154. https://doi.org/10.1007/s11367-015-0914-7
- Changwichan, K. & Gheewala, S.H. (2021), *Environmental payback periods of reusable alternatives to single-use plastic kitchenware products*, International Journal of Life Cycle Assessment, 26, 1521–1537. https://doi.org/10.1007/s11367-021-01946-6
- CE Delft (2020), *Milieu-impact van eenmalige versus meermalige verpakkingen*. Achtergrondrapport over wegwerpproducten en alternatieven. https://ce.nl/publicaties/impact-wegwerpproducten-en-hun-alternatieven/
- Rijksoverheid (19 december 2025), *Staatssecretaris maakt regels voor wegwerpbekers en -bakjes praktisch en duidelijker*. https://www.rijksoverheid.nl/actueel/nieuws/2025/12/19/staatssecretaris-maakt-regels-voor-wegwerpbekers-en--bakjes-praktisch-en-duidelijker

### Redactionele noot bij het model

Gebruik de getallen uit bovenstaande onderzoeken niet ongemerkt als universele standaardwaarden. Leg per dataset vast: jaar, land, bekergewicht, energiesysteem, systeemgrenzen, allocatiemethode en impactmethode. Toon standaard afrondingen en onzekerheidsbanden. Laat gebruikers daarnaast een scenario opslaan of delen, zodat een conclusie altijd samen met haar aannames reist.
