---
title: Van AI-vraag naar maatschappelijke waarde
description: Waarom energie per zoekopdracht de verkeerde maat kan zijn — en welke verantwoordelijkheid ontstaat wanneer AI steeds krachtiger wordt.
date: 2026-10-08
updated: 2026-10-09
tags: [AI, Energie, Klimaat, Maatschappij]
translationKey: ai-energy-and-societal-value
articleRelations:
  - type: complements
    article: ai-can-win-while-the-ai-bubble-bursts
featuredImage: /images/artikelen/ai-energy/ai-energy-value-v2.webp
featuredImageAlt: Een compacte rekenkern ontvangt energie uit het elektriciteitsnet en verdeelt lichtende informatiestromen naar netbeheer, materiaalonderzoek, industrie en een groene leefomgeving.
featuredImageFocalPoint: 50% 50%
featuredImageMobileFocalPoint: 50% 50%
summary: De bekende vergelijking waarin een AI-vraag tienmaal zoveel energie kost als een Google-zoekopdracht gebruikt verouderde en onvergelijkbare grootheden. De betere eenheid is de volledig beantwoorde informatietaak. Dat neemt de snelle groei van het totale datacenterverbruik niet weg. Juist daarom zouden we naast efficiëntie ook moeten meten hoeveel aantoonbare maatschappelijke en klimatologische waarde AI oplevert.
keyPoints:
  - Eén prompt en één zoekopdracht zijn geen stabiele of functioneel gelijkwaardige eenheden; model, antwoordlengte, retrieval en taakcomplexiteit veranderen het verbruik sterk.
  - Efficiëntie per taak kan snel verbeteren terwijl het totale elektriciteitsgebruik stijgt door meer gebruikers, zwaardere toepassingen en het reboundeffect.
  - Klimaatwinst door AI moet causaal, additioneel en zonder dubbeltelling worden vastgesteld voordat zij tegenover de eigen voetafdruk mag worden gezet.
  - De voorgestelde Climate Leverage Ratio en capability obligation zijn beoordelingskaders, geen bewezen economische wetten.
plainLanguage:
  title: Niet iedere AI-vraag kost hetzelfde — en energie is maar de helft van de afweging
  intro: Een eenvoudige zoekopdracht en een uitgebreid AI-onderzoek leveren niet hetzelfde resultaat. Daarom vertelt energie per vraag maar een deel van het verhaal. We moeten ook kijken naar het volledige werk, het totale datacenterverbruik en de waarde die AI oplevert.
  sections:
    - heading: Vergelijk dezelfde taak
      paragraphs:
        - Een zoekmachine geeft meestal bronnen die je zelf moet openen en combineren. Een AI-systeem kan dat deels overnemen, maar soms ook veel meer rekenwerk doen dan nodig. Vergelijk daarom routes naar een bruikbaar antwoord, niet alleen losse opdrachten.
    - heading: Efficiënter kan toch meer energie betekenen
      paragraphs:
        - AI-modellen en chips worden per taak zuiniger. Daardoor wordt AI goedkoper en ontstaat nieuw gebruik. Als dat gebruik sneller groeit dan de efficiëntie verbetert, stijgt het totale elektriciteitsverbruik alsnog.
    - heading: Kijk ook naar aantoonbare winst
      paragraphs:
        - AI kan elektriciteitsnetten, onderzoek en industriële processen helpen verbeteren. Die voordelen tellen alleen mee als aannemelijk is dat AI ze echt veroorzaakte, ze anders niet waren ontstaan en dezelfde besparing niet meerdere keren wordt geboekt.
  takeaway: Een bruikbare beoordeling combineert de energie van een voltooide taak met de controleerbare maatschappelijke waarde die zij oplevert.
aiReviewModel: GPT-6.1 Sol
aiReviewDate: 2026-10-08
modelComponent: ai-energy
modelLimitations:
  - De startwaarden combineren gepubliceerde meetpunten met zichtbare scenarioaannames; zij zijn geen universele energiecijfers voor AI of zoeken.
  - Het taakmodel omvat operationele energie, maar geen volledige levenscyclus van apparaten, netwerken, gebouwen en hardware.
  - Het schaalmodel is een gevoeligheidsverkenning en geen voorspelling van AI-gebruik of datacenterverbruik.
  - De Climate Leverage Ratio is een conceptueel beoordelingskader; causaliteit, additionaliteit, overlap en bewijszekerheid moeten in werkelijkheid empirisch worden vastgesteld.
draft: false
---

Eén vraag aan kunstmatige intelligentie zou tien keer zoveel energie kosten als één Google-zoekopdracht. De vergelijking is vaak genoeg herhaald om als vaststaand feit te klinken. Zij heeft ook precies de vorm die gemakkelijk blijft hangen: twee bekende handelingen, één helder getal en een ongemakkelijke conclusie. Wie een chatbot gebruikt waar een zoekmachine had volstaan, zou zonder het te zien tienmaal zoveel elektriciteit verbruiken.

Alleen is de vergelijking methodologisch zwak. Het cijfer voor Google dat vaak als uitgangspunt fungeert, gaat terug op een bedrijfsblog uit 2009. Google schreef toen dat een zoekopdracht ongeveer 0,0003 kWh, ofwel 0,3 Wh, gebruikte.[1] Veel latere vergelijkingen zetten daar een schatting van enkele watturen voor een generatieve AI-vraag tegenover. Daarmee worden een oude gemiddelde waarde voor een zoekdienst en een modelberekening voor een andere technologie behandeld alsof zij gelijktijdig, op dezelfde systeemgrens en voor dezelfde taak waren gemeten.

Sindsdien zijn beide kanten veranderd. Een zoekmachine toont niet langer uitsluitend tien blauwe links, maar gebruikt onder meer neurale rangschikking, samenvattingen en generatieve antwoorden. AI-systemen variëren ondertussen van kleine modellen die op een telefoon draaien tot lange redeneerprocessen met zoekacties, code-uitvoering en duizenden gegenereerde tokens. Eén universeel energiegetal voor *een AI-vraag* bestaat daarom net zomin als één brandstofverbruik voor *een reis*.

Het bijwerken van de vergelijking begint met het definiëren van de vergelijkingsbasis. De scenarioverkenner hieronder verbindt drie schaalniveaus: energie per voltooide informatietaak, de groei van het totale gebruik wanneer efficiëntie en rebound tegelijk veranderen, en de mogelijke klimaathefboom wanneer vermeden uitstoot voorzichtig wordt toegerekend.

::ModelDisclosure{title="AI, energie en maatschappelijke opbrengst" description="Vergelijk informatieroutes, verken efficiëntie en rebound door de tijd en toets een Climate Leverage Ratio." open=true}
  ::AiEnergyExplorer
  ::
::

## Wat is er werkelijk gemeten?

Google publiceerde in 2025 een productiemeting van de Gemini-app. De mediane tekstprompt gebruikte volgens die studie 0,24 Wh, inclusief modelacceleratoren, hostmachines, ongebruikte capaciteit en de energie-overhead van het datacenter.[2] Google rapporteerde voor dezelfde mediane prompt 0,03 gram CO₂-equivalent en 0,26 milliliter waterverbruik op locatie. Het bijbehorende technische blog benadrukt dat het om operationele inferentie in een daadwerkelijk productiesysteem gaat, niet om een theoretische GPU-berekening.[3]

Dat maakt de meting veel bruikbaarder dan veel eerdere extrapolaties, maar niet universeel. De gerapporteerde mediaan zegt niets over de vorm van de verdeling: een kort tekstantwoord, een lang redeneertraject en videogeneratie kunnen sterk uiteenlopen. Training, chipproductie en bouw van het datacenter vallen niet binnen dezelfde operationele promptmeting. Ook gebruikt Google voor koolstof een eigen *market-based* benadering en meet het watercijfer directe koeling, niet noodzakelijk alle indirecte effecten van elektriciteitsproductie. Bovendien is het onderzoek door Google-auteurs uitgevoerd en bij publicatie als preprint beschikbaar gesteld. Het is een waardevolle primaire meting met een duidelijk afgebakende reikwijdte, geen onafhankelijke natuurconstante.

Opvallend is dat 0,24 Wh zelfs iets lager ligt dan Googles eigen zoekschatting van 0,3 Wh uit 2009. Daaruit volgt niet dat AI inmiddels altijd zuiniger is dan zoeken. Het laat vooral zien hoe weinig betekenis de oude factor tien nog heeft. De tellers zijn veranderd, de noemers zijn niet gelijk en de variatie binnen de categorie *AI* is inmiddels enorm.

Een IEA-actualisering uit 2026 maakt dat punt nog scherper. Als alle conventionele internetzoekopdrachten zouden worden vervangen door eenvoudige AI-tekstvragen, zou dat volgens de organisatie minder dan 4 TWh per jaar vergen: minder dan één procent van het huidige wereldwijde datacenterverbruik. Tegelijk waarschuwt de IEA dat video, uitgebreid redeneren en agentische taken honderden tot duizenden malen meer energie per opdracht kunnen vragen dan eenvoudige tekstgeneratie.[4] Niet het woord *AI*, maar de feitelijke taak en uitvoering bepalen de orde van grootte.

## Van opdracht naar informatiebehoefte

Zelfs perfect gemeten energie per opdracht kan nog de verkeerde functionele eenheid zijn. Stel dat iemand wil weten welke warmtepomp bij een woning past. Een traditionele route kan bestaan uit vijf zoekopdrachten, acht geopende pagina’s, het lezen van productspecificaties en het zelf combineren van tegenstrijdige informatie. Een AI-route kan één antwoord geven, maar daarvoor verschillende bronnen ophalen, vergelijken en samenvatten. Een derde systeem kan eerst een kleine zoekindex raadplegen, herhaalde context uit een cache lezen en alleen voor het onzekere deel een groter redeneermodel gebruiken.

::AiEnergyVisual{view="task"}
::

Voor een navigatievraag — *wat is de website van de Belastingdienst?* — is energie per zoekopdracht een redelijke maat. Een lang AI-antwoord zou daar vooral verspilling zijn. Voor een synthesevraag is het zinvoller om de energie per volledig beantwoorde informatiebehoefte te meten. Dan tellen alle machinehandelingen mee, maar ook het aantal pogingen dat nodig is om een bruikbaar antwoord te krijgen. Desgewenst kan zelfs menselijke zoektijd worden meegenomen, al moet die niet lichtvaardig in kilowatturen worden omgerekend.

Neem een zuiver illustratieve berekening. Vijf zoekopdrachten van 0,3 Wh zouden samen 1,5 Wh kosten. Eén AI-antwoord van 0,8 Wh lijkt dan efficiënter, mits het werkelijk dezelfde bronnen vindt, dezelfde onzekerheid zichtbaar maakt en geen extra controlewerk veroorzaakt. Een eenvoudige zoekopdracht van 0,3 Wh blijft daarentegen duidelijk doelmatiger dan een agentisch onderzoek van 20 Wh als beide slechts hetzelfde adres opleveren. De cijfers in dit voorbeeld zijn rekenaannames, geen actuele metingen. Het punt is dat de uitkomst kan omslaan zodra taakvoltooiing de noemer wordt.

Dat voorkomt ook een subtiele fout: een systeem kan energie besparen door een slechter antwoord te leveren. Wie alleen watturen per prompt rapporteert, beloont korte antwoorden, mislukte opdrachten en het afschuiven van werk naar de gebruiker. Een bruikbare maat moet daarom energie verbinden aan kwaliteit: correcte taakvoltooiing, brondekking, benodigde herstelpogingen en de zwaarte van de vraag.

## Kosten vooraf: training en indexering

De energie van digitale informatieverwerking ontstaat niet uitsluitend op het moment dat iemand op Enter drukt. Een taalmodel is vooraf getraind; een zoekmachine heeft vooraf het web gecrawld, documenten verwerkt, indexen gebouwd en rangschikkingsmodellen getraind. Beide infrastructuren worden bovendien voortdurend vernieuwd. *Vooraf gemaakt* betekent dus niet *eenmalig*, en *inferentie* is niet het volledige systeem.

Economisch en energetisch kunnen zulke kosten worden geamortiseerd over het gebruik. Stel als denkvoorbeeld dat een trainingscyclus 10 GWh vraagt en het resulterende model tien miljard keer zinvol wordt gebruikt. Dan is het toegerekende aandeel gemiddeld 1 Wh per interactie. Bij honderd miljard interacties wordt dat 0,1 Wh. De berekening is correct, maar zonder betrouwbare waarden voor trainingsenergie, levensduur, gebruiksvolume en opvolgende trainingsrondes zegt zij niets over een concreet model. Daarom gebruik ik hier bewust geen onbewezen cijfers voor recente GPT-modellen.

Bij zoekindexering speelt hetzelfde probleem. De kosten van crawlen en indexeren dienen vele gebruikers, maar pagina’s veranderen, spamfilters worden aangepast en rangschikkingsmodellen worden opnieuw getraind. Een eerlijke vergelijking specificeert dus minstens vier grenzen: operationele uitvoering, gedeelde voorafkosten, fysieke infrastructuur en de gebruikte elektriciteitsmix. Anders kan hetzelfde systeem schoon of vervuilend lijken door boekhoudkundige keuzes in plaats van technische verschillen.

## Search en AI groeien naar elkaar toe

De tegenstelling tussen Google en AI wordt ook technisch steeds kunstmatiger. Klassieke zoekdiensten gebruiken modellen voor classificatie en rangschikking. Generatieve systemen gebruiken retrieval om actuele bronnen op te halen. Kleine modellen kunnen een vraag routeren; een groter model wordt alleen ingeschakeld wanneer dat nodig is. Veelgebruikte documenten en lange vaste context kunnen worden gecachet. Google meldde bijvoorbeeld dat expliciete contextcaching de prijs van herhaalde context met 75 procent kon verlagen; dat is een prijsreductie en geen rechtstreekse energiemeting, maar zij wijst op hergebruik van berekening en geheugen.[5]

Ook generatie zelf wordt efficiënter. Bij *speculative decoding* stelt een kleiner model kandidaat-tokens voor die een groter model parallel controleert. Google beschrijft de techniek als een blijvend onderdeel van de optimalisatie van grootschalige producten zoals AI Overviews.[6] Aan de andere kant worden zoekvragen complexer: een systeem kan meerdere deelvragen formuleren, bronnen ophalen en pas daarna een antwoord schrijven.

Het resultaat is een convergerende architectuur van indexen, embeddings, caches, kleine modellen, grote modellen en selectief redeneren. De relevante ontwerpvraag wordt: welke combinatie voltooit deze taak met voldoende kwaliteit tegen de laagste totale kosten?

## De paradox: zuiniger per taak, meer stroom in totaal

Op systeemniveau verdwijnt het probleem daarmee niet. De IEA schatte het wereldwijde elektriciteitsgebruik van datacenters in 2024 op ongeveer 415 TWh, circa 1,5 procent van het mondiale elektriciteitsgebruik. In het basisscenario stijgt dit naar ongeveer 945 TWh in 2030, net onder drie procent.[7] Die cijfers gaan over alle datacenters, niet alleen over AI. De IEA verwacht wel dat versnelde servers, vooral gedreven door AI, bijna de helft van de netto groei veroorzaken.

::AiEnergyVisual{view="paradox"}
::

Dat individuele inferentie veel efficiënter wordt en het totaal toch snel groeit, is geen tegenspraak. Google rapporteerde tussen mei 2024 en mei 2025 een 33-voudige daling in energie per mediane Gemini-prompt.[2] In dezelfde periode kon het aantal gebruikers groeien, konden antwoorden langer worden en konden geheel nieuwe toepassingen ontstaan. Totale energie is grofweg het product van gebruik, rekenwerk per toepassing en de efficiëntie van de infrastructuur. Als de eerste twee factoren sneller groeien dan de derde daalt, neemt het totaal toe.

Hier verschijnt het reboundeffect, verwant aan de paradox die William Stanley Jevons in de negentiende eeuw beschreef voor efficiënter kolengebruik. Efficiëntie verlaagt de kosten per taak, waardoor bestaande toepassingen intensiever worden gebruikt en nieuwe toepassingen economisch haalbaar worden. Onderzoekers die het effect voor AI analyseren waarschuwen daarom dat efficiëntie alleen geen netto daling van milieudruk garandeert.[8] Het effect is geen automatische wet dat iedere besparing volledig verdwijnt. De omvang hangt af van vraagelasticiteit, prijzen, capaciteitsgrenzen en beleid.

Jev — de technologie waarover ik in een ander artikel schreef — vormt een concreet voorbeeld op taakniveau. Het systeem probeert bepaalde classificatie- en beslisvragen veel goedkoper uit te voeren dan een generatief frontiermodel. Als zulke gespecialiseerde modellen een duur model vervangen, daalt het verbruik per bestaande beslissing. Maar dezelfde lage kosten kunnen classificatie mogelijk maken op miljoenen plaatsen waar eerder geen model werd gebruikt. De besparing is technisch reëel; het effect op het totaal blijft een empirische vraag.

## Kan AI méér klimaatwinst opleveren dan zij kost?

AI is niet uitsluitend een elektriciteitsvraag. De technologie kan ook energiestromen voorspellen, apparatuur aansturen, wetenschappelijke zoekruimten verkleinen en industriële processen optimaliseren. Voor elektriciteitsnetten kan betere voorspelling van productie en vraag helpen om variabele zon- en windenergie in te passen. In industrie en gebouwen kan besturing verlies beperken en onderhoud beter plannen. Bij materialenonderzoek kan computationele selectie het aantal kandidaten verkleinen dat fysiek hoeft te worden gesynthetiseerd en getest.

De IEA modelleerde een scenario waarin bestaande AI-toepassingen breed worden ingevoerd. Daarin zouden zij in 2035 ongeveer 1.400 miljoen ton CO₂-uitstoot kunnen vermijden, ongeveer vijf procent van de energiegerelateerde uitstoot in dat jaar.[9] Dat is een scenario, geen gemeten besparing en geen garantie. Het veronderstelt verspreiding van toepassingen die nu nog organisatorische, financiële, datatechnische en regulatoire barrières kennen. De IEA benadrukt bovendien dat reboundeffecten een deel van de winst kunnen neutraliseren.[10]

Wetenschappelijk onderzoek biedt een andere vorm van potentiële hefboom. AI kan patronen zoeken in moleculen, eiwitten, katalysatoren of batterijmaterialen en zo bepalen welke experimenten als eerste de moeite waard zijn. Een doorbraak kan zeer grote gevolgen hebben, maar attributie is lastig: het model, de trainingsdata, menselijke onderzoekers, laboratoria, financiering en latere opschaling zijn allemaal nodig. Het is daarom te gemakkelijk om de volledige vermeden uitstoot van een nieuwe technologie aan AI toe te schrijven.

We hebben een maat nodig die de mogelijkheid van grote indirecte winst serieus neemt zonder iedere mooie toepassing als compensatie te boeken.

## De Climate Leverage Ratio

Daarom stel ik de **Climate Leverage Ratio** voor als conceptuele maatstaf:

> **Climate Leverage Ratio = additionele, causaal aan AI toerekenbare vermeden klimaatimpact ÷ volledige klimaatimpact van die AI-toepassing**

Een ratio groter dan één betekent dat de aantoonbaar vermeden impact groter is dan de aan AI toegerekende impact. Een ratio van tien zou betekenen dat iedere ton CO₂-equivalent in de volledige AI-keten samenhangt met tien additioneel vermeden tonnen. Dit is bewust geen reeds gestandaardiseerde meetmethode en evenmin een vrijbrief voor onbeperkte groei. De formule maakt vooral zichtbaar welke bewijsproblemen moeten worden opgelost.

Ten eerste is er **causaliteit**. Werd de besparing werkelijk door het AI-systeem veroorzaakt, of zouden conventionele optimalisatie, hogere energieprijzen of regelgeving hetzelfde resultaat hebben opgeleverd? Ten tweede is er **additionaliteit**. Telt alleen de verbetering boven een geloofwaardige situatie zonder deze toepassing mee? Ten derde moet **dubbeltelling** worden voorkomen. De ontwikkelaar van een model, een netbeheerder en een afnemer kunnen niet ieder de volledige vermeden uitstoot claimen. Ten vierde moet de noemer volledig genoeg zijn: inferentie, toegerekende training, hardware, koeling, netverliezen en waar relevant bouw en water.

Daar komt tijd bij. Een onderzoekssysteem kan vandaag energie gebruiken en pas over tien jaar tot een schaalbare technologie leiden. De verwachte winst moet dan worden gewogen naar kans, vertraging en levensduur. Voor operationele netoptimalisatie kan daarentegen per kwartier een tegenfeitelijke basislijn worden gebouwd. Dezelfde ratio kan dus als denkkader dienen, maar de bewijskracht verschilt per toepassing.

De maat zou ook een ongemakkelijke uitkomst mogelijk moeten maken: sommige AI-toepassingen hebben geen klimaatwinst en hoeven die ook niet te veinzen. Kunst, communicatie of medische diagnostiek kan maatschappelijk waardevol zijn zonder een positieve Climate Leverage Ratio. De ratio beoordeelt één soort hefboom, niet de volledige morele waarde van technologie.

## Van mogelijkheid naar verantwoordelijkheid

Toch verandert er iets wanneer een systeem steeds capabeler wordt. Een kleine tekstgenerator kan weinig bijdragen aan netplanning of materiaalonderzoek. Een krachtig systeem dat code schrijft, wetenschappelijke literatuur verbindt, experimenten helpt ontwerpen en infrastructuur bestuurt, heeft meer mogelijkheden. Met die capaciteit ontstaat mogelijk ook een zwaardere reden om een deel ervan te richten op collectieve problemen.

Ik noem dit de **capability obligation**: de voorgestelde maatschappelijke verplichting dat een groei in relevante technische capaciteit gepaard gaat met een groeiende verantwoordelijkheid om die capaciteit aantoonbaar voor publieke waarde in te zetten. Het is een filosofisch voorstel, geen bewezen economische wetmatigheid. Het zegt evenmin dat ieder AI-bedrijf zelfstandig klimaatbeleid moet bepalen of dat alle rekenkracht naar klimaatonderzoek moet gaan.

De gedachte is bescheidener en tegelijk veeleisender. Wie beslag legt op schaarse elektriciteit, netcapaciteit, water, kapitaal en hoogwaardig technisch talent kan niet volstaan met de mededeling dat iedere losse prompt efficiënter is geworden. Naarmate het vermogen om complexe problemen op te lossen toeneemt, wordt de vraag legitiemer welk deel van dat vermogen controleerbaar terugvloeit naar de samenleving. Dat kan via open wetenschappelijke modellen, toegang voor publieke onderzoekers, netflexibiliteit, transparante milieumetingen of toepassingen waarvan additionaliteit werkelijk wordt geëvalueerd.

Het debat kan daarmee drie grootheden tegelijk volgen: de energie van een voltooide taak, de ontwikkeling van het totale systeem en de maatschappelijke waarde die terugkomt voor de energie die we in kunstmatige intelligentie investeren.

Naarmate AI krachtiger wordt, groeit mogelijk ook onze verantwoordelijkheid om die capaciteit in te zetten voor problemen die de samenleving als geheel raken. Het klimaatvraagstuk is daarvan niet het enige voorbeeld, maar wel een geschikte test: de kosten zijn meetbaar, de potentiële hefboom is groot en mooie beloften zijn onvoldoende. Wie zich op intelligentie beroept, zou ook bereid moeten zijn de uitkomst ervan te laten tellen.

## Referenties

1. Google. *Powering a Google Search*. Google Blog, 2009. [Bron bekijken](https://googleblog.blogspot.com/2009/01/powering-google-search.html)
2. Elsworth et al. *Measuring the Environmental Impact of Delivering AI at Google Scale*. arXiv:2508.15734, 2025. [Publicatie bekijken](https://arxiv.org/abs/2508.15734)
3. Vahdat en Dean. *Measuring the environmental impact of AI inference*. Google Cloud Blog, 2025. [Bron bekijken](https://cloud.google.com/blog/products/infrastructure/measuring-the-environmental-impact-of-ai-inference)
4. International Energy Agency. *Key Questions on Energy and AI — Executive summary*. 2026. [Bron bekijken](https://www.iea.org/reports/key-questions-on-energy-and-ai/executive-summary)
5. Kilpatrick. *Gemini 2.5 Models now support implicit caching*. Google Developers Blog, 2025. [Bron bekijken](https://developers.googleblog.com/gemini-2-5-models-now-support-implicit-caching/)
6. Google Research. *Looking back at speculative decoding*. 2024. [Bron bekijken](https://research.google/blog/looking-back-at-speculative-decoding/)
7. International Energy Agency. *Energy and AI — Energy demand from AI*. 2025. [Bron bekijken](https://www.iea.org/reports/energy-and-ai/energy-demand-from-ai)
8. Luccioni, Strubell en Crawford. *From Efficiency Gains to Rebound Effects: The Problem of Jevons’ Paradox in AI’s Polarized Environmental Debate*. arXiv:2501.16548, 2025. [Publicatie bekijken](https://arxiv.org/abs/2501.16548)
9. International Energy Agency. *Energy and AI — Executive summary*. 2025. [Bron bekijken](https://www.iea.org/reports/energy-and-ai/executive-summary)
10. International Energy Agency. *Energy and AI — AI and climate change*. 2025. [Bron bekijken](https://www.iea.org/reports/energy-and-ai/ai-and-climate-change)
