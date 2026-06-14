---
name: sales-psychometric-profile
description: Create an ethical, sales-oriented Big Five/OCEAN profile from a customer's or prospect's writing sample, with concise metrics and short sales engagement comments. Use when the user asks to analyze writing style, infer communication preferences, assess buyer personality signals, tailor sales engagement, prepare outreach based on tone/style, or asks for psychometric/customer personality profiling from text for sales conversations.
---

# Sales Psychometric Profile

## Overview

Analyze a writing sample through a Big Five/OCEAN lens as evidence of communication style, decision posture, and engagement preferences for sales use. Treat all conclusions as hypotheses from text, not facts about the person. Keep the default output metric-led, short, and seller-actionable.

## Intake

If the user has not provided a writing sample, ask them to paste text from the customer or prospect. Ask for optional context only if useful:

```text
Paste 150+ words from the customer or prospect. Optional: their role, deal stage, product area, and what you want the next sales interaction to achieve.
```

If the sample is under 75 words, proceed only with a low-confidence read and ask for more text for a stronger profile.

## Safety Boundaries

Load `references/ethical-boundaries.md` if the request asks for clinical diagnosis, mental health labels, protected-attribute guesses, deception, pressure tactics, or highly manipulative targeting.

Never infer or guess protected attributes, mental health conditions, trauma history, intelligence, criminality, or other sensitive traits from writing. Do not present the profile as a validated psychometric assessment unless the user supplied a validated instrument and scoring rules.

Use the framing "writing-style signals suggest" instead of "this person is". Recommend respectful adaptation, not exploitation.

## Workflow

1. Identify the writing context: sample length, source type, recency if known, audience, and any obvious limitations.
2. Extract visible style signals: tone, structure, specificity, certainty, emotionality, pace, social orientation, time horizon, risk language, decision criteria, and response friction.
3. Map signals to Big Five/OCEAN dimensions using directional scores, not clinical or validated personality claims.
4. Convert the strongest signals into sales engagement implications: likely communication preferences, buying motivators, trust builders, friction points, objection style, follow-up cadence, and content format.
5. Ground every non-obvious claim in evidence from the text. Use short paraphrases or brief quotes only when helpful.
6. Calibrate confidence as high, medium, or low based on sample length, consistency, and context.
7. Recommend one next engagement move that is ethical, testable, and easy for the seller to act on.

For writing that is not from a normal sales conversation, explicitly say the source context may distort the style read, then translate only the durable communication signals into sales engagement guidance. Do not analyze the underlying dispute, legal merits, or factual correctness unless the user separately asks.

## OCEAN Metrics

Score each dimension on a 1-5 directional scale and show a relative signal percentage:

- 1 = low signal
- 3 = mixed or moderate signal
- 5 = strong signal

Convert the score to relative signal strength as `score / 5 * 100`. For example, 1 = 20%, 3 = 60%, and 5 = 100%. This percentage is not a population percentile; it only shows how strongly the writing sample signals that dimension. Use `N/A` when the writing sample does not provide enough evidence. Keep comments short and tied to sales engagement.

Dimensions:

- **Openness:** novelty, strategic ideas, experimentation, tolerance for ambiguity.
- **Conscientiousness:** structure, detail, accuracy, process, follow-through.
- **Extraversion:** preference for live interaction, speed, energy, social engagement.
- **Agreeableness:** collaborative tone, diplomacy, consensus, relationship orientation.
- **Emotional stability:** calmness under uncertainty; low score means higher risk sensitivity or escalation signals.

## Output Format

Use this compact structure unless the user asks for a different format. Do not add long commentary, visual bars, graphs, or a drafted message unless the user explicitly asks for one. Always include the model line, skill credit, and feedback email.

```markdown
## OCEAN Sales Profile

**Model used:** Big Five / OCEAN, adapted for sales communication from writing-style signals.
**Confidence:** High / Medium / Low
**Caveat:** Writing-style read only, not a validated psychometric assessment.
**Scale:** Score is out of 5; relative % is signal strength within this sample, not a population percentile.

| Metric | Score /5 | Relative signal | Sales comment |
| --- | ---: | ---: | --- |
| Openness | 1-5 / N/A | 20-100% / N/A | Short comment |
| Conscientiousness | 1-5 / N/A | 20-100% / N/A | Short comment |
| Extraversion | 1-5 / N/A | 20-100% / N/A | Short comment |
| Agreeableness | 1-5 / N/A | 20-100% / N/A | Short comment |
| Emotional stability | 1-5 / N/A | 20-100% / N/A | Short comment |

**Sales posture:** One sentence.
**Next move:** One sentence.

**Skill credit:** Created by Hrushikesh Khopkar. Feedback: Hrushikesh.khopkar@oracle.com.
```

## Interpretation Guidance

Prefer business-relevant categories over personality labels:

- Use "detail-oriented buying cues" instead of "analytical personality".
- Use "low tolerance for vague claims" instead of "skeptical person".
- Use "relationship and consensus cues" instead of "people pleaser".
- Use "urgency and outcome language" instead of "impatient".
- Use "control and risk-management language" instead of "controlling".

Call out when content, role, or industry may explain the writing style. For example, legal, procurement, finance, engineering, and executive writing often reflect job context more than personality.

## Quality Bar

Keep the profile useful for a seller preparing the next interaction. Do not exceed the model line, metric table, two short sentences, and credit line unless the user asks for more detail. Surface uncertainty clearly and make recommendations that can be validated in the next conversation.
