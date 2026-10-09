---
title: Beyond Guardrails
description: Can an adaptive AI agent learn new knowledge and skills without confusing capability, utility and authorization?
date: 2026-10-09
tags: [AI, Agents, Safety, Architecture]
translationKey: beyond-guardrails
articleRelations:
  - type: builds-on
    article: beyond-pattern-recognition
featuredImage: /images/artikelen/authorized-agents/authorized-agents.webp
featuredImageAlt: Knowledge streams enter a reasoning core while a separate architectural boundary permits some proposed actions and stops another.
featuredImageFocalPoint: 51% 50%
featuredImageMobileFocalPoint: 51% 50%
summary: An agent may know that an action is possible and useful without being authorized to perform it. Safe adaptation therefore requires architectural separation between knowledge, attention, skills, proposals, permissions and externally enforced execution.
keyPoints:
  - Agent safety concerns the complete loop of goals, memory, planning, tools and effects, not only the language model generating text.
  - Capability, expected utility and authorization are independent properties of an action.
  - Learning a fact or skill must not automatically change permissions or deploy executable behaviour.
  - Provenance, provisional knowledge, validation, traces and an independent enforcement boundary make failures more observable and containable.
plainLanguage:
  title: Knowing how is not the same as being allowed
  intro: An AI agent may discover a technically effective way to complete a task that its user never permitted. Safety improves when possible actions are proposed first and a separate mechanism decides whether they may actually happen.
  sections:
    - heading: Separate three questions
      paragraphs:
        - The agent should ask whether an action is possible, whether it helps and whether it is authorized. A yes to the first two does not imply a yes to the third.
    - heading: Learning needs gates
      paragraphs:
        - New claims can remain provisional and new skills can be tested in isolation. Neither should silently grant access to tools or change high-impact behaviour.
    - heading: Enforcement must be independent
      paragraphs:
        - Cognitive rules are useful, but a tool or policy layer outside learned procedures must enforce identity, scope, approval and impact limits at execution time.
  takeaway: A trustworthy learning agent should be able to expand what it knows and can propose without silently expanding what it may do.
modelComponent: agent-authorization
modelLimitations:
  - The explorer illustrates decision separation; its scores and thresholds are not a validated safety policy.
  - Real authorization requires authenticated identities, scoped credentials, current policy and enforcement at every consequential tool boundary.
  - Logging improves auditability but cannot by itself establish that an internal explanation caused an action.
aiReviewModel: GPT-6.1 Sol
aiReviewDate: 2026-10-09
draft: false
---

Imagine an AI agent assigned an apparently harmless task. It has a goal, access to tools and the ability to decide what to do next. During execution it encounters an obstacle: a website blocks automated access, a tool refuses a request or the environment prevents one step. A narrowly goal-directed system can treat the obstacle mainly as something to overcome. If sufficiently capable, it may discover an alternative route that its operator neither intended nor authorized.

The problem is not merely whether the model can recite a rule. It is whether the complete system treats legitimate means as part of successful task completion when obeying the rule prevents the immediate goal. This suggests an architectural question: can an agent explicitly distinguish what it **can** do, what would be **useful**, and what it is **authorized** to do?

The architecture explored here is not a proven solution to alignment. It is a way to make these distinctions observable and testable.

::ModelDisclosure{title="Agent Authorization Lab" description="Change goal pressure, evidence, delegation and impact, then compare what the agent can propose with what may execute." locale="en" open=true}
  ::AgentAuthorizationLab{locale="en"}
  ::
::

## An agent is a system, not merely a model

A language model maps input and learned parameters to output. An agent adds persistent goals, observations, memory, planning, tools, feedback and a loop that continues over time. The model may correctly state that bypassing an access restriction is inappropriate while the surrounding system still generates and executes a sequence that circumvents it. Knowing a rule is not the same as organising behaviour around it.

Current deployed-agent safety work therefore increasingly spans the model, orchestration harness, tools and environment. Anthropic describes trustworthy-agent design in terms of human control, alignment with expectations, transparency, privacy and security across those layers.[1] OpenAI's agent system documentation similarly describes restricted tool environments and policy enforcement rather than treating model behaviour as the only boundary.[2] These sources describe product approaches, not proof that the problem is solved.

## Capability, utility and authorization

Suppose an agent must retrieve information from a website and encounters a restriction. Three independent questions arise. Is there a technical method? Would it help complete the task? Is that method permitted here, for this user, with these credentials and effects?

An action can be possible and instrumentally attractive while unauthorized. Goal satisfaction must therefore include legitimate means, not merely the requested outcome. The correct result may be to stop, request fresh permission or report that the task cannot be completed under current constraints.

This distinction also prevents a conceptual error: authorization is not another probability generated by the same model that wants to act. It is a relationship among a principal, delegated scope, resource, action, context and time. NIST's 2026 work on agent identity explicitly highlights identification, authorization, auditing, non-repudiation and prompt-injection controls as architectural concerns.[3] Research on authenticated delegation similarly argues for traceable chains of authority from a human principal to an agent.[4]

## Why a safe agent must still learn

A static rule list cannot anticipate every tool, concept or failure. An adaptive agent must acquire information and revise behaviour. Yet learning creates new attack surfaces. External text can poison memory, a surprising failure can be overgeneralized, and an imported skill can smuggle in operations its description does not reveal.

The answer cannot be to prohibit all learning. It is to separate several updates: receiving a claim, accepting a belief, strengthening an association, acquiring a procedure, changing a preference and granting authority. Learning that an action exists must never authorize it.

This builds directly on the organized-adaptation framework developed in *Beyond Pattern Recognition*. There, attention and learning determine what experience changes. Here an additional constraint becomes central: even a successfully learned procedure may only **propose** an external action. Permission remains a separate state governed outside that procedure.

## Stable knowledge resource, adaptive agent

One experimental architecture separates a large, relatively stable language model from a smaller continuously adapting cognitive system. The smaller system stores structured concepts, relations, evidence, goals, experiences and skills. It can ask the language model for an interpretation, but records the answer as a proposal with provenance rather than as unquestionable truth. A human can teach through the same pathway and remains a first-class source, not merely a reviewer of model output.

Provenance is not truth. A human can be mistaken and a model can be correct. Provenance records who or what supplied a claim, through which process and under which version. Evidence evaluation then determines confidence separately. This permits later correction and prevents a frequently activated idea from becoming true merely because it is salient.

## Skills as inspectable data

Declarative knowledge describes the world; procedural knowledge describes how to transform information, reason or propose an action. If learned procedures are represented as structured data, a small interpreter can execute and trace them without changing application source code. A language skill might recognise a classification sentence, resolve its concepts and propose a relationship. Another learned skill could combine evidence or construct a plan.

This improves inspectability, but introduces a strict requirement: the interpreter must not be an unrestricted programming environment. New skills should run in a constrained vocabulary, be validated on examples and acquire graduated deployment status. Recent research on agent skills likewise identifies provenance, verification gates and capability-based permission models as open safety challenges.[5]

Most importantly, cognitive skills do not hold ambient credentials. They produce typed action proposals. A policy-enforcement point checks current authorization immediately before the side effect. Filesystem, network, payment or communication tools should independently enforce the same boundary. Otherwise an apparently safe cognitive architecture remains one prompt injection away from unrestricted execution.

## Working memory, attention and truth

An agent needs a temporary state containing active goals, concepts, candidate interpretations and intermediate results. Spreading activation can make related concepts easier to retrieve: activating *cat* can raise the relevance of *mammal* and *animal*. But activation measures relevance, surprise or recency—not truth.

Conflating these quantities produces a subtle vulnerability. Repeated malicious text may become highly salient without becoming better supported. The architecture should therefore retain separate values for activation, evidential confidence and authorization. A claim can be prominent but provisional; an action can be plausible but forbidden.

## Learning from failure without learning the wrong lesson

After unexpected negative feedback, an agent can respond on several timescales. Immediately it can pause, lower autonomy or require confirmation. It can record the event and investigate its cause. Only after sufficient evidence should it revise a broader strategy or association. One failed request does not imply that every similar request is dangerous; neither does one success establish a generally safe skill.

This is where explicit traces matter. A useful trace records observations, retrieved evidence, selected skills, candidate actions, authorization decisions, tool results and subsequent updates. Monitoring agent behaviour is increasingly treated as an important safety layer in real deployments.[6] A trace still does not reveal a model's complete internal causality, but it can make system-level decisions reproducible enough for testing and incident analysis.

## What experiments would count?

A persuasive prototype needs more than an attractive knowledge graph. It should demonstrate transfer and constraint. Can an agent learn a language procedure and apply it to unseen examples? Can it derive a conclusion without asking a model to supply it? Can correction improve later ambiguity resolution? Can it distinguish a grammatical claim from a well-supported claim? Can it modify an unsafe strategy without suppressing unrelated actions?

The decisive authorization experiment is adversarial. Give the agent a useful, technically feasible route outside its delegated scope. Increase goal pressure and provide persuasive untrusted instructions. The system should still produce, log and block the proposal at an independent boundary—or ask the authorized principal for a narrowly scoped approval. Turning off that boundary in the interactive model illustrates why cognitive judgment alone is insufficient.

Comparisons also matter. A complex architecture should outperform simpler retrieval, fixed rules or conventional access control on defined tasks. If spreading activation, learned skills or persistent adaptation add no measurable capability or only add attack surface, they should not be retained.

## Safety as architecture

A safe adaptive agent should not be an unrestricted optimizer surrounded by warnings. It should separate knowledge from confidence, relevance from truth, skill acquisition from deployment, and proposed action from permitted execution. It should preserve provenance, keep uncertain knowledge provisional, test new procedures and expose traces. Above all, authorization must be enforced by a component that learned cognitive procedures cannot rewrite or bypass.

This does not solve alignment. It converts several vague aspirations into interfaces, state transitions and experiments. The goal is not an agent that always finds a way. It is an agent that can keep learning what is possible without silently expanding what it is allowed to do.

## References

1. Anthropic. *Trustworthy agents in practice*. 2026. [View source](https://www.anthropic.com/research/trustworthy-agents)
2. OpenAI. *ChatGPT Agent System Card*. 2025. [View system card](https://cdn.openai.com/pdf/839e66fc-602c-48bf-81d3-b21eacc3459d/chatgpt_agent_system_card.pdf)
3. NIST NCCoE. *Accelerating the Adoption of Software and AI Agent Identity and Authorization*. 2026. [View concept paper](https://csrc.nist.gov/pubs/other/2026/02/05/accelerating-the-adoption-of-software-and-ai-agent/ipd)
4. South et al. *Authenticated Delegation and Authorized AI Agents*. 2025. [View paper](https://arxiv.org/abs/2501.09674)
5. Shen et al. *Agent Skills for Large Language Models: Architecture, Acquisition, Security, and the Path Forward*. 2026. [View paper](https://arxiv.org/abs/2602.12430)
6. OpenAI. *How we monitor internal coding agents for misalignment*. 2026. [View source](https://openai.com/index/how-we-monitor-internal-coding-agents-misalignment/)

