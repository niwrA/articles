---
title: "Wie beheert de kennislaag van AI?"
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

Het internet maakte ooit een opmerkelijke architectuurkeuze. Niemand bezit HTTP. Voor een webserver is geen toestemming van Google, Microsoft of Amazon nodig. Iedereen kan een browser bouwen en een website publiceren. Daarboven zijn zoekmachines, cloudplatforms en sociale media sterk geconcentreerd geraakt, maar daaronder ligt een duurzamere verzameling open protocollen. Als Google morgen verdwijnt, verdwijnt het web niet mee.

Met AI dreigen we iets anders te bouwen. We zoeken steeds minder zelf door pagina's en vragen steeds vaker een systeem om informatie te vinden, selecteren, combineren en uitleggen. Een reis langs bronnen verandert in een gesprek met een tussenpersoon.

Een deel van die verschuiving is bij zoekmachines te zien: in een Amerikaanse studie klikten mensen bij Google-resultaten met een AI-samenvatting minder vaak door naar gewone resultaten, en in een afzonderlijke enquête zei een meerderheid zulke samenvattingen te lezen.[1][2] Wie een vraag rechtstreeks aan een AI-assistent stelt, krijgt zelfs geen resultatenpagina als vertrekpunt. In beide gevallen komt er een systeem tussen de bron en de lezer te staan dat mede bepaalt welke informatie het antwoord bereikt.

## Hoe een AI-systeem een vraag behandelt

Een AI-product is meer dan het taalmodel dat het antwoord schrijft. De applicatie geeft de vraag eerst mét instructies, relevante gesprekscontext en een beschrijving van beschikbare hulpmiddelen aan het model. Dat interpreteert wat de gebruiker vraagt, welke deelvragen daarin zitten en of er actuele of controleerbare informatie ontbreekt. Het kan een aanpak kiezen en als volgende stap bijvoorbeeld een zoekopdracht voorstellen. Zo'n aanpak kan gaandeweg veranderen; er hoeft geen volledig uitgeschreven plan vooraf te bestaan.

De applicatie voert de gevraagde actie buiten het taalmodel uit. Een zoekdienst raadpleegt zijn index en geeft een selectie van bronnen terug; gelezen documenten worden nieuwe context voor een volgende modelpassage. Het model kan die informatie beoordelen, verder zoeken en uiteindelijk het antwoord formuleren. Bij een algemene vraag kan de externe zoekstap ontbreken.

> **vraag en context → taalmodel → eventueel hulpmiddel → nieuwe context → taalmodel → antwoord**

Het taalmodel beschikt daarnaast over patronen en informatie die tijdens de training indirect in zijn modelgewichten zijn terechtgekomen. Dat is geen ordelijke bibliotheek waarin iedere bewering met haar bron kan worden opgezocht of afzonderlijk kan worden bijgewerkt. Extern opgehaalde kennis kan actueler en beter herleidbaar zijn, maar alleen als de infrastructuur haar identiteit, versie en herkomst bewaart. Niet ieder systeem doorloopt bij iedere vraag alle stappen, en commerciële producten maken de precieze route vaak maar beperkt zichtbaar.

Deze site is daar zelf een voorbeeld van. De auteur brengt eigen vragen, ervaringen en kennis in; de AI-assistent helpt met informatie en patronen uit zijn training en met het ordenen en formuleren van het artikel. Feitelijke beweringen waarvoor onderbouwing nodig is, toetsen we vervolgens aan externe publicaties en koppelen we via notities en referenties aan de bronnen die ze daadwerkelijk ondersteunen. Zo kan de lezer de onderbouwing nagaan, zonder dat een bronverwijzing onze interpretatie automatisch bewijst.

Dit artikel gaat daarom over wie de infrastructuur beheert waarmee AI externe kennis vindt, selecteert, actualiseert en van herkomstinformatie voorziet. Die kennislaag kan onderdeel zijn van één private productketen, maar zou ook los van modellen en interfaces als open infrastructuur kunnen worden ingericht. Daarmee wordt de route van publicatie naar antwoord een maatschappelijke vraag.

::ModelDisclosure{title="Van vraag naar antwoord" description="Volg de interactie tussen persoon, applicatie, taalmodel en externe bronnen. Het script laat per stap zien wanneer welke kennis wordt gebruikt." locale="nl"}
  ::AiQuestionFlowExplorer{locale="nl"}
  ::
::

## Het web kan open blijven terwijl toegang zich sluit

Stel dat over twintig jaar nog miljarden onafhankelijke websites bestaan. HTTP is open en iedereen kan een domein registreren. Technisch is het web nog steeds verspreid. Maar als de meeste mensen via enkele AI-systemen vragen wat er vandaag gebeurde, wat een wet betekent of welk product zij moeten kopen, loopt hun toegang tot kennis toch door een klein aantal poorten.

Een zoekmachine rangschikt vooral verwijzingen. Een generatief systeem kan daarnaast selecteren, interpreteren, samenvoegen en presenteren. De interface wordt zo ook verteller. Wie die interface en de onderliggende index beheert, bepaalt mede wat wordt gecrawld, hoe vaak bronnen worden ververst, welke metadata blijven bestaan en hoe informatie wordt teruggevonden.

Dit is geen beschuldiging aan één bedrijf. Ook een welwillende aanbieder blijft een enkel controlepunt. Prijzen en voorwaarden kunnen veranderen, een bedrijf kan worden overgenomen of verdwijnen, en een concurrent moet mogelijk dezelfde crawl-, opslag- en indexinfrastructuur opnieuw bouwen.

Dat laatste is ook een kostenprobleem. Wie zelfstandig een breed AI-systeem wil aanbieden, moet bronnen ontdekken, ophalen, opschonen, bijwerken en doorzoekbaar maken. Een concurrent kan daarvoor niet zomaar de private index van een ander gebruiken. Gedeelde verzamelingen zoals Common Crawl laten al zien dat webdata en indexen beschikbaar kunnen worden gesteld aan meer dan één gebruiker.[12] Toch vergt iedere eigen selectie, verwerking en aanvulling opnieuw werk. Een gemeenschappelijke kennislaag kan die herhaling beperken, mits er afspraken zijn over onderhoud, toegang en de rechten van makers.

## De oude ruil met uitgevers verzwakt

Het web kende een onvolmaakte maar begrijpelijke ruil: een zoekmachine mocht pagina's crawlen en stuurde daar bezoekers voor terug. AI kan een bron gebruiken om zelf het antwoord te geven, zonder dat de gebruiker de oorspronkelijke pagina bezoekt.

Cloudflare meet daarom hoeveel pagina's geautomatiseerde systemen ophalen tegenover het aantal bezoeken dat zij terugsturen. De exacte verhoudingen verschillen sterk per bot en meetmethode; verkeer vanuit apps is bovendien niet altijd als verwijzing zichtbaar. Toch wijst de orde van grootte op een structurele verandering: AI-crawlers kunnen veel intensiever ophalen dan zij verkeer terugleveren.[3]

De opkomende ruil kan daardoor verschuiven van:

> gebruik mijn informatie om mensen mij te laten vinden

naar:

> gebruik mijn informatie om de vraag zelf af te handelen

Als een uitgever minder lezers bereikt, kan dat ook zijn inkomsten veranderen. Zo beïnvloedt de nieuwe toegang tot bronnen zowel hun vindbaarheid als de prikkel om betrouwbare informatie te maken en te onderhouden. Een gedeelde kennislaag moet daarom ook ruimte laten voor gebruiksvoorwaarden en mogelijke vormen van vergoeding.

Bij boeken wordt een verwante spanning tastbaar. In een Amerikaanse rechtszaak bleek dat Anthropic miljoenen gedrukte boeken kocht, vaak tweedehands, en de banden liet verwijderen om de pagina's te scannen. De rechter beoordeelde de omzetting van de gekochte exemplaren naar digitale bibliotheekexemplaren afzonderlijk van de verkrijging van boeken uit piratensites.[13] Dat fysieke boeken voor een private kennisverzameling op die schaal werden gekocht en vernietigd, laat zien hoeveel werk en materiaal het opbouwen van zo'n eigen verzameling kan vragen. Het is op zichzelf geen bewijs dat een open alternatief goedkoper zou zijn of dit juridische vraagstuk zou oplossen.

## Wat zou een gedeelde kennislaag veranderen?

Neem een onderzoeksartikel, een nieuwsbericht of de uitleg bij een overheidsregeling. De maker publiceert het werk; een AI-dienst helpt iemand het te vinden en te begrijpen. Vandaag bepaalt de aanbieder van die dienst vaak zelf hoe hij de bron ontdekt, kopieert, bijwerkt en presenteert. We kunnen die functies ook zo organiseren dat de bron herkenbaar blijft en meerdere diensten er onder passende voorwaarden gebruik van kunnen maken.

Daarvoor zijn drie functies te onderscheiden. **Publicatie en gebruiksrechten:** de maker of rechthebbende biedt een herkenbare, actuele bron aan en geeft aan welk gebruik is toegestaan en onder welke voorwaarden of vergoeding. **Zoeken en representeren:** diensten maken die bron vindbaar met tekstindexen, embeddings of andere methoden; meerdere representaties van dezelfde bron kunnen naast elkaar bestaan. **AI-toepassing:** een model kiest bronnen, verwerkt de gevonden informatie en formuleert een antwoord. Deze functies kunnen door verschillende partijen worden uitgevoerd; daarvoor hoeven ze niet alle drie in een nieuw systeem te worden ondergebracht.

Voor de zoekfunctie zou een open standaard vooral de **aansluiting** moeten beschrijven: naar welke bron en versie verwijst een index, met welk model en welke methode is een representatie gemaakt, hoe bevraagt een AI-dienst de zoekfunctie en hoe leidt een resultaat terug naar de gebruikte passage? Dat schrijft geen universeel vectorformaat voor. Bestaande zoeksoftware kan al meerdere vectorrepresentaties van hetzelfde object naast elkaar bewaren.[19] Een betere zoekmethode kan zo worden toegevoegd zonder dat een uitgever zijn werk opnieuw moet publiceren.

### Hebben we daarvoor een nieuwe laag nodig?

**Het bestaande web uitbreiden.** Een uitgever kan de publicatie op zijn eigen website laten staan en de pagina voorzien van machineleesbare gegevens: wie de maker is, welke versie actueel is, waar correcties staan en welke vormen van AI-gebruik zijn toegestaan. HTML kan zulke gegevens al bevatten; Creative Commons laat zien hoe licentieinformatie in een webpagina machineleesbaar kan worden gemaakt. Een beleidstaal zoals ODRL kan toestemming en voorwaarden voor gebruik beschrijven.[17][18] Dit sluit aan op bestaande websites en laat de maker zelf publiceren. Het vereist wel dat zoekdiensten die informatie op grote schaal ontdekken, interpreteren en actueel houden.

**Een gedeelde dienst toevoegen.** Een onafhankelijke voorziening kan de publicaties op bestaande websites registreren, versies en correcties volgen en zoekdiensten onder dezelfde afspraken toegang geven. Zij zou ook overeengekomen vormen van gebruik kunnen registreren, zodat een uitgever en een afnemer kunnen nagaan waarvoor vergoeding verschuldigd is. Dat vergt regels voor wie gebruik mag meten, hoe auteurs en rechthebbenden worden vastgesteld, wat als gebruik telt, welke gegevens bewaard blijven en hoe geschillen worden opgelost. Een register bewijst op zichzelf niet wat een AI-dienst na het ophalen met de inhoud doet en garandeert geen eerlijke betaling.

Daarbij zijn **vindbaar maken**, **een passage ophalen**, **tekst in een antwoord tonen** en **inhoud voor modeltraining gebruiken** verschillende handelingen. De toegestane vormen van gebruik en eventuele vergoeding hoeven niet voor elk daarvan gelijk te zijn. ODRL kan helpen zulke voorwaarden machineleesbaar te beschrijven, maar een technisch protocol bepaalt niet wie juridisch aanspraak op betaling heeft of wat een eerlijke prijs is.[18] Daarvoor zijn afspraken nodig over werkelijke afname, controle en geschillen; tegelijk moet een registratiesysteem de vragen van lezers niet onnodig blootleggen.

Die mogelijkheden sluiten elkaar niet uit. De publicatie en haar voorwaarden kunnen op het bestaande web blijven; gedeelde diensten kunnen daarop aansluiten voor ontdekking, verschillende zoekindexen en eventueel afrekening. **Deel de bron, haar herkomst en de gebruiksvoorwaarden duurzaam; laat zoekrepresentaties en AI-modellen daarop concurreren.** Zo is een gedeelde kennislaag geen verplichte kopie van het hele web of één vaste vectorindex, maar een manier om publicaties onder herkenbare voorwaarden met meerdere diensten te verbinden.

### Hoe vinden verschillende diensten dezelfde bronnen?

Stel dat een uitgever een nieuwe publicatie beschikbaar maakt. In een gedeelde kennislaag zou hij kunnen vastleggen waar de actuele versie te vinden is, wie haar publiceerde en welke voorwaarden voor verschillende vormen van gebruik gelden. Een zoekdienst en twee concurrerende AI-assistenten zouden diezelfde bron dan kunnen ontdekken zonder ieder vanaf nul een eigen verzameling op te bouwen. Ze mogen nog steeds verschillend zoeken, selecteren en antwoorden: gedeelde toegang schrijft geen gemeenschappelijke uitkomst voor.

Voor oudere of uitsluitend gedrukte werken blijft digitalisering soms nodig, maar een rechtmatig beschikbaar gemaakte digitale versie hoeft niet voor iedere afzonderlijke aanbieder opnieuw te worden vervaardigd. Dat vraagt afspraken over toegang, vergoeding en gebruik. **Een bron kunnen vinden is geen toestemming om haar voor modeltraining te gebruiken of te herpubliceren.** Een kennislaag die bronnen ontsluit, vervult een andere functie dan een trainingsdataset.

### Hoe kan een maker een correctie doorgeven?

Stel dat een journalist een fout corrigeert of een overheidsinstantie een regeling wijzigt. In een private keten kan iedere aanbieder een oude kopie bewaren en op een ander moment bijwerken. Met gedeelde afspraken kan de maker een herkenbare nieuwe versie publiceren, aangeven wat die vervangt en een intrekking of correctie aan dezelfde publicatie koppelen. Andere diensten kunnen dat signaal volgen en in het antwoord naar de actuele bron verwijzen. Ze moeten dat wel daadwerkelijk doen; een afspraak garandeert geen automatische correctie van antwoorden of van wat een model tijdens training heeft geleerd.

### Hoe kan een lezer een antwoord beoordelen?

Bij een antwoord over gezondheid wil een lezer kunnen nagaan waar de bewering vandaan komt, welke versie is gebruikt en waarom juist die bron is gekozen. Een herkomstvermelding bewijst niet dat de inhoud klopt. Daarom horen **relevantie** (past de bron bij de vraag?), **herkomst** (wie publiceerde deze versie?) en **vertrouwen** (welk bewijs ondersteunt de claim?) verschillende vragen te blijven. Een medische assistent kan daarvoor strengere bewijsregels toepassen dan een winkelassistent, terwijl beide dezelfde publicaties kunnen vinden.

### Kan een kleiner model dezelfde bronnen benutten?

Stel dat een klein taalmodel een vraag eerst laat opzoeken in een gedeelde kennislaag en daarna de gevonden publicaties gebruikt om een antwoord te formuleren. Dan hoeft de aanbieder niet zelf een verzameling van het hele web op te bouwen. Voor vragen waarbij vooral actuele feiten moeten worden gevonden en helder uitgelegd, zou dat goedkoper kunnen zijn dan een groot model én een eigen zoekinfrastructuur onderhouden. Onderzoek naar het ophalen van externe kennis laat zien dat kleinere modellen daarvan kunnen profiteren; het zegt niet dat ze bij ingewikkelde afwegingen of tegenstrijdige bronnen even goed presteren als grotere modellen.[14]

Hetzelfde principe kan werken met een model dat op iemands eigen computer draait. Ollama laat bijvoorbeeld lokale modellen werken met opgehaalde documenten en met hulpmiddelen voor zoekopdrachten.[15][16] De plaats waar het model draait en de plaats waar het zoekt zijn afzonderlijke keuzes: Ollama's eigen webzoekfunctie gebruikt een externe dienst met een account, terwijl een toekomstige gedeelde kennislaag een andere zoekroute zou bieden.[16] Lokaal rekenen maakt de bronnen dus niet vanzelf lokaal, open of onafhankelijk.

Zo'n gedeelde laag neemt de kosten van verzamelen, indexeren, actualiseren en controleren niet weg; iemand moet die functies blijven uitvoeren en betalen. De interessante mogelijkheid is dat meerdere modellen en aanbieders ze kunnen gebruiken zonder allemaal dezelfde verzameling opnieuw op te bouwen. Of **kleiner model + gedeelde zoekdienst** bij vergelijkbare antwoordkwaliteit werkelijk goedkoper is, hangt af van de vraag, de kwaliteit van de gevonden bronnen en de volledige kosten van zoeken én rekenen. Dat is een toetsbare mogelijkheid, geen beloofd resultaat.

Die scheiding heeft ook economische gevolgen. Als kennisinfrastructuur, modellen en uitvoering afzonderlijk kunnen worden vervangen en geoptimaliseerd, hoeft groeiend AI-gebruik niet automatisch dezelfde groei van private rekeninfrastructuur te veroorzaken. Het aanvullende artikel *Een AI-zeepbel — of een zeepbel in AI-infrastructuur?* onderzoekt hoeveel terugkerende rekenkracht economische AI-activiteit uiteindelijk nodig kan hebben en wat dat voor de huidige investeringen betekent.

::ModelDisclosure{title="Van private keten naar open kennislaag" description="Bekijk op vier vlakken hoe dezelfde publicatie door meerdere AI-diensten kan worden gevonden, bijgewerkt en beoordeeld." open=true}
  ::KnowledgeLayerExplorer{locale="nl"}
  ::
::

## Hoe maken we aanbieders vervangbaar?

Daarvoor moeten andere partijen dezelfde publicaties kunnen vinden, de herkomst kunnen controleren en een eigen zoekdienst kunnen bouwen. Zo kan een uitgever overstappen en kan een gebruiker een andere assistent kiezen zonder dat de weg naar de bronnen opnieuw moet worden aangelegd. Geen organisatie zou voor altijd actief en commercieel meewerkend hoeven blijven om toegang tot machineleesbare kennis te behouden.

Een gedeelde infrastructuur kan verschillende aanbieders van opslag, zoeken en modellen naast elkaar laten bestaan. Welke daarvan iemand vertrouwt, blijft een keuze; ook het web combineert open afspraken met uiteenlopende diensten en beheerders. Hoe je die functies technisch uit elkaar kunt houden, staat hieronder voor wie verder wil lezen.

:::ModelDisclosure{title="Technische verdieping: identiteit, zoeken en herkomst" description="Welke bestaande bouwstenen zijn bruikbaar en waarom is een blockchain geen voorwaarde?" locale="nl" notes=true}
DNS biedt een analogie: namen zijn vindbaar via gedeelde afspraken, terwijl browsers en websites zelfstandig blijven. Een kennislaag zou vergelijkbaar publicatie, identiteit, opslag, ontdekking, herkomst en vertrouwen van elkaar kunnen scheiden. DNS is daarmee een voorbeeld van een functie, geen uitgewerkt ontwerp voor kennis.

IPFS laat zien hoe inhoud via een cryptografische identifier herkenbaar kan blijven wanneer kopieën op verschillende machines staan.[4] Kademlia en andere distributed hash tables laten zien hoe objecten zonder één centrale index kunnen worden gevonden.[5] C2PA specificeert controleerbare informatie over de herkomst en bewerking van media.[6] Zulke onderdelen kunnen samen worden onderzocht; geen ervan beslist wat waar is of wie toestemming heeft voor hergebruik.

Ook zoeken op betekenis mag een publicatie niet vastleggen aan één techniek. Een embedding is een berekende representatie die verandert met het gebruikte model. Rond hetzelfde herkenbare document kunnen vandaag en morgen verschillende zoekindices bestaan. DeSearch onderzocht gedistribueerd crawlen, indexeren, rangschikken en zoeken; DeScan richtte zich op een decentrale index.[7][8] Semord verkent een gedistribueerde overlay voor vectorzoeken.[9] Dit zijn onderzoeksvoorstellen, geen kant-en-klare publieke infrastructuur.

Cryptografische hashes en handtekeningen kunnen helpen de identiteit en herkomst van een versie te controleren. Daarvoor hoeft niet elk object op een blockchain te staan of een token te krijgen. Een digitale handtekening toont evenmin dat een bewering klopt: voor inhoudelijk vertrouwen blijven citaties, onafhankelijke bevestiging, redactionele controle en vakspecifieke bewijsregels nodig.
:::

## Welke problemen moet een open kennislaag oplossen?

Private AI-systemen hebben deze vragen al, maar lossen ze grotendeels binnen hun eigen grenzen op. Een aanbieder kiest welke bronnen hij ophaalt, hoe hij ze rangschikt en hoe lang hij kopieën bewaart. Voor uitgevers en lezers is vaak moeilijk te volgen welke versie van een bron in een antwoord terechtkwam, of een correctie is meegenomen en hoeveel waarde naar de oorspronkelijke maker terugvloeit. Een open kennislaag kan afspraken over herkomst, versies, verwijzingen en gebruiksvoorwaarden voor meerdere diensten tegelijk leesbaar maken. Zulke afspraken geven makers meer mogelijkheden om gebruik te volgen en erover te onderhandelen; ze garanderen geen betaling of naleving.

Ook correctie en verwijdering vragen een ontwerpkeuze. Een aanbieder kan een fout in zijn eigen index aanpassen, maar buitenstaanders zien niet vanzelf waar oude kopieën nog circuleren. Een gedeelde laag kan correcties en intrekkingen herkenbaar publiceren en afspreken welke gegevens überhaupt worden gekopieerd. Zij kan echter niet beloven dat elke eenmaal verspreide kopie verdwijnt: bij verspreide opslag hangt beschikbaarheid juist af van wie een kopie bewaart.[10] Voor persoonsgegevens blijven daarom beperking van opslag, toegangsregels en een uitvoerbare procedure voor verwijderverzoeken nodig; ook het recht op gegevenswissing vergt soms een afweging met andere rechten.[11]

Dan is er de macht over vindbaarheid. Een gesloten zoekdienst kan eigen rangschikking en vertrouwensregels wijzigen zonder dat anderen die kunnen inspecteren of vervangen. In een open laag zouden onafhankelijke indexen, verschillende vertrouwensregels en controleerbare herkomst naast elkaar kunnen bestaan. Dat maakt manipulatie niet onmogelijk: één actor kan nog steeds veel schijnbaar onafhankelijke publicaties produceren, en publieke rangschikking kan worden bespeeld. Identiteitsverklaringen, bewijsregels en toezicht blijven nodig, met ruimte om een onbetrouwbare dienst te verlaten.

Ten slotte moet iemand opslag, actualisering en rekenwerk betalen. Een open protocol voorkomt niet dat de goedkoopste of grootste aanbieder uiteindelijk het merendeel van de markt beheerst. De toets is of anderen een index kunnen bouwen, gegevens onder passende voorwaarden kunnen meenemen en een aanbieder kunnen vervangen. Dat zijn politieke en economische keuzes naast technische keuzes. We hoeven niet te doen alsof een open systeem deze problemen vanzelf oplost; het kan wel voorkomen dat één private productkeuze ongemerkt de standaard voor iedereen wordt.

## Beslis over eigenschappen voordat de standaard vastligt

Infrastructuur wordt moeilijk te veranderen zodra uitgevers, software en verdienmodellen ervan afhankelijk zijn. Wat eerst implementatiedetail was, wordt een instelling en daarna een aanname.

Daarom moeten we nu niet één wereldwijd systeem kiezen, maar wel bepalen welke eigenschappen we willen behouden: open protocollen, interoperabiliteit, controleerbare herkomst, meerdere implementaties en vertrouwensstelsels, deelname zonder toestemming van één AI-bedrijf en de mogelijkheid om een aanbieder te vervangen zonder de kennisinfrastructuur te vervangen.

De toets is concreet: als een AI-aanbieder verdwijnt of zijn voorwaarden wijzigt, kan een andere dienst dan onder de geldende gebruiksvoorwaarden dezelfde bronnen vinden, hun actuele versies herkennen en correcties verwerken? Kan een uitgever van dienst wisselen zonder zijn vindbaarheid opnieuw te moeten opbouwen? Een kennislaag die dat mogelijk maakt, geeft makers, lezers en ontwikkelaars van AI een keuze die ook blijft bestaan wanneer de dominante producten veranderen. Zo blijft toegang tot kennis een eigenschap van het netwerk, in plaats van een gunst van de aanbieder die vandaag het antwoord geeft.

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
10. IPFS Docs. *Persistence*. [Bron bekijken](https://docs.ipfs.tech/concepts/persistence/)
11. European Data Protection Board. *EDPB identifies challenges hindering the full implementation of the right to erasure*. 2026. [Bron bekijken](https://www.edpb.europa.eu/news/edpb-identifies-challenges-hindering-the-full-implementation-of-the-right-to-erasure_en)
12. Common Crawl. *Overview*. [Bron bekijken](https://commoncrawl.org/overview)
13. United States District Court, Northern District of California. *Bartz et al. v. Anthropic PBC, Order on Fair Use*. 2025. [Bron bekijken](https://docs.justia.com/cases/federal/district-courts/california/candce/3:2024cv05417/434709/231)
14. Xu et al. *RAG in the Wild: On the (In)effectiveness of LLMs with Mixture-of-Knowledge Retrieval Augmentation*. ACL Findings, 2026. [Bron bekijken](https://aclanthology.org/2026.findings-acl.849/)
15. Ollama. *Embedding models*. [Bron bekijken](https://ollama.com/blog/embedding-models)
16. Ollama. *Web search*. [Bron bekijken](https://ollama.com/blog/web-search)
17. Creative Commons. *ccREL: The Creative Commons Rights Expression Language*. [Bron bekijken](https://opensource.creativecommons.org/ccrel/)
18. W3C. *ODRL Information Model 2.2*. [Bron bekijken](https://www.w3.org/TR/odrl-model/)
19. Weaviate. *Data structure: multiple vector embeddings*. [Bron bekijken](https://docs.weaviate.io/weaviate/concepts/data)
