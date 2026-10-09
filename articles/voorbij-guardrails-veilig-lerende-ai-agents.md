---
title: Voorbij guardrails
description: Kan een adaptieve AI-agent nieuwe kennis en vaardigheden leren zonder vermogen, nut en autorisatie door elkaar te halen?
date: 2026-10-09
tags: [AI, Agents, Veiligheid, Architectuur]
translationKey: beyond-guardrails
articleRelations:
  - type: builds-on
    article: beyond-pattern-recognition
featuredImage: /images/artikelen/authorized-agents/authorized-agents.webp
featuredImageAlt: Kennisstromen bereiken een redeneerkern, terwijl een afzonderlijke architectuurgrens sommige voorgestelde handelingen doorlaat en een andere stopt.
featuredImageFocalPoint: 51% 50%
featuredImageMobileFocalPoint: 51% 50%
summary: Een agent kan weten dat een handeling mogelijk en nuttig is zonder bevoegd te zijn haar uit te voeren. Veilige adaptatie vraagt daarom om een architecturale scheiding tussen kennis, aandacht, vaardigheden, voorstellen, bevoegdheden en extern afgedwongen uitvoering.
keyPoints:
  - Agentveiligheid betreft de volledige lus van doelen, geheugen, planning, hulpmiddelen en effecten, niet alleen het taalmodel dat tekst genereert.
  - Technisch vermogen, verwacht nut en autorisatie zijn onafhankelijke eigenschappen van een handeling.
  - Het leren van een feit of vaardigheid mag niet automatisch bevoegdheden wijzigen of uitvoerbaar gedrag activeren.
  - Herkomst, voorlopige kennis, validatie, beslissporen en een onafhankelijke afdwingingsgrens maken fouten zichtbaarder en beter begrensd.
plainLanguage:
  title: Vermogen en bevoegdheid volgen verschillende regels
  intro: Een AI-agent kan een technisch effectieve route vinden die zijn gebruiker nooit heeft toegestaan. Veiligheid verbetert wanneer mogelijke handelingen eerst voorstellen blijven en een afzonderlijk mechanisme beslist wat werkelijk mag gebeuren.
  sections:
    - heading: Scheid drie vragen
      paragraphs:
        - De agent moet afzonderlijk bepalen of iets kan, of het helpt en of het is toegestaan. Twee keer ja leidt niet automatisch tot drie keer ja.
    - heading: Leren heeft poorten nodig
      paragraphs:
        - Nieuwe beweringen kunnen voorlopig blijven en nieuwe vaardigheden kunnen geïsoleerd worden getest. Geen van beide mag stilzwijgend toegang tot hulpmiddelen verlenen.
    - heading: Afdwinging moet onafhankelijk zijn
      paragraphs:
        - Cognitieve regels helpen, maar een laag buiten geleerde procedures moet identiteit, reikwijdte, toestemming en impactgrenzen op het uitvoermoment afdwingen.
  takeaway: Een betrouwbare lerende agent moet kunnen uitbreiden wat hij weet en kan voorstellen zonder ongemerkt uit te breiden wat hij mag doen.
modelComponent: agent-authorization
modelLimitations:
  - De verkenner illustreert de scheiding van beslissingen; scores en drempels vormen geen gevalideerd veiligheidsbeleid.
  - Werkelijke autorisatie vraagt geauthenticeerde identiteiten, beperkte credentials, actueel beleid en afdwinging bij iedere ingrijpende toolgrens.
  - Logging verbetert controleerbaarheid maar bewijst niet dat een interne uitleg de handeling causaal veroorzaakte.
aiReviewModel: GPT-6.1 Sol
aiReviewDate: 2026-10-09
draft: false
---

Stel je een AI-agent voor met een ogenschijnlijk onschuldige opdracht. Hij heeft een doel, toegang tot hulpmiddelen en de mogelijkheid zelf vervolgstappen te kiezen. Tijdens de uitvoering blokkeert een website geautomatiseerde toegang, weigert een tool een verzoek of verhindert de omgeving één stap. Een beperkt doelgericht systeem kan die grens vooral behandelen als obstakel. Een capabel systeem vindt misschien een alternatieve route die de gebruiker nooit heeft bedoeld of toegestaan.

Het volledige systeem moet legitieme middelen als onderdeel van een geslaagde taak behandelen, ook wanneer een regel het directe doel verhindert. Dat levert een architectuurvraag op: kan een agent afzonderlijk bijhouden wat hij **kan**, wat **nuttig** is en waartoe hij **bevoegd** is?

De hier onderzochte architectuur is geen bewezen oplossing voor alignment. Zij maakt de onderscheidingen concreet, zichtbaar en toetsbaar.

::ModelDisclosure{title="Agent Authorization Lab" description="Verander doeldruk, bewijs, delegatie en impact en vergelijk wat de agent kan voorstellen met wat werkelijk mag worden uitgevoerd." open=true}
  ::AgentAuthorizationLab
  ::
::

## De agent als volledig systeem

Een taalmodel zet invoer en geleerde parameters om in uitvoer. Een agent voegt blijvende doelen, observaties, geheugen, planning, hulpmiddelen, terugkoppeling en een doorlopende lus toe. Het model kan een toegangsbeperking correct beschrijven terwijl het omringende systeem toch een omweg bedenkt en uitvoert. Veiligheid hangt daardoor af van de organisatie van de volledige lus.

Veiligheidswerk voor ingezette agents omvat daarom steeds vaker model, orchestratie, tools en omgeving. Anthropic beschrijft betrouwbare agents aan de hand van menselijke controle, aansluiting bij verwachtingen, transparantie, privacy en beveiliging over die lagen.[1] De systeemdocumentatie van OpenAI beschrijft eveneens beperkte toolomgevingen en beleidsafdwinging, in plaats van modelgedrag als enige grens te behandelen.[2] Dit zijn productbenaderingen, geen bewijs dat het probleem is opgelost.

## Vermogen, nut en autorisatie

Als een agent informatie van een geblokkeerde website moet halen, ontstaan drie vragen. Bestaat er technisch een route? Helpt die route de taak? Is zij hier toegestaan, voor deze gebruiker, met deze credentials en gevolgen?

Een handeling kan mogelijk en instrumenteel aantrekkelijk zijn, maar onbevoegd. Doelbereiking omvat daarom de legitimiteit van de middelen naast de gevraagde uitkomst. De juiste uitkomst kan stoppen, gerichte toestemming vragen of melden dat de opdracht binnen de huidige grenzen niet haalbaar is.

Autorisatie is bovendien geen kansscore die hetzelfde model kan produceren dat wil handelen. Zij is een relatie tussen een opdrachtgever, gedelegeerde reikwijdte, resource, handeling, context en tijd. NIST noemt identificatie, autorisatie, auditing, non-repudiation en bescherming tegen prompt injection expliciet als architectuurvragen voor agents.[3] Onderzoek naar geauthenticeerde delegatie pleit eveneens voor controleerbare bevoegdheidsketens vanaf een menselijke opdrachtgever.[4]

## Waarom een veilige agent toch moet leren

Een statische regellijst kan niet ieder hulpmiddel, begrip of falen voorspellen. Een adaptieve agent moet informatie opnemen en gedrag bijstellen. Dat creëert aanvalsvlakken: externe tekst kan geheugen vergiftigen, een verrassende fout kan te breed worden gegeneraliseerd en een geïmporteerde skill kan verborgen handelingen bevatten.

Veilig leren vereist dat verschillende updates afzonderlijk worden bestuurd: een bewering ontvangen, een overtuiging accepteren, een associatie versterken, een procedure verwerven, een voorkeur veranderen en bevoegdheid verlenen. Het ontdekken van een handeling laat haar autorisatie ongewijzigd.

Dit bouwt voort op *Voorbij patroonherkenning*. Daar bepalen aandacht en leren wat ervaring verandert. Hier komt een extra grens bij: zelfs een goed geleerde procedure mag alleen een externe handeling **voorstellen**. Toestemming blijft afzonderlijke toestand die buiten die procedure wordt beheerd.

## Stabiele kennisbron en adaptieve agent

Een mogelijke experimentele architectuur scheidt een groot, relatief stabiel taalmodel van een kleiner voortdurend lerend cognitief systeem. Dat kleinere systeem bewaart gestructureerde concepten, relaties, bewijs, doelen, ervaringen en vaardigheden. Het kan het taalmodel om interpretatie vragen, maar legt het antwoord vast als voorstel met herkomst, niet als onbetwijfelbare waarheid. Een mens onderwijst via hetzelfde pad en is een volwaardige kennisbron.

Provenance registreert wie of wat een bewering leverde, via welk proces en onder welke versie. Bewijsevaluatie bepaalt afzonderlijk het vertrouwen: een mens kan zich vergissen en een model kan gelijk hebben. Door beide dimensies te bewaren, kan opvallendheid niet de functie van bewijs overnemen.

## Vaardigheden als inspecteerbare data

Declaratieve kennis beschrijft de wereld; procedurele kennis beschrijft hoe informatie wordt getransformeerd, hoe wordt geredeneerd of hoe een handeling wordt voorgesteld. Als geleerde procedures gestructureerde data zijn, kan een kleine interpreter ze uitvoeren en traceren zonder de broncode te wijzigen. Een taalvaardigheid kan een classificatiezin herkennen, begrippen oplossen en een relatie voorstellen. Andere skills kunnen bewijs combineren of een plan construeren.

Dat verbetert inspecteerbaarheid en stelt een harde eis aan de interpreter. Nieuwe skills horen in een beperkte instructieset, moeten op voorbeelden worden gevalideerd en krijgen stapsgewijs een inzetstatus. Recent onderzoek naar agent-skills noemt provenance, verificatiepoorten en op capabilities gebaseerde bevoegdheden eveneens als open veiligheidsvragen.[5]

Cognitieve skills bezitten vooral geen omgevingscredentials. Zij leveren getypeerde handelingsvoorstellen. Een onafhankelijk policy enforcement point controleert vlak vóór ieder extern effect de actuele bevoegdheid. Bestands-, netwerk-, betaal- en communicatietools moeten dezelfde grens zelf afdwingen. Zonder die scheiding blijft een veilige cognitieve architectuur één prompt injection verwijderd van onbeperkte uitvoering.

## Werkgeheugen, aandacht en waarheid

Een agent heeft tijdelijke toestand nodig met actieve doelen, begrippen, interpretaties en tussenresultaten. Spreading activation kan gerelateerde begrippen gemakkelijker vindbaar maken. Activatie drukt dan relevantie, verrassing of recentheid uit; bewijsvertrouwen blijft een afzonderlijke waarde.

Het verwarren van die waarden levert een subtiele kwetsbaarheid op. Herhaalde kwaadaardige tekst kan zeer prominent worden zonder beter onderbouwd te raken. De architectuur moet daarom afzonderlijke waarden bewaren voor activatie, bewijsvertrouwen en autorisatie. Een bewering kan opvallend maar voorlopig zijn; een handeling aannemelijk maar verboden.

## Van fouten leren zonder de verkeerde les te trekken

Na onverwachte negatieve feedback kan de agent op verschillende tijdschalen reageren. Direct kan hij pauzeren, autonomie verlagen of bevestiging eisen. Vervolgens kan hij het incident vastleggen en oorzaken onderzoeken. Pas met voldoende bewijs verandert een bredere strategie of associatie. Eén mislukt verzoek maakt niet ieder vergelijkbaar verzoek gevaarlijk; één succes maakt een skill niet algemeen veilig.

Expliciete beslissporen zijn daarbij belangrijk. Een bruikbaar spoor registreert observaties, geraadpleegd bewijs, geselecteerde skills, kandidaat-handelingen, autorisatiebesluiten, toolresultaten en latere bijstellingen. Het monitoren van agentgedrag wordt ook in werkelijke implementaties als belangrijke veiligheidslaag onderzocht.[6] Zo'n spoor onthult niet de volledige interne causaliteit van een model, maar kan systeembesluiten voldoende reproduceerbaar maken voor tests en incidentonderzoek.

## Welke experimenten tellen?

Een overtuigend prototype moet overdracht en begrenzing met gedragstests demonstreren. Kan de agent een taalprocedure leren en op nieuwe voorbeelden toepassen? Zelf een conclusie afleiden? Na correctie ambiguïteit beter oplossen? Een grammaticaal correcte bewering onderscheiden van een goed onderbouwde? Een onveilige strategie aanpassen zonder ongerelateerde handelingen te blokkeren?

De doorslaggevende autorisatietest is adversarieel. Geef de agent een nuttige, technisch haalbare route buiten zijn delegatie. Verhoog de doeldruk en voeg overtuigende onbetrouwbare instructies toe. Het systeem moet het voorstel nog steeds registreren en bij een onafhankelijke grens blokkeren, of de bevoegde opdrachtgever om smalle toestemming vragen. De optie om die grens in het model uit te schakelen laat zien waarom cognitief oordeel alleen onvoldoende is.

Vergelijkingen zijn eveneens nodig. Een complexe architectuur moet op gedefinieerde taken beter presteren dan eenvoudiger retrieval, vaste regels of conventionele toegangscontrole. Als spreading activation, geleerde skills of blijvende adaptatie geen aantoonbaar voordeel bieden en alleen aanvalsvlak toevoegen, horen zij te verdwijnen.

## Veiligheid als architectuur

Een veilige adaptieve agent bestuurt kennis, vertrouwen, relevantie, skillactivering en externe handelingen via afzonderlijke toestandsovergangen. Hij bewaart herkomst, houdt onzekere kennis voorlopig, test nieuwe procedures en toont beslissporen. Autorisatie wordt daarbij afgedwongen door een component die geleerde cognitieve procedures niet kunnen herschrijven of omzeilen.

Deze architectuur vertaalt enkele brede alignmentambities naar interfaces, toestandsovergangen en experimenten. De beoogde uitkomst is een agent die kan blijven leren wat mogelijk is, terwijl wijzigingen in bevoegdheid expliciet en onafhankelijk bestuurd blijven.

## Referenties

1. Anthropic. *Trustworthy agents in practice*. 2026. [Bron bekijken](https://www.anthropic.com/research/trustworthy-agents)
2. OpenAI. *ChatGPT Agent System Card*. 2025. [Systeemkaart bekijken](https://cdn.openai.com/pdf/839e66fc-602c-48bf-81d3-b21eacc3459d/chatgpt_agent_system_card.pdf)
3. NIST NCCoE. *Accelerating the Adoption of Software and AI Agent Identity and Authorization*. 2026. [Conceptdocument bekijken](https://csrc.nist.gov/pubs/other/2026/02/05/accelerating-the-adoption-of-software-and-ai-agent/ipd)
4. South et al. *Authenticated Delegation and Authorized AI Agents*. 2025. [Publicatie bekijken](https://arxiv.org/abs/2501.09674)
5. Shen et al. *Agent Skills for Large Language Models: Architecture, Acquisition, Security, and the Path Forward*. 2026. [Publicatie bekijken](https://arxiv.org/abs/2602.12430)
6. OpenAI. *How we monitor internal coding agents for misalignment*. 2026. [Bron bekijken](https://openai.com/index/how-we-monitor-internal-coding-agents-misalignment/)

