---
title: From AI Query to Societal Value
description: Why energy per query may be the wrong measure—and what responsibility emerges as artificial intelligence becomes more capable.
date: 2026-10-08
updated: 2026-10-09
tags: [AI, Energy, Climate, Society]
translationKey: ai-energy-and-societal-value
articleRelations:
  - type: complements
    article: ai-can-win-while-the-ai-bubble-bursts
featuredImage: /images/artikelen/ai-energy/ai-energy-value-v2.webp
featuredImageAlt: A compact computing core receives electricity and distributes luminous information flows towards grid management, materials research, industry and a green living environment.
featuredImageFocalPoint: 50% 50%
featuredImageMobileFocalPoint: 50% 50%
summary: The familiar claim that an AI query uses ten times as much energy as a Google search relies on outdated and incomparable quantities. A better unit is the completed information task. That does not remove the rapid growth in total data-centre electricity use. It is precisely why efficiency should be assessed alongside the demonstrable social and climate value that AI produces.
keyPoints:
  - Neither a prompt nor a search query is a stable or functionally equivalent unit; model size, answer length, retrieval and task complexity can change energy use substantially.
  - Energy per task can fall rapidly while total electricity use rises because of more users, more demanding applications and rebound effects.
  - Climate benefits should be causal, additional and free from double counting before they are weighed against AI's own footprint.
  - The proposed Climate Leverage Ratio and capability obligation are frameworks for assessment, not established economic laws.
plainLanguage:
  title: Not every AI query costs the same—and energy is only half the question
  intro: A simple search and a substantial AI investigation do not deliver the same result. Energy per query therefore tells only part of the story. We should also consider the complete task, total data-centre demand and the value that AI creates.
  sections:
    - heading: Compare the same task
      paragraphs:
        - A search engine usually offers sources that a person must open and combine. An AI system can perform part of that work, although it may also use far more computation than necessary. Compare routes to a useful answer, not isolated commands.
    - heading: Greater efficiency can still mean more energy
      paragraphs:
        - Models and chips are becoming more efficient per task. That lowers costs and enables new uses. If use expands faster than efficiency improves, total electricity demand still rises.
    - heading: Count only demonstrable benefits
      paragraphs:
        - AI may improve electricity grids, research and industrial processes. Those benefits count only if AI plausibly caused them, they would not otherwise have occurred and the same saving is not claimed more than once.
  takeaway: A useful assessment combines the energy required for a completed task with the verifiable societal value it produces.
aiReviewModel: GPT-6.1 Sol
aiReviewDate: 2026-10-08
modelComponent: ai-energy
modelLimitations:
  - The initial values combine published measurements with visible scenario assumptions; they are not universal energy figures for AI or search.
  - The task model includes operational energy but not the full life cycle of user devices, networks, buildings and hardware.
  - The scale model is a sensitivity exploration, not a forecast of AI activity or data-centre consumption.
  - The Climate Leverage Ratio is a conceptual framework; causality, additionality, overlap and confidence would need to be established empirically.
draft: false
---

One question asked of artificial intelligence is said to consume ten times as much energy as one Google search. The comparison has been repeated often enough to sound like an established fact. It also has precisely the form that travels well: two familiar actions, one clear number and an uncomfortable conclusion. Someone using a chatbot where a search engine would have sufficed appears to consume ten times as much electricity without seeing it.

The comparison is methodologically weak. The Google figure commonly used as its baseline can be traced to a company blog post from 2009, in which Google wrote that a search used about 0.0003 kWh, or 0.3 Wh.[1] Many later comparisons put an estimate of several watt-hours for a generative-AI query beside it. They thereby treat an old average for one search service and a modelled value for another technology as though both had been measured at the same time, over the same system boundary and for the same function.

Both sides have since changed. Search engines no longer display only ten blue links; they use neural ranking, summaries and generative answers. AI systems range from small models running on a phone to lengthy reasoning processes involving web searches, code execution and thousands of generated tokens. A universal energy figure for *an AI query* no more exists than a single fuel-consumption figure for *a journey*.

Updating the number begins with defining the comparison. The scenario explorer below connects three levels: energy per completed information task, total-use growth when efficiency and rebound change together, and potential climate leverage when avoided emissions are attributed conservatively.

::ModelDisclosure{title="AI, energy and societal returns" description="Compare information routes, explore efficiency and rebound over time, and test a Climate Leverage Ratio." locale="en" open=true}
  ::AiEnergyExplorer{locale="en"}
  ::
::

## What has actually been measured?

In 2025 Google published a production measurement for the Gemini app. According to the study, the median text prompt consumed 0.24 Wh, including model accelerators, host machines, idle capacity and data-centre energy overhead.[2] For the same median prompt, Google reported 0.03 grams of CO₂ equivalent and 0.26 millilitres of on-site water consumption. The accompanying technical article emphasises that this is an operational inference measurement in a real production system, rather than a theoretical calculation based on GPU specifications.[3]

This makes the study considerably more useful than many earlier extrapolations, but it does not make the result universal. The reported median reveals little about the distribution: a short text reply, an extended reasoning trace and video generation may differ by orders of magnitude. Training, chip manufacture and data-centre construction are outside the same operational prompt boundary. Google also applies its own market-based accounting to carbon and reports direct cooling water, not necessarily all indirect water effects from electricity generation. Finally, the work was conducted by Google researchers and initially released as a preprint. It is a valuable primary measurement with a clearly bounded scope, not an independent constant of nature.

Remarkably, 0.24 Wh is slightly below Google's own 0.3 Wh search estimate from 2009. This does not establish that AI is now always more efficient than search. It demonstrates how little meaning the old factor of ten retains: the technologies have changed, the denominators are unequal and variation within the category *AI* is enormous.

A 2026 IEA update makes the same point more sharply. Replacing all conventional internet searches with simple AI text queries would, according to the agency, require less than 4 TWh per year—under one per cent of present global data-centre electricity demand. The IEA simultaneously warns that video, extended reasoning and agentic tasks may require hundreds or thousands of times more energy per request than simple text generation.[4] The actual task and its execution, rather than the label *AI*, determine the order of magnitude.

## From command to information need

Even perfectly measured energy per command may use the wrong functional unit. Suppose someone wants to determine which heat pump fits a particular house. A traditional route may involve five searches, eight opened pages, reading specifications and reconciling conflicting information. An AI route may produce one answer after retrieving, comparing and summarising several sources. A third system may first consult a small search index, reuse recurring context from a cache and invoke a larger reasoning model only for the uncertain part.

::AiEnergyVisual{view="task" locale="en"}
::

For a navigational question—*what is the website of the Dutch Tax Administration?*—energy per search is a reasonable measure. A long AI answer would mostly be wasteful. For a synthesis question, energy per completed information need is more informative. All machine operations should then count, as should the number of attempts needed to produce a usable answer. Human search time might also be considered, although it should not casually be converted into kilowatt-hours.

Consider a deliberately illustrative calculation. Five searches at 0.3 Wh would consume 1.5 Wh. One AI answer at 0.8 Wh appears more efficient if it genuinely finds the same sources, communicates the same uncertainty and creates no additional verification work. Conversely, a simple 0.3 Wh search is clearly more economical than a 20 Wh agentic investigation when both merely return the same address. These values are assumptions, not current measurements. The point is that the result can reverse once task completion becomes the denominator.

This also avoids a subtle mistake: a system can save energy by giving a worse answer. Reporting only watt-hours per prompt rewards short replies, failed attempts and shifting work to the user. A useful measure must therefore connect energy to quality—correct completion, source coverage, recovery attempts and task difficulty.

## Up-front costs: training and indexing

The energy cost of digital information processing does not arise only when someone presses Enter. A language model is trained in advance; a search engine has crawled the web, processed documents, built indexes and trained ranking models. Both infrastructures are continuously renewed. *Up front* does not mean *once only*, and *inference* is not the entire system.

Such costs can be amortised across use. Suppose, purely as a thought experiment, that a training run consumes 10 GWh and the resulting model is used meaningfully ten billion times. The allocated average is then 1 Wh per interaction. Across one hundred billion interactions, it falls to 0.1 Wh. The arithmetic is correct, but without reliable figures for training energy, useful life, usage volume and subsequent training cycles it tells us nothing about a particular model. I therefore avoid unsupported energy numbers for recent GPT systems.

Search indexing presents the same difficulty. Crawling and indexing serve many users, but pages change, spam filters are updated and ranking models are retrained. A fair comparison must define at least four boundaries: operational execution, shared up-front costs, physical infrastructure and the electricity mix. Otherwise accounting choices can make the same system appear clean or polluting without changing its engineering.

## Search and AI are converging

The opposition between Google and AI is becoming technically artificial. Conventional search uses models for classification and ranking; generative systems use retrieval to obtain current sources. Small models can route a question, while a larger model is invoked only when necessary. Frequently used documents and long fixed contexts can be cached. Google, for example, reported that explicit context caching could reduce the price of repeated context by 75 per cent. That is a price reduction, not a direct energy measurement, but it points to reuse of computation and memory.[5]

Generation itself is also becoming more efficient. With *speculative decoding*, a smaller model proposes candidate tokens which a larger model verifies in parallel. Google describes the technique as an enduring part of optimising products such as AI Overviews at scale.[6] Search requests are meanwhile becoming more elaborate: a system may generate subqueries, retrieve sources and only then compose an answer.

What emerges is a convergent architecture of indexes, embeddings, caches, small models, large models and selective reasoning. The design question becomes: which combination completes this task at sufficient quality and the lowest total cost?

## The paradox: less energy per task, more energy overall

None of this makes the system-level problem disappear. The IEA estimated worldwide data-centre electricity consumption at about 415 TWh in 2024, roughly 1.5 per cent of global electricity use. Its base case rises to approximately 945 TWh in 2030, just under three per cent.[7] These figures cover all data centres, not AI alone. The IEA does, however, expect accelerated servers—driven primarily by AI—to cause almost half of the net increase.

::AiEnergyVisual{view="paradox" locale="en"}
::

Rapidly improving inference efficiency alongside rapidly rising total consumption is not a contradiction. Google reported a 33-fold decrease in energy per median Gemini prompt between May 2024 and May 2025.[2] Over that same interval, user numbers could increase, answers could lengthen and entirely new applications could emerge. Total energy is roughly the product of activity, computation per application and infrastructure efficiency. If the first two grow faster than the third falls, total demand increases.

This is where the rebound effect appears, related to the paradox described by William Stanley Jevons for more efficient coal use in the nineteenth century. Efficiency reduces the cost per task, which encourages greater use of existing applications and makes new ones economical. Researchers examining this effect in AI therefore caution that efficiency alone does not guarantee a net reduction in environmental pressure.[8] Rebound is not an automatic law under which every saving disappears; its magnitude depends on demand elasticity, prices, capacity constraints and policy.

Jev—the technology discussed in another article—offers a concrete task-level example. It aims to perform certain classification and decision tasks much more cheaply than a generative frontier model. Replacing an expensive model with such specialised systems lowers energy per existing decision. Yet the same low cost may enable classification in millions of places where no model was previously used. The technical saving is real; the effect on the total remains an empirical question.

## Can AI save more climate impact than it causes?

AI is not only an electricity load. It can forecast energy flows, control equipment, narrow scientific search spaces and optimise industrial processes. In electricity systems, improved forecasting can help integrate variable solar and wind generation. In buildings and industry, control may reduce losses and improve maintenance. In materials research, computational selection can reduce the number of candidates that must be synthesised and tested physically.

The IEA modelled a scenario in which existing AI applications are adopted widely. In that scenario they could avoid around 1,400 million tonnes of CO₂ emissions in 2035, approximately five per cent of energy-related emissions in that year.[9] This is a scenario, not an observed saving or a guarantee. It assumes diffusion of applications that still face organisational, financial, regulatory and data barriers. The IEA also stresses that rebound effects may offset part of the gain.[10]

Scientific discovery provides another possible form of leverage. AI can search patterns among molecules, proteins, catalysts or battery materials and prioritise experiments. A breakthrough may have very large consequences, but attribution is difficult: the model, its training data, human researchers, laboratories, funding and subsequent scale-up are all necessary. Assigning the entire avoided impact of a future technology to AI would therefore be unjustified.

We need a measure that takes the possibility of substantial indirect benefit seriously without treating every attractive application as an offset.

## The Climate Leverage Ratio

I therefore propose the **Climate Leverage Ratio** as a conceptual measure:

> **Climate Leverage Ratio = additional avoided climate impact causally attributable to AI ÷ the full climate impact of that AI application**

A ratio above one means that demonstrably avoided impact exceeds impact attributed to the AI system. A ratio of ten would mean that each tonne of CO₂ equivalent in the full AI chain is associated with ten additional avoided tonnes. This is deliberately not an established standard, nor a licence for unlimited growth. Its main purpose is to expose the evidence that a credible claim requires.

First comes **causality**. Was the saving actually caused by the AI system, or would conventional optimisation, higher energy prices or regulation have delivered the same result? Second is **additionality**: only improvement beyond a credible baseline without the application should count. Third, **double counting** must be prevented. A model developer, grid operator and customer cannot each claim the full avoided emissions. Fourth, the denominator must be sufficiently complete: inference, allocated training, hardware, cooling, network losses and, where material, construction and water.

Time matters as well. A research system may consume energy today and lead to scalable technology only a decade later. Expected gains should then be weighted by probability, delay and useful life. Operational grid optimisation, by contrast, may permit a counterfactual baseline every fifteen minutes. The same ratio can guide both cases, but the available evidence differs greatly.

The measure should also permit an uncomfortable answer: some AI applications provide no climate benefit, and need not pretend otherwise. Art, communication or medical diagnosis may have societal value without a positive Climate Leverage Ratio. The ratio assesses one type of leverage, not the complete moral value of a technology.

## From capability to responsibility

Something nevertheless changes when a system becomes more capable. A small text generator can contribute little to grid planning or materials research. A powerful system that writes code, connects scientific literature, helps design experiments and controls infrastructure has more options. Greater capability may create a stronger reason to direct part of it towards shared problems.

I call this the **capability obligation**: the proposed societal responsibility that growth in relevant technical capability should be accompanied by growing responsibility to use that capability demonstrably for public value. It is a philosophical proposition, not a proven economic law. Nor does it imply that every AI company should set climate policy by itself, or that all computation must be assigned to climate research.

The idea is more modest and more demanding. An organisation drawing on scarce electricity, grid capacity, water, capital and highly skilled labour cannot answer every concern merely by saying that each prompt has become more efficient. As the ability to address complex problems expands, it becomes increasingly legitimate to ask what share of that capacity verifiably returns value to society. This could take the form of open scientific models, access for public researchers, grid flexibility, transparent environmental measurements or applications whose additionality is actually evaluated.

The debate can therefore follow three quantities together: the energy required by a completed task, the development of the whole system and the societal value returned for the energy invested in artificial intelligence.

As AI becomes more capable, our responsibility may also grow to apply that capacity to problems affecting society as a whole. Climate change is not the only such problem, but it is a useful test: costs are measurable, potential leverage is large and attractive promises are insufficient. Anyone invoking intelligence should also be willing to let its outcomes count.

## References

1. Google. *Powering a Google Search*. Google Blog, 2009. [View source](https://googleblog.blogspot.com/2009/01/powering-google-search.html)
2. Elsworth et al. *Measuring the Environmental Impact of Delivering AI at Google Scale*. arXiv:2508.15734, 2025. [View paper](https://arxiv.org/abs/2508.15734)
3. Vahdat and Dean. *Measuring the environmental impact of AI inference*. Google Cloud Blog, 2025. [View source](https://cloud.google.com/blog/products/infrastructure/measuring-the-environmental-impact-of-ai-inference)
4. International Energy Agency. *Key Questions on Energy and AI—Executive summary*. 2026. [View source](https://www.iea.org/reports/key-questions-on-energy-and-ai/executive-summary)
5. Kilpatrick. *Gemini 2.5 Models now support implicit caching*. Google Developers Blog, 2025. [View source](https://developers.googleblog.com/gemini-2-5-models-now-support-implicit-caching/)
6. Google Research. *Looking back at speculative decoding*. 2024. [View source](https://research.google/blog/looking-back-at-speculative-decoding/)
7. International Energy Agency. *Energy and AI—Energy demand from AI*. 2025. [View source](https://www.iea.org/reports/energy-and-ai/energy-demand-from-ai)
8. Luccioni, Strubell and Crawford. *From Efficiency Gains to Rebound Effects: The Problem of Jevons’ Paradox in AI’s Polarized Environmental Debate*. arXiv:2501.16548, 2025. [View paper](https://arxiv.org/abs/2501.16548)
9. International Energy Agency. *Energy and AI—Executive summary*. 2025. [View source](https://www.iea.org/reports/energy-and-ai/executive-summary)
10. International Energy Agency. *Energy and AI—AI and climate change*. 2025. [View source](https://www.iea.org/reports/energy-and-ai/ai-and-climate-change)
