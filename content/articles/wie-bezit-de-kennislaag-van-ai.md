---
title: "Wie bezit de kennislaag van AI?"
description: "AI wordt een toegangspoort tot menselijke kennis. Moet de infrastructuur daaronder eigendom zijn van afzonderlijke AI-bedrijven, of een open en vervangbare laag van het internet worden?"
date: "2026-09-24"
tags: ["AI", "Internet", "Kennis", "Infrastructuur"]
translationKey: "who-owns-ai-knowledge-layer"
articleRelations:
  - type: complements
    article: ai-can-win-while-the-ai-bubble-bursts
featuredImage: "/images/artikelen/knowledge-layer/open-knowledge-layer.webp"
featuredImageAlt: "Een open kennislaag verbindt onafhankelijke uitgevers met meerdere concurrerende AI-systemen"
featuredImageFocalPoint: "50% 50%"
featuredImageMobileFocalPoint: "50% 50%"
summary: "AI neemt steeds vaker niet alleen het zoeken, maar ook selectie, interpretatie en presentatie van informatie over. Daardoor kan het web open blijven terwijl de toegang tot kennis zich concentreert in private AI-ketens. Dit artikel onderzoekt een alternatief: een open kennislaag die identiteit, ontdekking en herkomst scheidt van modellen, interfaces en vertrouwensregels."
keyPoints:
  - "Een open web garandeert niet dat de toegang tot kennis open blijft wanneer AI de belangrijkste tussenlaag wordt."
  - "Kennisidentiteit en herkomst kunnen duurzaam worden ingericht zonder één embeddingmodel, AI-aanbieder of universeel vertrouwensalgoritme vast te leggen."
  - "Het belangrijkste ontwerpdoel is niet decentralisatie op zichzelf, maar vervangbaarheid van iedere afzonderlijke aanbieder."
plainLanguage:
  title: "Eenvoudig uitgelegd"
  intro: "Steeds vaker geeft AI direct antwoord in plaats van ons naar websites te sturen. Daardoor krijgt de maker van het AI-systeem veel invloed op welke informatie wij zien."
  sections:
    - heading: "Wat verandert er?"
      paragraphs:
        - "Op het gewone web kan iedereen publiceren en kunnen verschillende browsers en zoekmachines dezelfde websites gebruiken. Een AI-bedrijf bouwt vaak een eigen systeem om informatie te verzamelen, bewaren, rangschikken en samenvatten."
    - heading: "Wat zou een open kennislaag doen?"
      paragraphs:
        - "Informatie krijgt een herkenbare identiteit en gegevens over de maker en versie. Verschillende AI-systemen kunnen diezelfde informatie vinden, zonder dat één bedrijf eigenaar is van de hele route van bron naar antwoord."
    - heading: "Wat lost dat niet op?"
      paragraphs:
        - "Open techniek bepaalt niet vanzelf wat waar is. Ook spam, auteursrecht, privacy, verwijdering en betaling blijven moeilijke vragen. Verschillende toepassingen mogen bovendien verschillende regels voor vertrouwen gebruiken."
  takeaway: "Als AI een belangrijke toegang tot kennis wordt, moet een model of aanbieder vervangen kunnen worden zonder dat ook de onderliggende kennisinfrastructuur verdwijnt."
modelComponent: "knowledge-layer"
modelLimitations:
  - "Het schema vergelijkt architectuureigenschappen; het voorspelt niet welke technische implementatie zal winnen."
  - "Een open protocol voorkomt niet vanzelf economische machtsconcentratie, spam of misbruik."
  - "Herkomst maakt een publicatie controleerbaar, maar bewijst niet dat de inhoud waar is."
draft: false
---

Het internet maakte ooit een opmerkelijke architectuurkeuze. Niemand bezit HTTP. Voor een webserver is geen toestemming van Google, Microsoft of Amazon nodig. Iedereen kan een browser bouwen en een website publiceren. Daarboven zijn zoekmachines, cloudplatforms en sociale media sterk geconcentreerd geraakt, maar daaronder ligt een duurzamere verzameling open protocollen.

Als Google morgen verdwijnt, verdwijnt het web niet mee.

Met AI dreigen we iets anders te bouwen. We zoeken steeds minder zelf door pagina's en vragen steeds vaker een systeem om informatie te vinden, selecteren, combineren en uitleggen. Een reis langs bronnen verandert in een gesprek met een tussenpersoon.

Dat is al zichtbaar. In een analyse van zoekgedrag van 900 Amerikaanse volwassenen zag Pew Research Center in 2025 dat gebruikers bij Google-resultaten zonder AI-samenvatting in 15% van de bezoeken op een traditioneel zoekresultaat klikten. Met zo'n samenvatting was dat 8%; op een bron ín de samenvatting klikte men in 1% van de bezoeken.[1] Die cijfers tonen een samenhang en bewijzen niet dat de samenvatting de daling veroorzaakt. Wel laten ze zien dat de interface tussen mens en web verandert. In een Amerikaanse Pew-enquête uit 2026 zei 60% van de volwassenen weleens zulke samenvattingen te lezen.[2]

## Hoe een AI-systeem een vraag behandelt

Een AI-product is meer dan het taalmodel dat het antwoord schrijft. De applicatie stelt eerst de invoer samen uit de actuele vraag, instructies, relevante gesprekscontext en een beschrijving van beschikbare hulpmiddelen. Het taalmodel verwerkt die invoer en kan direct antwoorden, maar ook als volgende actie een zoekopdracht, berekening of andere toolaanroep produceren.

Zo'n actie wordt buiten het taalmodel uitgevoerd. Het resultaat komt als nieuwe context terug bij het model, dat opnieuw beoordeelt wat nodig is. Een onderzoeksvraag kan daardoor meerdere modelpassages en zoek- of leesacties doorlopen voordat het uiteindelijke antwoord wordt geschreven. Er hoeft daarbij niet eerst een volledig uitgeschreven intern handelplan te bestaan: het model kan ook stapsgewijs telkens de volgende actie kiezen.

> **vraag en context → taalmodel → eventueel hulpmiddel → nieuwe context → taalmodel → antwoord**

Het taalmodel beschikt daarnaast over patronen en informatie die tijdens de training indirect in zijn modelgewichten zijn terechtgekomen. Dat is geen ordelijke bibliotheek waarin iedere bewering met haar bron kan worden opgezocht of afzonderlijk kan worden bijgewerkt. Extern opgehaalde kennis kan actueler en beter herleidbaar zijn, maar alleen als de infrastructuur haar identiteit, versie en herkomst bewaart. Niet ieder systeem doorloopt bij iedere vraag alle stappen, en commerciële producten maken de precieze route vaak maar beperkt zichtbaar.

Dit artikel gaat daarom niet primair over wie het taalmodel bezit. Het onderzoekt wie de infrastructuur beheert waarmee AI externe kennis vindt, selecteert, actualiseert en van herkomstinformatie voorziet. Die kennislaag kan onderdeel zijn van één private productketen, maar zou ook los van modellen en interfaces als open infrastructuur kunnen worden ingericht.

::ModelDisclosure{title="Van vraag naar antwoord" description="Volg een algemene vraag of een actuele onderzoeksvraag door contextopbouw, modelpassages, externe hulpmiddelen en het uiteindelijke antwoord."}
  ::AiQuestionFlowExplorer{locale="nl"}
  ::
::

Daarmee wordt de architectuur onder AI een maatschappelijke vraag: **wie beheert de weg van publicatie naar antwoord?**

## Het web kan open blijven terwijl toegang zich sluit

Stel dat over twintig jaar nog miljarden onafhankelijke websites bestaan. HTTP is open en iedereen kan een domein registreren. Technisch is het web nog steeds verspreid. Maar als de meeste mensen via enkele AI-systemen vragen wat er vandaag gebeurde, wat een wet betekent of welk product zij moeten kopen, loopt hun toegang tot kennis toch door een klein aantal poorten.

Een zoekmachine rangschikt vooral verwijzingen. Een generatief systeem kan daarnaast selecteren, interpreteren, samenvoegen en presenteren. De interface wordt zo ook verteller. Wie die interface en de onderliggende index beheert, bepaalt mede wat wordt gecrawld, hoe vaak bronnen worden ververst, welke metadata blijven bestaan en hoe informatie wordt teruggevonden.

Dit is geen beschuldiging aan één bedrijf. Ook een welwillende aanbieder blijft een enkel controlepunt. Prijzen en voorwaarden kunnen veranderen, een bedrijf kan worden overgenomen of verdwijnen, en een concurrent moet mogelijk dezelfde crawl-, opslag- en indexinfrastructuur opnieuw bouwen.

## De oude ruil met uitgevers verzwakt

Het web kende een onvolmaakte maar begrijpelijke ruil: een zoekmachine mocht pagina's crawlen en stuurde daar bezoekers voor terug. AI kan een bron gebruiken om zelf het antwoord te geven, zonder dat de gebruiker de oorspronkelijke pagina bezoekt.

Cloudflare meet daarom hoeveel pagina's geautomatiseerde systemen ophalen tegenover het aantal bezoeken dat zij terugsturen. De exacte verhoudingen verschillen sterk per bot en meetmethode; verkeer vanuit apps is bovendien niet altijd als verwijzing zichtbaar. Toch wijst de orde van grootte op een structurele verandering: AI-crawlers kunnen veel intensiever ophalen dan zij verkeer terugleveren.[3]

De opkomende ruil kan daardoor verschuiven van:

> gebruik mijn informatie om mensen mij te laten vinden

naar:

> gebruik mijn informatie om de vraag zelf af te handelen

Dat beïnvloedt niet alleen vindbaarheid, maar ook de prikkel om betrouwbare informatie te maken en te onderhouden.

## Scheid kennis van intelligentie

Er is een andere architectuur denkbaar. Uitgevers publiceren informatie met machineleesbare gegevens over maker, datum, versie, relaties en gebruiksvoorwaarden. Cryptografische handtekeningen helpen aantonen wie iets publiceerde en of het veranderde. Open mechanismen maken de informatie vindbaar op betekenis, terwijl verschillende modellen dezelfde kennisobjecten kunnen gebruiken.

Het model levert dan intelligentie; de open laag levert toegang tot kennis. Geen van beide hoeft eigenaar van de ander te zijn.

Die scheiding heeft ook economische gevolgen. Als kennisinfrastructuur, modellen en uitvoering afzonderlijk kunnen worden vervangen en geoptimaliseerd, hoeft groeiend AI-gebruik niet automatisch dezelfde groei van private rekeninfrastructuur te veroorzaken. Het aanvullende artikel *Een AI-zeepbel — of een zeepbel in AI-infrastructuur?* onderzoekt hoeveel terugkerende rekenkracht economische AI-activiteit uiteindelijk nodig kan hebben en wat dat voor de huidige investeringen betekent.

::ModelDisclosure{title="Van private keten naar open kennislaag" description="Bekijk op vier vlakken hoe de gangbare verticale AI-keten verschilt van een architectuur waarin de kennislaag losstaat van modellen en interfaces." open=true}
  ::KnowledgeLayerExplorer{locale="nl"}
  ::
::

DNS is hiervoor een bruikbare analogie, geen technisch ontwerp. DNS standaardiseert hoe namen worden gevonden zonder één browser of website aan te wijzen. Een kennislaag zou vergelijkbaar enkele functies kunnen scheiden:

**kennis → identiteit → opslag → ontdekking → herkomst → vertrouwen**

Veel bouwstenen bestaan al. IPFS laat zien hoe inhoud via een cryptografische identifier herkenbaar kan blijven wanneer kopieën op verschillende machines staan.[4] Kademlia en andere distributed hash tables laten zien hoe objecten zonder centrale index kunnen worden gevonden.[5] C2PA specificeert controleerbare informatie over de herkomst en bewerking van media.[6] Semantische zoektechnieken kunnen inhoud op betekenis vinden in plaats van alleen op exacte woorden.

Onderzoekers combineren delen hiervan. DeSearch onderzocht gedistribueerd crawlen, indexeren, rangschikken en zoeken; DeScan richtte zich op een decentrale en censuurbestendige index.[7][8] Het recente Semord-voorstel onderzoekt een gedistribueerde overlay voor vectorzoeken.[9] Dit zijn onderzoeksprototypes, geen kant-en-klare publieke infrastructuur. Ze laten vooral zien dat het probleem niet eerst op een onbekende wetenschappelijke doorbraak hoeft te wachten.

## De vector is niet de kennis

Een belangrijk ontwerpdetail is dat embeddings geen duurzame identiteit vormen. Dezelfde zin levert bij verschillende embeddingmodellen verschillende vectoren en soms zelfs verschillende aantallen dimensies op.

Daarom moet het kennisobject permanent herkenbaar zijn, niet zijn huidige wiskundige representatie. Rond één document kunnen meerdere zoekindices bestaan: vandaag met model A, morgen met model B, later misschien zonder conventionele embeddings. Zo kan zoektechniek verouderen zonder de kennislaag mee te nemen.

## Relevant, afkomstig en betrouwbaar zijn drie vragen

Een open semantisch netwerk trekt onmiddellijk spam, propaganda en commerciële manipulatie aan. Wie producten verkoopt, wil dicht bij waardevolle begrippen verschijnen. Een digitale handtekening kan aantonen wie een claim publiceerde; zij bewijst niet dat die claim klopt.

Een serieuze architectuur moet daarom minstens drie zaken uit elkaar houden:

- **relevantie:** gaat dit over de gestelde vraag?
- **herkomst:** wie publiceerde deze versie en is zij gewijzigd?
- **vertrouwen:** welk bewijs en welke instituties geven reden om haar te geloven?

Voor vertrouwen bestaan bronnen als citaties, onafhankelijke bevestiging, reputatie, wetenschappelijke methoden en redactionele controle. Waarschijnlijk hoort daar juist geen universeel algoritme boven te staan. Een medische assistent moet andere bewijsregels kunnen toepassen dan een restaurant- of winkelassistent. Die keuze kan losstaan van de gedeelde kennislaag.

## Open betekent niet automatisch blockchain

Cryptografische hashes, sleutels en handtekeningen liggen voor de hand. Daaruit volgt niet dat elk kennisobject op een blockchain moet staan, een token nodig heeft of dat netwerkconsensus waarheid kan bepalen.

Het internet biedt een nuttiger precedent. DNS is hiërarchisch en verdeeld, e-mail is federatief, peer-to-peernetwerken verdelen opslag en certificaatautoriteiten zijn centrale organisaties binnen een open standaard. Het geheel is niet zuiver of elegant, maar geen enkele organisatie bezit alle lagen.

Het belangrijkste ontwerpdoel is daarom niet decentralisatie als ideologie, maar **vervangbaarheid**. Geen organisatie zou voor altijd actief, welwillend en commercieel meewerkend hoeven blijven om machineleesbare kennis toegankelijk te houden.

## Een open laag erft moeilijke politieke vragen

Wie betaalt opslag, actualisering en rekenwerk? Hoe voorkom je dat één partij miljoenen schijnbaar onafhankelijke deelnemers maakt? Hoe verwijder je onrechtmatige of persoonlijke informatie? Hoe werken auteursrecht, intrekkingen en correcties wanneer gegevens worden gerepliceerd? Kan een technisch verspreid systeem economisch opnieuw centraliseren?

Dit zijn geen details; sommige zijn waarschijnlijk moeilijker dan het zoeken zelf. Toch zit er een asymmetrie in het debat. Van een open alternatief verlangen we vaak vooraf een antwoord op elke vraag, terwijl private AI-ketens al worden uitgerold zonder die vragen definitief te hebben opgelost. Hun voorlopige productkeuzes kunnen zo ongemerkt infrastructuur worden.

## Beslis over eigenschappen voordat de standaard vastligt

Infrastructuur wordt moeilijk te veranderen zodra uitgevers, software en verdienmodellen ervan afhankelijk zijn. Wat eerst implementatiedetail was, wordt een instelling en daarna een aanname.

Daarom moeten we nu niet één wereldwijd systeem kiezen, maar wel bepalen welke eigenschappen we willen behouden: open protocollen, interoperabiliteit, controleerbare herkomst, meerdere implementaties en vertrouwensstelsels, deelname zonder toestemming van één AI-bedrijf en de mogelijkheid om een aanbieder te vervangen zonder de kennisinfrastructuur te vervangen.

Het web is zo ontworpen dat geen browser eigenaar hoeft te zijn van het web. Als AI een belangrijke toegang tot menselijke kennis wordt, verdient de kennislaag daaronder dezelfde bescherming.

## Referenties

1. Pew Research Center. *Google users are less likely to click on links when an AI summary appears in the results*. 2025. [Bron bekijken](https://www.pewresearch.org/short-reads/2025/07/22/google-users-are-less-likely-to-click-on-links-when-an-ai-summary-appears-in-the-results/)
2. Pew Research Center. *A majority of Americans say they read AI search summaries*. 2026. [Bron bekijken](https://www.pewresearch.org/chart/a-majority-of-americans-overall-say-they-read-ai-search-summaries-but-adults-65-and-up-are-least-likely/)
3. Cloudflare. *The crawl-to-click gap: AI bots, training and referrals*. 2025. [Bron bekijken](https://blog.cloudflare.com/crawlers-click-ai-bots-training/)
4. IPFS Docs. *Content addressing*. [Bron bekijken](https://docs.ipfs.tech/concepts/content-addressing/)
5. Maymounkov & Mazières. *Kademlia: A Peer-to-peer Information System Based on the XOR Metric*. 2002. [Bron bekijken](https://link.springer.com/content/pdf/10.1007/3-540-45748-8_5)
6. C2PA. *Technical specification*. [Bron bekijken](https://spec.c2pa.org/specifications/specifications/1.0/specs/C2PA_Specification.html)
7. USENIX OSDI '21. *DeSearch*. 2021. [Bron bekijken](https://www.usenix.org/conference/osdi21/presentation/li)
8. TU Delft. *DeScan*. [Bron bekijken](https://repository.tudelft.nl/file/File_765dd13d-e07e-4dcf-b3c5-5dc213375d45)
9. *Semord — Semantic Overlay Routing for Decentralized Vector Search*. Preprint, 2026. [Bron bekijken](https://arxiv.org/abs/2609.25514)
