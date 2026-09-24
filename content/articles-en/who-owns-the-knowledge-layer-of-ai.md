---
title: "Who owns the knowledge layer of AI?"
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

The internet made a remarkable architectural choice. Nobody owns HTTP. Operating a web server requires no permission from Google, Microsoft or Amazon. Anyone can implement a browser or publish a website. Search, cloud computing and social media have become highly concentrated above this foundation, but underneath them lies a more durable collection of open protocols.

If Google disappeared tomorrow, the web would not disappear with it.

With AI, we may be building something different. Increasingly, we do not navigate pages ourselves; we ask a system to retrieve, select, combine and explain information. A journey through sources becomes a conversation with an intermediary.

That change is already visible. In a 2025 analysis of searches by 900 US adults, Pew Research Center found that users clicked a conventional Google result in 15% of visits without an AI summary and 8% when one appeared. A link inside the summary was clicked in only 1% of visits.[1] This is an association, not proof that summaries caused the difference, but it shows that the interface between people and the web is changing. In a 2026 US survey, 60% of adults told Pew they had read such summaries at least sometimes.[2]

## How an AI system handles a question

An AI product is more than the language model that writes its answer. The application first assembles input from the current question, instructions, relevant conversation context and a description of available tools. The language model processes that input and may answer directly, but it can also emit a search request, calculation or other tool call as its next action.

That action is executed outside the language model. Its result returns to the model as new context, allowing another assessment of what is needed. A research question may therefore pass through several model invocations and search or reading actions before the final answer is written. This does not require a complete internal plan to be written out first: the model can select each next action incrementally.

> **question and context → language model → optional tool → new context → language model → answer**

The language model also contains patterns and information captured indirectly in its weights during training. This is not an orderly library in which every statement can be retrieved with its original source or updated separately. Externally retrieved knowledge can be more current and attributable, but only if the surrounding infrastructure preserves its identity, version and provenance. Not every system follows every step for every question, and commercial products often reveal only part of the route.

This essay is therefore not primarily about who owns the language model. It examines who controls the infrastructure through which AI finds, selects, updates and attributes external knowledge. That knowledge layer can remain inside one private product stack, or it could be separated from models and interfaces and developed as open infrastructure.

::ModelDisclosure{title="From question to answer" description="Follow a general question or a current research question through context assembly, model passes, external tools and the final answer."}
  ::AiQuestionFlowExplorer{locale="en"}
  ::
::

The architecture beneath AI has therefore become a public question: **who controls the path from publication to answer?**

## The web can remain open while access closes

Imagine that billions of independent websites still exist twenty years from now. HTTP remains open and anyone can register a domain. Technically, the web is still distributed. Yet if most people ask a few AI systems what happened today, what a law means or which product to buy, access to knowledge still passes through a small number of gateways.

A search engine mainly ranks references. A generative system can also select, interpret, synthesize and present. The interface becomes an interpreter. Whoever controls that interface and its index also decides what is crawled, how often sources are refreshed, which metadata survives and how information is retrieved.

This is not an accusation against one company. Even a benevolent provider remains a single point of control. Prices and terms can change, a company can be acquired or fail, and a competitor may have to rebuild much of the same crawling, storage and indexing infrastructure.

## The old exchange with publishers is weakening

The web developed an imperfect but intelligible exchange: search engines crawled pages and returned visitors. AI can use a source to answer the question itself without the user visiting the original page.

Cloudflare therefore measures how many pages automated systems retrieve for every visit they return. Exact ratios vary considerably by bot and measurement method, while traffic from native apps is not always visible as a referral. Even with those caveats, the scale suggests a structural shift: AI crawlers can retrieve far more than they return as traffic.[3]

The exchange can move from:

> use my information to help people find me

to:

> use my information to handle the question yourself

That affects not only discovery, but also the incentive to produce and maintain reliable information.

## Separate knowledge from intelligence

Another architecture is possible. Publishers could expose information with machine-readable data about authorship, date, version, relationships and usage terms. Cryptographic signatures could help establish who published something and whether it changed. Open discovery mechanisms could find information by meaning, while different models use the same knowledge objects.

The model would provide intelligence; the open layer would provide access to knowledge. Neither would have to own the other.

That separation also has economic consequences. If knowledge infrastructure, models and execution can be replaced and optimized independently, growing AI use need not produce equivalent growth in private compute infrastructure. The companion essay *An AI Bubble—or an AI Infrastructure Bubble?* examines how much recurring computation economically useful AI may ultimately require and what that means for today's investments.

::ModelDisclosure{title="From private stack to open knowledge layer" description="Compare the common vertical AI stack with an architecture in which the knowledge layer is separate from models and interfaces, across four perspectives." open=true}
  ::KnowledgeLayerExplorer{locale="en"}
  ::
::

DNS is a useful analogy, not a technical blueprint. It standardizes how names are resolved without prescribing one browser or website. A knowledge layer could similarly separate several functions:

**knowledge → identity → storage → discovery → provenance → trust**

Many ingredients already exist. IPFS demonstrates how content can retain a cryptographic identity while copies live on different machines.[4] Kademlia and other distributed hash tables show how objects can be located without a central index.[5] C2PA specifies verifiable information about the provenance and editing of media.[6] Semantic retrieval can find material by meaning rather than exact wording.

Researchers have combined parts of this idea. DeSearch explored distributed crawling, indexing, ranking and query processing; DeScan focused on decentralized, censorship-resistant indexing.[7][8] The recent Semord proposal explores a distributed overlay for vector search.[9] These are research prototypes, not ready public infrastructure. They show that the problem need not wait for an unknown scientific breakthrough before work can begin.

## The vector is not the knowledge

Embeddings should not become permanent identity. The same sentence produces different vectors under different embedding models, sometimes with different dimensionality.

The durable object should therefore be the knowledge, not its current mathematical representation. Multiple search indexes can surround one document: model A today, model B tomorrow, and perhaps no conventional embeddings later. Retrieval technology can become obsolete without taking the knowledge layer with it.

## Relevant, attributable and trustworthy are different

An open semantic network would immediately attract spam, propaganda and commercial manipulation. A seller would want its products placed close to valuable concepts. A digital signature can establish who published a claim; it cannot establish that the claim is true.

A serious architecture must therefore separate at least three questions:

- **relevance:** does this concern the question?
- **provenance:** who published this version and was it altered?
- **trust:** which evidence and institutions give us reason to believe it?

Trust can draw on citations, independent corroboration, reputation, scientific methods and editorial review. There may never be one appropriate universal algorithm. A medical assistant should be able to apply different evidence rules from a restaurant or shopping assistant. That choice can remain independent of the shared knowledge layer.

## Open does not automatically mean blockchain

Cryptographic hashes, keys and signatures are obvious tools. It does not follow that each object belongs on a blockchain, needs a token or that network consensus can determine truth.

The internet offers the better precedent. DNS is hierarchical and distributed, email is federated, peer-to-peer systems distribute storage, and certificate authorities are centralized organizations operating within an open standard. The result is not pure or elegant, but no single organization owns every layer.

The more useful objective is therefore not decentralization as an ideology, but **replaceability**. No organization should have to remain alive, benevolent and commercially cooperative forever for machine-readable knowledge to remain accessible.

## An open layer inherits difficult political questions

Who pays for storage, updates and computation? How do we prevent one party from creating millions of apparently independent participants? How can unlawful or personal information be removed? How do copyright, retractions and corrections work when data is replicated? Could a technically distributed system simply centralize economically again?

These are not implementation details; some may be harder than retrieval itself. Yet the debate contains an asymmetry. We often demand that an open alternative answer every question before being taken seriously, while private AI stacks are already being deployed without final answers. Their provisional product decisions can quietly become infrastructure.

## Choose properties before defaults harden

Infrastructure becomes difficult to change once publishers, software and business models depend on it. An implementation detail becomes an institution and eventually an assumption.

We need not choose one global system today, but we should decide which properties to preserve: open protocols, interoperability, verifiable provenance, multiple implementations and trust policies, participation without one AI company's permission, and the ability to replace a provider without replacing the knowledge infrastructure.

The web was designed so that no browser had to own the web. If AI becomes an important interface to human knowledge, the knowledge layer beneath it deserves the same protection.

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
