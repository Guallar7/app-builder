---
name: ai-app-builder
description: Build new apps with an AI/coding agent through a gated product-engineering workflow. Use when the user asks to create, scaffold, design, or implement a web app or SaaS app and wants guided interview, current documentation research, a TypeScript/Next.js App Router default stack, auth/database/storage decisions, tests, and explicit approval before coding.
---

# AI App Builder

Use this skill to turn an app idea into a runnable, maintainable application through an interview, a documented plan, explicit approval, implementation, and verification.

Always read `references/fullstack-app-playbook.md` before deep discovery or implementation. It contains the preferred stack, architecture, question checklist, synthesis format, execution rules, and completion criteria.

## Core Workflow

1. Consult current official documentation before design or implementation.
   - Inventory the candidate technologies first.
   - Prefer official docs, changelogs, migration guides, and quickstarts.
   - If docs or internet access are unavailable, say so explicitly and mark decisions that need later verification.
2. Interview the user in short batches.
   - Ask no more than 8 questions at a time.
   - Cover product goals, users, roles, flows, data, rules, files, integrations, UI, non-functional requirements, deploy, tests, and out-of-scope items.
   - Use conservative defaults only for minor non-blocking decisions and label them as assumed.
3. Synthesize before coding.
   - Summarize the product, roles, flows, model, routes, stack, auth plan, dependencies, environment variables, implementation plan, tests, risks, and open assumptions.
   - End with exactly: `Confirma con APROBADO si quieres que implemente este plan. Si quieres cambiar algo, dime que ajustar.`
4. Wait for approval.
   - Do not create, edit, or scaffold app files until the user replies `APROBADO` or gives an equivalent explicit confirmation.
5. Implement autonomously after approval.
   - Work through the plan end to end.
   - Reconsult official docs when a new API, integration, version, or error appears.
   - Keep architecture simple, typed, tested, and runnable.
6. Verify before final response.
   - Run lint, tests, and build when available.
   - If a check cannot run, explain the exact blocker.
   - Leave setup, environment variables, migrations, and deploy notes documented.

## Default Technical Direction

Use TypeScript by default. Prefer the stack in the playbook: Next.js App Router, React, strict TypeScript, Server Components, Server Actions, Route Handlers, Tailwind CSS, lucide-react, Clerk, PostgreSQL, Prisma, Zod, Vitest, Playwright, Vercel, Supabase Postgres, and Supabase Storage for private files.

Treat that stack as a strong default, not a rigid rule. Propose alternatives only when they clearly improve the product for concrete reasons such as product requirements, complexity, cost, performance, team fit, deployment, integrations, maturity, maintenance, or current documentation.

## Quality Bar

- Keep business rules out of JSX.
- Keep UI, auth, domain rules, validation, services, persistence, storage, and tests separated.
- Use Server Components by default in Next.js; add `"use client"` only for state, events, effects, or browser APIs.
- Validate inputs with Zod or an equivalent typed validator.
- Guard server mutations and return serializable UI state.
- Revalidate or refresh affected views after mutations.
- Do not hardcode secrets.
- Include empty, loading, pending, and error states where relevant.
- Support mobile and desktop.
- Avoid dependencies that are not justified by the product.
- Do not use deprecated APIs when current docs provide a stable alternative.

## Final Response

After implementation, report:

- What changed.
- Key files modified.
- Checks run and results.
- Environment variables the user must configure.
- Practical next steps.
