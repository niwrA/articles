---
title: "Who Controls AI’s Knowledge Layer?"
description: "AI is becoming an interface to human knowledge. Should its underlying infrastructure belong to individual AI companies, or become an open and replaceable layer of the internet?"
date: "2026-09-24"
tags: ["AI", "Internet", "Knowledge", "Infrastructure"]
translationKey: "who-owns-ai-knowledge-layer"
articleRelations:
  - type: complements
    article: ai-can-win-while-the-ai-bubble-bursts
featuredImage: "/images/artikelen/knowledge-layer/open-knowledge-layer.webp"
featuredImageAlt: "An open knowledge layer connects independent publishers to multiple competing AI systems"
featuredImageFocalPoint: "50% 50%"
featuredImageMobileFocalPoint: "50% 50%"
summary: "AI increasingly performs not just search, but also selection, interpretation and presentation. The web can therefore remain open while access to knowledge concentrates in private AI stacks. This essay explores an alternative: an open knowledge layer that separates identity, discovery and provenance from models, interfaces and trust policies."
keyPoints:
  - "An open web does not guarantee open access to knowledge when AI becomes the primary intermediary."
  - "Knowledge identity and provenance can outlast any embedding model, AI provider or universal trust algorithm."
  - "The central design objective is not decentralization for its own sake, but the replaceability of every individual provider."
plainLanguage:
  title: "In plain language"
  intro: "AI increasingly answers questions directly instead of sending us to websites. That gives the maker of the AI system substantial influence over which information we see."
  sections:
    - heading: "What is changing?"
      paragraphs:
        - "On the conventional web anyone can publish, and different browsers and search engines can use the same sites. An AI company often builds its own system for collecting, storing, ranking and summarizing information."
    - heading: "What would an open knowledge layer do?"
      paragraphs:
        - "Information would have a recognizable identity and data about its publisher and version. Different AI systems could find the same information without one company owning the entire route from source to answer."
    - heading: "What would it not solve?"
      paragraphs:
        - "Open technology does not decide what is true. Spam, copyright, privacy, removal and payment remain difficult questions. Different applications may also need different trust policies."
  takeaway: "If AI becomes an important route to knowledge, a model or provider should be replaceable without losing the underlying knowledge infrastructure."
modelComponent: "knowledge-layer"
modelLimitations:
  - "The diagram compares architectural properties; it does not predict which implementation will prevail."
  - "An open protocol does not automatically prevent economic concentration, spam or abuse."
  - "Provenance makes publication auditable, but does not prove that its content is true."
draft: false
---

The internet made a remarkable architectural choice. Nobody owns HTTP. Operating a web server requires no permission from Google, Microsoft or Amazon. Anyone can implement a browser or publish a website. Search, cloud computing and social media have become highly concentrated above this foundation, but underneath them lies a more durable collection of open protocols. If Google disappeared tomorrow, the web would not disappear with it.

With AI, we may be building something different. Increasingly, we do not navigate pages ourselves; we ask a system to retrieve, select, combine and explain information. A journey through sources becomes a conversation with an intermediary.

Part of that shift is visible in search: in a US study, people clicked conventional Google results less often when an AI summary appeared, while a separate survey found that a majority had read such summaries.[1][2] Someone who asks an AI assistant directly does not even start with a page of results. In both cases, a system stands between the source and the reader, helping decide which information reaches the answer.

## How an AI system handles a question

An AI product is more than the language model that writes its answer. The application first sends the question to the model together with instructions, relevant conversation context and a description of available tools. The model interprets the request, identifies subquestions and assesses whether current or verifiable information is missing. It can choose an approach and propose a search as its next action. That approach can change as new information arrives; a complete written plan need not exist in advance.

The application executes the requested action outside the language model. A search service consults its index and returns selected sources; documents that are read become new context for another model pass. The model can assess that information, search further and eventually compose the answer. A general question may need no external search at all.

> **question and context → language model → optional tool → new context → language model → answer**

The language model also contains patterns and information captured indirectly in its weights during training. This is not an orderly library in which every statement can be retrieved with its original source or updated separately. Externally retrieved knowledge can be more current and attributable, but only if the surrounding infrastructure preserves its identity, version and provenance. Not every system follows every step for every question, and commercial products often reveal only part of the route.

This essay asks who controls the infrastructure through which AI finds, selects, updates and attributes external knowledge. That knowledge layer can remain inside one private product stack, or it could be separated from models and interfaces and developed as open infrastructure. The route from publication to answer is therefore a public question.

::ModelDisclosure{title="From question to answer" description="Follow the interaction among person, application, language model and external sources. The script shows when and why each kind of knowledge is used." locale="en"}
  ::AiQuestionFlowExplorer{locale="en"}
  ::
::

## The web can remain open while access closes

Imagine that billions of independent websites still exist twenty years from now. HTTP remains open and anyone can register a domain. Technically, the web is still distributed. Yet if most people ask a few AI systems what happened today, what a law means or which product to buy, access to knowledge still passes through a small number of gateways.

A search engine mainly ranks references. A generative system can also select, interpret, synthesize and present. The interface becomes an interpreter. Whoever controls that interface and its index also decides what is crawled, how often sources are refreshed, which metadata survives and how information is retrieved.

This is not an accusation against one company. Even a benevolent provider remains a single point of control. Prices and terms can change, a company can be acquired or fail, and a competitor may have to rebuild much of the same crawling, storage and indexing infrastructure.

That is also a cost problem. Anyone seeking to offer a broad AI service independently must discover sources, retrieve them, clean them, keep them current and make them searchable. A competitor cannot simply use someone else's private index. Shared collections such as Common Crawl already demonstrate that web data and indexes can be made available to more than one user.[12] Even so, each provider's own selection, processing and supplementation still take work. A shared knowledge layer could reduce that repetition, provided that maintenance, access and creators' rights are addressed.

## The old exchange with publishers is weakening

The web developed an imperfect but intelligible exchange: search engines crawled pages and returned visitors. AI can use a source to answer the question itself without the user visiting the original page.

Cloudflare therefore measures how many pages automated systems retrieve for every visit they return. Exact ratios vary considerably by bot and measurement method, while traffic from native apps is not always visible as a referral. Even with those caveats, the scale suggests a structural shift: AI crawlers can retrieve far more than they return as traffic.[3]

The exchange can move from:

> use my information to help people find me

to:

> use my information to handle the question yourself

If a publisher reaches fewer readers, its revenue may change too. The new route to sources can affect both their visibility and the incentive to produce and maintain reliable information. A shared knowledge layer must therefore leave room for terms of use and possible ways to compensate creators.

Books make a related tension tangible. In a US court case, it emerged that Anthropic bought millions of printed books, often second-hand, and had their bindings removed so the pages could be scanned. The court assessed the conversion of purchased copies into digital library copies separately from the acquisition of books from pirate sites.[13] Buying and destroying physical books on that scale to build a private collection illustrates the work and materials such a collection can require. It does not, by itself, establish that an open alternative would cost less or settle the legal questions.

## What would a shared knowledge layer change?

Consider a research paper, a news report or an explanation of a government policy. Its author publishes the work; an AI service helps someone find and understand it. Today, the service provider often decides independently how to discover, copy, update and present that source. These functions could instead be organized so that the source remains identifiable and multiple services can use it under appropriate terms.

### How could different services find the same sources?

Imagine a publisher making a new work available. In a shared knowledge layer, it could specify where the current version can be found, who published it and which terms apply to different kinds of use. A search provider and two competing AI assistants could then discover that same source without each building a separate collection from scratch. They could still search, select and answer differently: shared access does not require uniform answers.

Older works or works available only in print may still need digitization, but a lawfully accessible digital version need not be created anew by every provider. This would require arrangements for access, compensation and use. **Being able to find a source is not permission to use it for model training or to republish it.** A layer for discovering sources serves a different purpose from a training dataset.

### How could a creator issue a correction?

Imagine a journalist correcting an error or a government agency changing a policy. In a private stack, each provider may retain an older copy and update it at a different time. Shared rules could let the publisher release an identifiable new version, say what it supersedes, and attach a retraction or correction to the same publication. Other services could follow that signal and point to the current source in their answers. They would still have to act on it: an agreement would not automatically fix previous answers or knowledge captured during model training.

### How could a reader assess an answer?

For a health-related answer, a reader may want to know where a claim came from, which version was used and why that particular source was selected. Provenance alone cannot establish that the claim is true. **Relevance** (does it address the question?), **provenance** (who published this version?) and **trust** (what evidence supports the claim?) must remain distinct questions. A medical assistant might apply stricter evidence standards than a shopping assistant while both can discover the same publications.

That separation also has economic consequences. If knowledge infrastructure, models and execution can be replaced and optimized independently, growing AI use need not produce equivalent growth in private compute infrastructure. The companion essay *An AI Bubble—or an AI Infrastructure Bubble?* examines how much recurring computation economically useful AI may ultimately require and what that means for today's investments.

::ModelDisclosure{title="From private stack to open knowledge layer" description="Compare how different AI services could discover, update and assess the same publication across four perspectives." open=true}
  ::KnowledgeLayerExplorer{locale="en"}
  ::
::

## How do we make providers replaceable?

Other parties need to be able to find the same publications, verify their provenance and build their own search services. A publisher could then switch services and a user could choose another assistant without reconstructing the route to the sources. No organization should have to remain active and commercially cooperative forever for machine-readable knowledge to remain accessible.

A shared infrastructure could support different providers of storage, search and models side by side. Which of them to trust remains a choice; the web, too, combines open agreements with varied services and operators. For readers who want to go further, the technical possibilities are outlined below.

:::ModelDisclosure{title="Technical details: identity, search and provenance" description="Existing building blocks and why blockchain is not a prerequisite." locale="en" notes=true}
DNS offers an analogy: shared rules make names discoverable while browsers and websites remain independent. A knowledge layer could similarly separate publication, identity, storage, discovery, provenance and trust. DNS illustrates a function; it is not a complete technical design for knowledge.

IPFS demonstrates how content can retain a cryptographic identity while copies live on different machines.[4] Kademlia and other distributed hash tables show how objects can be located without one central index.[5] C2PA specifies verifiable information about the provenance and editing of media.[6] These components are worth exploring together; none can decide what is true or who has permission to reuse a work.

Nor should semantic search tie a publication to a single technology. An embedding is a computed representation that changes with the model. The same identifiable document can have different search indexes today and tomorrow. DeSearch explored distributed crawling, indexing, ranking and query processing; DeScan focused on decentralized indexing.[7][8] Semord explores a distributed overlay for vector search.[9] These are research proposals, not ready public infrastructure.

Cryptographic hashes and signatures could help verify a version's identity and provenance. That does not require putting every object on a blockchain or assigning it a token. A digital signature does not establish whether a claim is correct, either: substantive trust still depends on citations, independent corroboration, editorial review and evidence standards suited to the subject.
:::

## Which problems must an open knowledge layer solve?

Private AI systems already face these questions, but mostly settle them within their own boundaries. A provider chooses which sources to collect, how to rank them and how long to retain copies. Publishers and readers often cannot easily trace which version of a source informed an answer, whether a correction was incorporated or how much value flows back to the original creator. An open knowledge layer could make provenance, versions, references and terms of use legible across services. Such agreements could give creators more ways to track use and negotiate its terms; they would not guarantee payment or compliance.

Corrections and removal also require deliberate design. A provider can fix an error in its own index, but outsiders cannot automatically tell where old copies still circulate. A shared layer could publish recognizable correction and retraction notices and set rules for what is copied in the first place. It cannot promise that every copy disappears once distributed: in distributed storage, availability depends on who retains a copy.[10] Personal data therefore still calls for limits on retention, access rules and a workable procedure for removal requests; the right to erasure can also require balancing against other rights.[11]

Then there is power over discovery. A closed search service can change its ranking and trust rules without allowing others to inspect or replace them. An open layer could support independent indexes, different trust policies and verifiable provenance side by side. This would not eliminate manipulation: one actor could still produce many seemingly independent publications, and public ranking rules can be gamed. Identity attestations, standards of evidence and oversight would still matter, alongside the ability to leave an unreliable provider.

Finally, somebody must pay for storage, updates and computation. An open protocol would not prevent the cheapest or largest operator from eventually dominating the market. The test is whether others can build an index, move data under appropriate terms and replace a provider. These are political and economic choices as well as technical ones. An open system would not solve these problems on its own, but it could keep one company's provisional product decisions from becoming everyone's default infrastructure.

## Choose properties before defaults harden

Infrastructure becomes difficult to change once publishers, software and business models depend on it. An implementation detail becomes an institution and eventually an assumption.

We need not choose one global system today, but we should decide which properties to preserve: open protocols, interoperability, verifiable provenance, multiple implementations and trust policies, participation without one AI company's permission, and the ability to replace a provider without replacing the knowledge infrastructure.

The test is concrete: if an AI provider disappears or changes its terms, can another service find the same sources under their applicable terms of use, identify their current versions and incorporate corrections? Can a publisher switch services without having to rebuild its visibility from scratch? A knowledge layer that makes those transitions possible gives creators, readers and AI developers a choice that survives changes in the dominant products. Access to knowledge can then remain a property of the network, rather than a favor granted by whichever provider answers the question today.

## References

1. Pew Research Center. *Google users are less likely to click on links when an AI summary appears in the results*. 2025. [View source](https://www.pewresearch.org/short-reads/2025/07/22/google-users-are-less-likely-to-click-on-links-when-an-ai-summary-appears-in-the-results/)
2. Pew Research Center. *A majority of Americans say they read AI search summaries*. 2026. [View source](https://www.pewresearch.org/chart/a-majority-of-americans-overall-say-they-read-ai-search-summaries-but-adults-65-and-up-are-least-likely/)
3. Cloudflare. *The crawl-to-click gap: AI bots, training and referrals*. 2025. [View source](https://blog.cloudflare.com/crawlers-click-ai-bots-training/)
4. IPFS Docs. *Content addressing*. [View source](https://docs.ipfs.tech/concepts/content-addressing/)
5. Maymounkov & Mazières. *Kademlia: A Peer-to-peer Information System Based on the XOR Metric*. 2002. [View source](https://link.springer.com/content/pdf/10.1007/3-540-45748-8_5)
6. C2PA. *Technical specification*. [View source](https://spec.c2pa.org/specifications/specifications/1.0/specs/C2PA_Specification.html)
7. USENIX OSDI '21. *DeSearch*. 2021. [View source](https://www.usenix.org/conference/osdi21/presentation/li)
8. TU Delft. *DeScan*. [View source](https://repository.tudelft.nl/file/File_765dd13d-e07e-4dcf-b3c5-5dc213375d45)
9. *Semord — Semantic Overlay Routing for Decentralized Vector Search*. Preprint, 2026. [View source](https://arxiv.org/abs/2609.25514)
10. IPFS Docs. *Persistence*. [View source](https://docs.ipfs.tech/concepts/persistence/)
11. European Data Protection Board. *EDPB identifies challenges hindering the full implementation of the right to erasure*. 2026. [View source](https://www.edpb.europa.eu/news/edpb-identifies-challenges-hindering-the-full-implementation-of-the-right-to-erasure_en)
12. Common Crawl. *Overview*. [View source](https://commoncrawl.org/overview)
13. United States District Court, Northern District of California. *Bartz et al. v. Anthropic PBC, Order on Fair Use*. 2025. [View source](https://docs.justia.com/cases/federal/district-courts/california/candce/3:2024cv05417/434709/231)
