---
title: An AI Bubble—or an AI Infrastructure Bubble?
description: Why AI's economic importance, infrastructure returns, distribution of gains and future compute intensity are four separate questions.
date: 2026-09-24
tags: [AI, Economics, Infrastructure, Systems]
translationKey: ai-can-win-while-the-ai-bubble-bursts
articleRelations:
  - type: complements
    article: who-owns-ai-knowledge-layer
featuredImage: /images/artikelen/ai-investment/ai-value-infrastructure-paths.webp
featuredImageAlt: A data centre feeds diverging paths towards economic activity, households, infrastructure and progressively lighter execution forms.
featuredImageFocalPoint: 50% 53%
featuredImageMobileFocalPoint: 50% 53%
summary: Asking whether AI is a bubble wrongly combines several uncertainties. AI can create substantial value while current infrastructure investment still proves excessive, corporate profits rise while consumption demand weakens, and AI penetrates deeper into the economy while recurring compute per unit of economic value falls.
keyPoints:
  - Economically successful AI does not guarantee that every current infrastructure investment earns an adequate return.
  - Labour savings also redistribute income; the macroeconomic outcome depends on re-employment, prices and distribution.
  - AI activity and compute demand need not grow together when tasks move to smaller models, proxies or deterministic software.
  - Efficiency may expand demand, so activity, efficiency and rebound must be modelled together.
plainLanguage:
  title: AI can matter even if some AI investments fail
  intro: Debate often asks whether AI is real or a bubble. Those are not the only possibilities. A technology can become highly useful while companies still invest too much, too early or in the wrong infrastructure.
  sections:
    - heading: Value and investment returns are different
      paragraphs:
        - AI may help firms produce more or operate more cheaply. The gains must still be large and fast enough to repay data centres, chips and energy infrastructure.
    - heading: Who receives the saving?
      paragraphs:
        - When firms spend less on wages, they retain more income. Households may then lose income. New jobs, lower prices and redistribution can offset this, but not automatically.
    - heading: More AI does not automatically mean proportionally more computers
      paragraphs:
        - Some tasks can later run on a smaller model or ordinary software. Efficiency also makes AI cheaper and may induce much more use. Which force grows fastest remains uncertain.
  takeaway: The central question is not only how much AI we will use, but how much value it creates, who receives that value and how much recurring computation remains necessary.
modelComponent: ai-investment-system
modelLimitations:
  - The models explore mechanisms and sensitivity; they do not forecast market value, employment or data-centre demand.
  - Costs, consumption propensities and relative compute units are visible scenario assumptions.
  - Prices, taxes, monetary policy, international trade and new industries are only partly modelled or omitted.
draft: false
---

Debate about the current wave of artificial-intelligence investment is often reduced to one question: is AI a bubble?

That question is too coarse. It treats at least four expectations as though they were the same:

1. AI will become economically important.
2. AI will create enough value, quickly enough, to justify current infrastructure investment.
3. That value will continue to require roughly the type and quantity of compute infrastructure now being built.
4. The gains will be distributed in a way that allows firms to keep selling their growing output.

These expectations are related, but none follows automatically from the previous one. AI can become a highly important technology while particular data centres are built too early, too expensively or for the wrong workload. It can generate exceptional company returns while shifting income in ways that weaken consumption. And it can influence more economic decisions while each decision requires far less compute.

The better question is therefore not whether *AI* is a bubble, but which assumptions underneath the investment case survive.

## Three ways the current investment case can break

### AI creates too little value, or creates it too slowly

In 2025, McKinsey estimated that worldwide data-centre investment through 2030 might reach about $6.7 trillion, including $5.2 trillion for AI-related capacity. Its AI scenarios range from about $3.7 trillion to $7.9 trillion depending on demand, innovation and constraints.[1] The IMF likewise describes the present AI wave as unusually capital-intensive and notes that productivity gains depend on diffusion beyond a narrow group of technology firms.[2] These are estimates of capital requirements and potential productivity transformation, not debt already incurred or a guaranteed market.

Composition matters too. In the central estimate, roughly sixty per cent consists of chips and other IT equipment, a quarter of power and cooling, and fifteen per cent of sites and buildings.[1] An accelerator may become economically obsolete within years while a grid connection, transformer, cooling system or building serves several hardware generations. Treating all investment as one asset with one life is a simplification.

These corrections do not remove the return question. A basic annuity calculation makes the order of magnitude visible:

> **Annual capital cost = invested capital × r ÷ (1 − (1 + r)⁻ⁿ)**

Here **r** is the required annual return and **n** is the asset’s economic life in years. The calculation spreads capital recovery and the required return over that period.

At $5.2 trillion of capital, a ten-year economic life and a ten per cent required return, the annual capital burden is about $846 billion. If forty per cent of revenue is available to support that burden, required annual revenue is about $2.1 trillion.

This is not a forecast. It excludes operating costs, taxes, different asset classes and investment timing. It is a scale check: roughly how much economic return must stand behind a given capital base?

::ModelDisclosure{title="Infrastructure and required returns" description="Change capital, life, return and margin to see how sensitive required revenue is." locale="en"}
  ::AiInvestmentExplorer{view="roi" locale="en"}
  ::
::

The first way the investment thesis can fail is therefore less dramatic than AI being worthless. AI can create real value, but not rapidly or broadly enough for all deployed capital to earn an adequate return at the price paid.

### AI creates substantial value but redistributes income

The second vulnerability arises precisely when AI works extremely well. Automation is attractive to a firm when AI costs plus remaining labour costs are lower than the original wage bill. Production becomes cheaper and profit may rise.

Yet labour cost on one side is household labour income on the other. When some labour income becomes capital income, the share that is spent may change too. Research on consumption generally finds that marginal propensities to consume decline with higher income and wealth, although the magnitude varies substantially with method and circumstance.[3]

An illustrative example reveals the mechanism. Suppose households consume ninety per cent of €1 trillion in labour income. If €200 billion of labour income disappears, €180 billion of consumption disappears with it. If all €200 billion returns as capital income and recipients consume forty per cent, €80 billion returns. The difference is €100 billion.

Reality contains strong counterforces. Workers may find other jobs, complementary skills may become more valuable, prices may fall, profits may be invested, governments may redistribute income and new products may create new demand. Recent IMF research using observed AI activity also estimates substantial potential time savings while stressing that the eventual distribution between workers and firms remains open.[4]

::ModelDisclosure{title="From labour income to capital income" description="See how the same productivity gain behaves under different re-employment, wage and consumption assumptions." locale="en"}
  ::AiInvestmentExplorer{view="distribution" locale="en"}
  ::
::

The second failure mode is not an inevitable demand crisis. It is a feedback often missing from firm-level calculations: productive capacity may grow faster than broadly distributed purchasing power. The relevant question is what happens to the income of people whose present economic tasks AI can perform more cheaply.

### AI succeeds but needs less recurring compute

The third uncertainty reaches the heart of the infrastructure case. A common chain is:

> more AI use → more inference → more compute → more data centres

The weak link lies between economic AI activity and compute demand. A better model is:

> **Total compute demand = useful AI activity × compute per activity**

Investment narratives mostly emphasize the first term. Almost the entire technology sector is simultaneously trying to reduce the second.

::ModelDisclosure{title="AI activity versus compute efficiency" description="Let activity, efficiency and rebound grow against one another. This is the article's central model." open=true locale="en"}
  ::AiInvestmentExplorer{view="compute" locale="en"}
  ::
::

## From generative model to cheap execution

Not every economically useful task requires free-form text generation. Ranking, routing, fraud detection, moderation, classification and selecting an agent's next action are often bounded decisions.

Jev, for example, presents a model that maps unstructured input directly to predefined typed scores and decisions without generating autoregressive output text. Its developer claims 40–200 times lower latency than frontier LLMs on suitable “System One” tasks.[5] This is an early-access vendor claim, not a universal independent benchmark. The architectural distinction still matters: an application that only needs a score or route does not necessarily need to produce prose first.

A second pattern uses an expensive general model to create a cheaper specialist for repeated work. In 2026, Google researchers reported more than one-hundredfold cost and latency reductions for suitable semantic SQL filters by training lightweight proxy models over embeddings. They measured particular query operators and datasets; the result does not apply to every reasoning task.[6]

A third pattern goes further. AI may be used intensively during a software transformation to analyse existing behaviour, identify edge cases, redesign logic, generate tests and compare old and new behaviour. The resulting production system may then be ordinary deterministic software:

> input → explicit code → decision

The productivity improvement remains, while recurring LLM inference may almost disappear.

### The return of the expert system

Classic expert systems encoded knowledge explicitly in rules. Their weakness was knowledge acquisition: human experts had to translate often tacit judgement into a maintainable rule base. Neural networks bypassed part of this problem by learning representations from examples.

Generative models now enable an inverse movement. They can help discover structure, formulate rules, generate implementations and verify deterministic systems. A neural network can therefore help construct a new expert system and then disappear from runtime.

This creates a continuum:

> frontier LLM → smaller model → specialist decision model → proxy → explicit rules → deterministic code

Moving right usually sacrifices generality. In exchange it can reduce cost and latency while increasing determinism, auditability and maintainability. The correct position depends on the task. Open research and conversation remain on the left; stable decisions repeated at scale may move right.

::ModelDisclosure{title="Compiling intelligence" description="Route one hundred tasks across four execution forms and see how much recurring compute remains." locale="en"}
  ::AiInvestmentExplorer{view="compilation" locale="en"}
  ::
::

Software engineering already understands this idea. A compiler performs expensive analysis once and produces something that can run cheaply billions of times. AI enables a comparable architecture:

> expensive analysis → reusable representation → cheap execution

*AI-assisted compilation of intelligence* is used here descriptively, not as an established academic term. The most economically successful use of AI may sometimes be to use AI until the same task no longer needs AI.

::ModelDisclosure{title="Build time versus runtime" description="Compare persistent LLM inference with a higher development spike and nearly deterministic production." locale="en"}
  ::AiInvestmentExplorer{view="build-runtime" locale="en"}
  ::
::

## Why efficiency may still raise total demand

Less compute per task does not automatically mean less compute in total. Cheaper intelligence expands existing uses and makes previously uneconomic uses viable. This is the Jevons counterargument.

If useful AI activity grows one hundredfold while compute per task falls one hundredfold, total demand remains roughly level. If activity grows a thousandfold, total compute still rises tenfold despite the same efficiency improvement.

There is also a recursive loop. AI is used for model architecture, quantization, distillation, kernels, compilers, chip design, synthetic data and software analysis. Research on shorter reasoning chains also shows that generating more reasoning steps does not always improve an answer.[7] Google describes using reinforcement learning through AlphaChip for chip floorplanning.[8] Algorithmic improvement is no longer wholly external to AI:

> better AI → faster AI R&D → more efficient AI → cheaper experimentation → better AI

The timescales collide. A building, grid connection or power plant has an economic horizon measured in decades. Accelerators move in cycles of years. An algorithmic improvement can spread worldwide in months. We are therefore building very long-lived infrastructure for a technology that may itself accelerate the discovery of ways to require less infrastructure per task.

This does not predict falling total compute demand. It means that demand projections must include activity, efficiency, architectural migration and rebound together.

### Geopolitics expands the number of technological paths

Technological dependence is also geopolitical dependence. In 2025 the United States imposed sanctions connected to the International Criminal Court through an executive order, with OFAC designating officials.[9][10] US sanctions can prohibit US persons and companies from supplying transactions or services to designated individuals. The example says nothing here about whether those sanctions were justified. It shows that financial and digital infrastructure can carry policy power.

Governments and institutions may therefore value domestic clouds, chips, payment systems, operating systems, models and standards even when these initially cost more. Parallel ecosystems enlarge the set of architectures being explored. A more efficient discovery in one ecosystem may then change infrastructure economics elsewhere. This does not tell us which country or bloc will win; it only makes one stable global technology path a weak investment assumption.

The knowledge layer need not remain tied to one model, interface or provider either. If different AI systems can use the same open knowledge objects, it is not only execution that becomes more efficient or replaceable: access to knowledge can also be separated from the party composing the answer. The companion essay [*Who Controls AI’s Knowledge Layer?*](/en/articles/who-owns-the-knowledge-layer-of-ai) develops that separation between knowledge infrastructure and intelligence.

## When does capacity become underused?

The three risks can now be combined. Economic activity may grow rapidly while efficiency and migration to cheaper execution paths moderate required capacity. Meanwhile, infrastructure with long lead times may already have been ordered and built.

::ModelDisclosure{title="The infrastructure envelope" description="Compare installed and required capacity. A surplus is called underutilization here, not automatically a bubble." locale="en"}
  ::AiInvestmentExplorer{view="envelope" locale="en"}
  ::
::

Underutilization may be temporary. Capacity may fill later, serve other workloads or provide strategic redundancy. Conversely, a shortage can raise prices and delay adoption. The model therefore offers no verdict; it exposes which combination of activity, efficiency, architecture and construction pace creates a gap.

## Conclusion

AI's economic importance, the profitability of today's AI infrastructure, the distribution of AI-generated income and the future compute intensity of AI are separate questions.

AI can become extraordinarily important while some current infrastructure investment later proves excessive or mistimed. AI can produce excellent firm-level returns while creating macroeconomic distribution questions. And AI can penetrate almost every sector while recurring compute per unit of economic value falls sharply.

Efficiency may also create so much new demand through lower prices that total compute still grows. We therefore cannot infer the outcome from adoption figures alone or from efficiency benchmarks alone. We must ask simultaneously how much value is created, who receives it and which execution architecture ultimately remains.

The trillion-dollar bet is not merely that AI will succeed. It is that AI will succeed in roughly the form we currently expect it to. That assumption deserves testing. Even if it holds, we should ask whether this form of AI, with its demands on resources and distribution of gains, is the one we want to pursue.

## References

1. McKinsey & Company. *The cost of compute: A $7 trillion race to scale data centers*. 2025. [View source](https://www.mckinsey.com/industries/technology-media-and-telecommunications/our-insights/the-cost-of-compute-a-7-trillion-dollar-race-to-scale-data-centers)
2. Marcello Estevão. *AI Can Lift Global Growth*. IMF Finance & Development, 2026. [View source](https://www.imf.org/-/media/files/publications/fandd/article/2026/03/estevo.pdf)
3. Fisher, Johnson, Smeeding and Thompson. *Estimating the Marginal Propensity to Consume Using the Distributions of Income, Consumption and Wealth*. Federal Reserve Bank of Boston, 2019. [View source](https://www.bostonfed.org/-/media/Documents/Workingpapers/PDF/2019/wp1904.pdf)
4. Fan and Nguyen. *Aggregate Gains from AI and Their Distribution: Global Evidence from Usage Data*. IMF Working Paper 26/147, 2026. [View source](https://www.imf.org/-/media/files/publications/wp/2026/english/wpiea2026147.pdf)
5. Jev AI. *Decisions at machine speed*. Vendor information, accessed 2026. [View source](https://jevai.net/)
6. Chung et al. *Achieving 100x Cost & Latency Reduction: Performance Analysis of AI Query Approximation using Lightweight Proxy Models*. Proceedings of the ACM on Management of Data, 2026. [View source](https://research.google/pubs/achieving-100x-cost-latency-reduction-performance-analysis-of-ai-query-approximation-using-lightweight-proxy-models/)
7. Ding et al. *Don't Overthink it. Preferring Shorter Thinking Chains for Improved LLM Reasoning*. arXiv preprint, 2025. [View source](https://arxiv.org/abs/2505.17813)
8. Google DeepMind. *How AlphaChip transformed computer chip design*. 2024. [View source](https://deepmind.google/blog/how-alphachip-transformed-computer-chip-design/)
9. Office of Foreign Assets Control. *Issuance of Executive Order Imposing Sanctions on the International Criminal Court; ICC-related Designation*. 2025. [View source](https://ofac.treasury.gov/recent-actions/20250213)
10. The White House. *Imposing Sanctions on the International Criminal Court*. Executive Order, 2025. [View source](https://www.whitehouse.gov/presidential-actions/2025/02/imposing-sanctions-on-the-international-criminal-court/)
