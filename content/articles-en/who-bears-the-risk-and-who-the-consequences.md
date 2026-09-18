---
title: "Payment: who bears the risk?"
description: A proposal for showing owned money, reservations, credit, delivery and costs as one coherent payment process.
date: 2026-09-17
updated: 2026-09-18
tags: [Economics, Finance, Payments, Consumer protection]
translationKey: risk-and-responsibility
articleRelations:
  - type: complements
    article: consequences-and-accountability
featuredImage: /images/artikelen/risk-and-responsibility/payment-reservation.webp
featuredImageAlt: A buyer safely reserves owned money while a parcel is delivered; the funds reach the shop only after delivery is accepted
featuredImageFocalPoint: center center
featuredImageMobileFocalPoint: center center
summary: "Pay later can combine two different needs: assurance of delivery and credit. Reserving money a buyer already owns, treating only a real shortfall as credit and connecting settlement to the state of the order could make commitments and risks visible sooner."
keyPoints:
  - If the purchase amount already exists, the main need is assurance about delivery and payment; only the shortfall requires credit.
  - Deferred payment can become much more expensive through missed deadlines, interest and collection costs.
  - A shared register must reserve used capacity immediately, or two providers may rely on the same available amount.
  - Rules should follow economic function and risk, not a product name or technology.
  - This proposal requires practical testing and is neither a description of the current system nor personal financial advice.
plainLanguage:
  title: What really happens when you pay later?
  intro: >-
    Imagine ordering shoes online for €500. You want to pay only after knowing that they have arrived. That is understandable. But the same pay-later button can cover two very different situations. You may already own the €500, or you may need to borrow all or part of it. This article proposes making that difference visible and treating payment, delivery and dispute as one process.
  sections:
    - heading: If the money already exists, no loan is needed
      paragraphs:
        - If your account contains €2,000, the bank could temporarily set aside €500. You would still see how much you own, but only €1,500 would remain free to spend. The shop knows the purchase amount is available. The money moves only after delivery has been accepted under the agreed rules.
        - This is a reservation, not a loan. If the order is cancelled or validly disputed, the reservation is released. If you own only €200, that amount can be reserved while the missing €300 is financed. Owned money, reserved money and debt remain separate.
    - heading: The forthcoming rules improve protection against credit risk
      paragraphs:
        - The Dutch bill implementing the revised European Consumer Credit Directive would place pay-later providers under stricter rules and supervision. It includes requirements concerning creditworthiness, information, consent, staff incentives, age verification and help with payment difficulties.
        - At the time of writing this was still a bill. It mainly treats pay later as credit and does not create a separate system that reserves money a person already owns until delivery. The new rules and this article's proposal therefore address related but different problems.
        - To cover future payment methods as well, rules should look at what a construction actually does. If delivery and payment are separated, credit capacity is used or a future obligation is created, the same basic safeguards should apply regardless of name, technology or division across providers.
    - heading: A child may use a parent's payment method
      paragraphs:
        - Age verification for pay later does not prevent a child from spending through a parent's account or stored payment method. The relevant questions here are who gave consent and which reservation or debt then appears on the parent's account.
        - A separate child budget, cumulative limit and renewed consent above that limit may help. The wider issues around microtransactions, virtual currencies and gambling-like mechanisms fall outside this article.
    - heading: Paying late can quickly increase a small amount
      paragraphs:
        - Pay later often appears free while every deadline is met. Missing one can lead to interest, collection costs and eventually a debt collector. The risk therefore lies not only in the amount borrowed, but also in what happens after one missed date.
        - In the Netherlands, consumers must first receive a reminder and fourteen days to pay before statutory collection costs may be charged. Those costs then have a minimum of €40, which can be large compared with a small original bill.
    - heading: A check must immediately change available capacity
      paragraphs:
        - Suppose you may still borrow €500. Two shops almost simultaneously ask whether €400 is available. If both read the same old balance, both may approve, creating €800 of debt despite a €500 limit.
        - A sound system must therefore reserve capacity immediately. After the first €400 reservation, the second shop sees only €100. This shared, current administration is a design proposal rather than an existing Dutch system.
    - heading: Credit cards already reserve credit capacity
      paragraphs:
        - A genuine credit-card payment is normally authorised first and deducted from the available card limit. It is posted later and becomes an outstanding card balance. Cancellation or fraud may release the hold or require a chargeback. A prepaid card is different because it contains money the user already owns.
        - This article extends that familiar principle. Other relevant credit decisions should recognise the same current obligation. The card hold and wider register entry are two views of one amount and must not be counted twice.
    - heading: Delivery, disputes and payment belong to one order
      paragraphs:
        - An order is not complete when money has merely been reserved. The system must also know whether the product was delivered, accepted, returned or disputed. Only then should funds be transferred or released. Clear evidence and appeal rules are needed.
        - >-
          In the interactive model you can set order, delivery, due and payment dates. You can compare the current situation, a simplified representation of the bill and the reservation model. The outcomes are examples, not personal financial advice.
  takeaway: Show separately which money exists, how much is reserved, what debt is created and when delivery leads to payment. Let rules follow actual functions and risks rather than product names.
modelComponent: payment-system
modelLimitations:
  - The thresholds are teaching assumptions, not empirically calibrated credit scores.
  - The transaction model simplifies statutory collection costs. It does not fully model interest, provider-specific charges, income, term, default, returns, privacy, operating costs or legal protection.
  - The CCDII-bill mode is a schematic reading of the proposal as at 17 September 2026, not a forecast of the final Act or secondary legislation.
  - Real deployment would require a legal basis, data minimisation, independent scrutiny and validated domain-specific models.
draft: false
---

Online shopping is commonplace. Products may need to be returned because they do not fit, and buyers sometimes need a refund because an order arrives late or not at all. Sometimes payment is made but nothing is delivered, and recovering the money is difficult or impossible because of fraud.

Pay later is one relatively recent response to online-payment problems. It reduces delivery risk because payment follows receipt of the product. But it also has a second effect: the purchase becomes credit, often carrying substantial costs after a missed deadline rather than ordinary interest. In 2024, roughly one in 29 BNPL transactions led to reminder charges and about one in 88 was transferred to a collection agency. Dutch statutory collection costs then start at €40 — a substantial addition to the small purchases that frequently encounter difficulty.[9][10]

The problem is not limited to reminder charges. Among BNPL users below 35, one in six spent more than ninety days overdrawn during 2024. This group also missed or reversed about ten direct debits on average, with that number increasing among more frequent BNPL users. The AFM stresses that these figures do not prove BNPL caused the financial difficulties: people who were already financially vulnerable may use pay later more often. That association nevertheless makes lending without a current view of someone’s total commitments risky.[1]

This article therefore starts with the functional problem: one payment button can conceal available money, credit, delivery, consent, fraud and costs over time. It then develops a reservation model and compares it with existing payment methods and forthcoming consumer-credit rules. The broader question of who benefits while others carry later social harm is developed in the linked article about consequences and accountability.

The EU has adopted revised consumer-credit rules which still required Dutch implementation at the time of writing. This article compares that bill with the proposed system and should be updated as the legislative process develops.

::RiskResponsibilityLayers{locale="en"}
::

## A safe financial system at personal scale

### One payment button hides several questions

A payment after delivery must keep at least five matters separate. Does the money already exist or is it borrowed? Is it still free to spend or already promised elsewhere? Was the right product delivered and accepted? Who bears the loss after non-delivery or fraud? What happens after a payment deadline is missed?

These questions are not always answered in one coherent view. An account may show €2,000 while €700 of later collections is pending. Several lenders may assess applications separately without seeing the same current headroom. A delivery scan may exist although the wrong parcel arrived. A small bill can grow sharply through interest and collection costs.

The problem is therefore wider than whether a customer can borrow €500. A safe system must handle available money, credit capacity, concurrent purchases, delivery, disputes, fraud, consent and costs over time.

Common payment methods combine those functions in different ways:

::PaymentScenarioComparison{locale="en" mode="overview"}
::

### The proposed solution

#### Connect available funds, delivery and settlement

Suppose shoes cost €500 and the buyer owns €2,000. The bank can set aside €500. The balance remains visible, but only €1,500 is free to spend. The shop knows payment is available and receives the money after delivery has been accepted under the agreed rules. No loan is created, the money cannot be spent twice and it is not transferred before the goods arrive.

If the buyer lacks sufficient funds, the amount to be borrowed is reserved as credit. A mixed transaction is possible as well: €200 of owned funds may be reserved and the missing €300 financed. Owned money, reserved money and debt remain visible as different things.

This is consistent with the AFM's observation that pay later may provide delivery assurance but also creates a loan and a risk of accumulating debts. The AFM therefore encourages payment methods that provide the same assurance without a lending component.[1]

Just as people may currently set an overdraft or daily online-payment limit, the system could allow an overarching personal credit ceiling. Statutory limits or defaults could sit above that setting, informed by age and existing credit rules.

### Implementation

This is a design proposal, not an existing Dutch system. It needs testing and raises questions about privacy, outages, false blocks and exclusion. Its central claim is simpler: a check that does not immediately reserve used capacity can return a correct answer based on obsolete information.

#### A check must change available capacity immediately

Suppose someone has €500 of remaining credit capacity and two shops almost simultaneously request €400. If both read the old balance, both can approve. A shared capacity register should therefore use **CHECK → RESERVE → COMMIT**. After the first reservation, the second shop sees only €100. If the first purchase is cancelled, the capacity is released.

#### Link payment to the state of the order

Delivery is not a simple yes-or-no fact. A useful chain distinguishes states such as *authorised*, *funds reserved*, *shipped*, *delivered*, *accepted*, *disputed* and *settled*. Cancellation or a valid dispute releases the reservation. With possible fraud, the system records that delivery was not accepted, so reserved owned funds need not first become collectible debt.

The shop need not see a buyer's complete finances. A bank or lender can set the limit, restricted infrastructure can maintain reservations, and a separate delivery or dispute process can assess evidence. Execution belongs where the state changes; oversight belongs with a party that does not profit from maximising transaction volume.

### How the solution handles six payment methods

The proposal does not prescribe one payment moment. It gives each method the same building blocks and then selects the appropriate moments for reservation and settlement:

::PaymentScenarioComparison{locale="en" mode="proposal"}
::

The same payment method can therefore have different effects depending on what the buyer owns. The words *deferred* or *instalments* do not by themselves determine how much debt arises; that follows from the part not covered by reserved owned funds.

### The revised Consumer Credit Directive: what the bill does and does not solve

The revised EU Consumer Credit Directive brings services such as BNPL more clearly under credit protection.[2] On 17 September 2026, Dutch implementation was still a bill before the House of Representatives, with debate scheduled for 28 September. Its precise form could therefore still change.[4]

The proposal addresses important problems. Providers would generally come under financial supervision, assess creditworthiness, provide clearer information and record consent. It also addresses remuneration incentives, payment difficulties, disputes and effective age verification.[5] The latter matters because the AFM found almost 600,000 potentially unauthorised BNPL transactions through minors' accounts in 2023.[6]

The bill nevertheless treats pay later mainly as credit. In terms of the scenario comparison, it chiefly improves credit-card, deferred-payment, pay-after-delivery and instalment variants. As currently described, it does not create a separate system that reserves owned money until delivery or the due date. Nor does it create a shared reservation that gives concurrent providers the same remaining capacity or one transaction state connecting delivery, dispute and settlement. BKR records obligations and arrears but does not perform that function.[3] The bill and this design overlap, but they do not solve the same problem.

### Regulate the function, not the product name

A law that lists only BNPL, credit cards or other existing products will inevitably fall behind. The same economic construction may return as a wallet, subscription, token, game balance or combination of providers. The general rule should therefore be that similar functions and risks receive similar treatment, regardless of name, contract form or technology.

For this first part, regulation should engage whenever a professional party reserves money or credit capacity, creates a future payment obligation, makes payment conditional on delivery or gives several parties access to the same financial capacity. Concrete duties can then follow: distinguish owned money, reservations and credit; record obligations immediately; disclose total costs; and provide rules for cancellation, non-delivery, fraud and disputes.

An anti-avoidance rule should examine economic substance. Splitting one service across a shop, wallet, lender and technical platform should not leave nobody responsible for the whole. Legal certainty still requires boundaries: incidental commercial deferral or a brief free hold need not automatically face every rule applicable to long-term consumer credit. Requirements can be proportionate to amount, duration, repetition and foreseeable risk.

This can be implemented in layers. Legislation states technology- and product-neutral principles; secondary rules translate them into measurable minimum requirements; regulators publish current examples; and providers may show that an alternative design achieves at least equivalent protection. Objection and judicial review remain necessary because no open standard can apply itself automatically and without error.

### Connections to existing practice

#### Credit cards show that reservation is practical

For a credit-card payment, the merchant first requests authorisation and the issuer temporarily reduces the available limit. The hold later becomes a posted transaction. Cancellation may release it; non-delivery or fraud may lead to a dispute or chargeback. A prepaid card uses owned money, a card settled monthly creates temporary credit, and a revolving card can carry debt and interest for longer.[8]

This proposal extends that familiar principle: other relevant credit decisions should also recognise the same current obligation. The card hold and wider register entry are two views of one amount, not two debts. The interactive model still simplifies this to owned funds and one general credit pool.

#### Late payment reveals the effect of time

Pay later often appears free while every deadline is met. According to the AFM, providers issued about 6.9 million notices of default in 2024, charged reminder fees on 1.8 million transactions and transferred roughly 600,000 transactions to debt collectors.[9] Statutory collection costs require a reminder and fourteen-day cure period first. They then have a €40 minimum, and interest may also be due.[10]

A safer design shows possible consequences before purchase and sends timely warnings. The AFM found that a simple SMS reminder reduced late payments with charges by about one fifth.[6] The model simplifies collection costs: they apply to the full credit amount under the current situation and bill, but only to the amount actually borrowed under the reservation model.

#### Minors using a parent's payment method

Age verification for credit does not prevent a child from spending through a parent's account or stored payment method. The relevant questions for this model are who gave consent and which reservation or debt appears on the parent's account. A separate child budget, cumulative limit and renewed consent above that limit may make the relationship clearer.[7]

Microtransactions, virtual currencies and gambling-like reward mechanisms form a broader problem that also affects adults. They require a separate analysis of addiction risk, price presentation and manipulative design and are not examined further here.

:::ModelDisclosure{title="Interactive model: from purchase to settlement" description="Add transactions and compare the current situation, a schematic application of the CCDII bill and the reservation model. The model simplifies delivery, credit, fraud, due dates and collection costs." locale="en"}
::RiskResponsibilityExplorer{locale="en" mode="transaction"}
::
:::

### Conclusion

Show which money is free, reserve what has already been promised, call only the shortfall credit, and connect payment to delivery and dispute. The bill strengthens protection around credit but does not build the same reservation and transaction model. Future-proof rules should cover not only named payment products but every construction with the same economic function and risks.

The design must still demonstrate that it improves on simpler alternatives. A pilot should therefore compare whether a shared register prevents missed payments, double commitments and unnecessary borrowing better than ordinary bank holds, existing credit registration and a clearer balance display. Errors, outages, privacy failures and wrongful blocks must count as harms caused by the system itself.

## References

1. Dutch Authority for the Financial Markets. *Buy Now, Pay Later Market Update 2025* (Dutch). 2025. [View source](https://www.afm.nl/~/profmedia/files/rapporten/2025/rapport-marktupdate--bnpl-2025-ned.pdf)
2. European Union. *Directive (EU) 2023/2225 on credit agreements for consumers*. 2023. [View source](https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX:32023L2225)
3. Dutch Credit Registration Foundation. *Credit registration at BKR* (Dutch). [View source](https://www.bkr.nl/media/ssqbz200/kredietregistratie-bij-stichting-bkr.pdf)
4. House of Representatives of the Netherlands. *Implementation Act for the revised Consumer Credit Directive (36 924)* (Dutch). Status accessed 17 September 2026. [View source](https://www.tweedekamer.nl/kamerstukken/wetsvoorstellen/detail?cfg=wetsvoorsteldetails&qry=wetsvoorstel%3A36924)
5. Dutch Ministry of Finance. *Explanatory memorandum to the Implementation Act for the revised Consumer Credit Directive* (Dutch). 2026. [View source](https://zoek.officielebekendmakingen.nl/kst-36924-3.html)
6. Dutch Authority for the Financial Markets. *Action needed to stop minors from using Buy Now, Pay Later*. 2024. [View source](https://www.afm.nl/en/sector/actueel/2024/april/bnpl-marktbeeld-experiment)
7. Government of the Netherlands. *Am I liable for the debts of my minor children?* (Dutch). [View source](https://www.rijksoverheid.nl/vraag-en-antwoord/schulden/schulden-van-kinderen)
8. Government of the Netherlands. *New rules for Buy Now, Pay Later* (Dutch). 2025. [View source](https://www.rijksoverheid.nl/actueel/nieuws/2025/10/31/nieuwe-regels-voor-buy-now-pay-later)
9. Dutch Authority for the Financial Markets. *Buy Now, Pay Later: consumers need additional protection* (Dutch). 2025. [View source](https://www.afm.nl/nl-nl/sector/actueel/2025/juli/pb-marktupdate-BNPL-2025)
10. Government of the Netherlands. *How much do I pay in collection costs?* (Dutch). [View source](https://www.rijksoverheid.nl/vraag-en-antwoord/schulden/hoogte-incassokosten)
