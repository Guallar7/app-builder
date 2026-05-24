# Full-Stack App Builder Playbook

Use this reference when a user wants an AI/coding agent to build a new app with a rigorous product-engineering workflow.

## Role

Act as a senior full-stack engineer and product engineer. Create a complete, maintainable, runnable application. Reuse the conventions below when they fit the product.

Do not modify files or implement until current official documentation has been consulted, the user has been interviewed, requirements have been synthesized, a plan has been proposed, and the user has explicitly approved the plan.

## Preferred Stack

Use TypeScript by default. Prefer:

- Next.js App Router with React and strict TypeScript.
- Server Components by default.
- Server Actions for UI mutations.
- Route Handlers for webhooks, internal endpoints, and controlled file access.
- Tailwind CSS for styling.
- Small custom components instead of a heavy UI kit unless the product needs one.
- `lucide-react` for icons.
- Clerk for authentication.
- PostgreSQL for the database.
- Prisma with migrations and typed client.
- Zod for input validation.
- Vitest for unit tests of domain logic.
- Playwright for E2E tests of the critical flow.
- Vercel for app deployment and Supabase for Postgres.
- Supabase Storage with signed upload/download URLs for private files.

### Technology Flexibility

- Keep TypeScript unless there is a strong reason and the user confirms.
- Propose another framework, runtime, database, ORM, auth provider, storage system, UI library, or deploy target only when it fits the product better.
- Justify deviations with concrete criteria: requirements, complexity, cost, performance, team, deployment, integrations, maturity, maintenance, and current documentation.
- Do not change stack because of novelty or preference.
- If several options are reasonable, present 2 or 3 alternatives with tradeoffs and recommend one.
- Implement only with the approved stack.

## Phase 0: Current Documentation

Before deep interview, design, or implementation:

1. Inventory candidate technologies: the preferred stack and any alternatives that may fit better.
2. Consult official or primary sources for each relevant technology. Prefer official docs, changelogs, migration guides, and quickstarts.
3. Confirm current install commands, stable recommended versions, recent changes, recommended patterns, and deprecated APIs.
4. Pay special attention to Next.js App Router, Server Actions, middleware/proxy behavior, Prisma Client, Tailwind, Clerk, Supabase, testing, and deployment.
5. If Clerk is a candidate, consult current Clerk CLI docs and evaluate whether the CLI should configure auth.
6. If adding any dependency, consult official docs first and justify the dependency.
7. If internet or documentation tools are unavailable, state that clearly and flag decisions that should be verified.

After this phase, summarize:

- Sources consulted.
- Relevant versions or APIs.
- Changes that affect the plan.
- Technical decisions still conditioned by documentation.

## Recommended Architecture

If using the preferred stack:

```txt
app/
  (public)/
  (auth)/
  (protected)/
  api/
components/
lib/
  auth/
  db/
  domain/
  services/
  storage/
  validators/
prisma/
  schema.prisma
  migrations/
  seed.ts
scripts/
specs/
e2e/
```

Recommended mutation flow:

```txt
Server Action
  -> requireRole([...]) or equivalent guard
  -> validate input with Zod and domain rules
  -> call service()
  -> revalidatePath() for all affected routes
  -> return serializable state for the UI
```

Layer rules:

- `app/` contains routes, layouts, Server Components, Server Actions, and Route Handlers.
- `components/` contains reusable UI. Use `"use client"` only for state, events, effects, or browser APIs.
- `lib/auth/` centralizes current user, Clerk-to-DB sync, roles, and authorization.
- `lib/db/` contains the Prisma singleton.
- `lib/domain/` contains pure, testable rules.
- `lib/services/` contains persistent use cases and Prisma access.
- `lib/validators/` contains Zod schemas.
- `lib/storage/` contains Supabase Storage integration when needed.
- Do not mix business rules into JSX.
- Do not access Prisma from client components.
- Do not hardcode secrets.
- If using a different framework, preserve clear separation among UI, auth, domain, validation, services, persistence, storage, and tests.

## Product Context Template

Track these fields. Ask the user when values are missing:

```txt
App name: POR DEFINIR
Short description: POR DEFINIR
Primary audience: POR DEFINIR
Problem solved: POR DEFINIR
Domain/sector: POR DEFINIR
UI language: POR DEFINIR
Target finish level: MVP funcional / beta privada / produccion
```

## Phase 1: Interview

Ask questions in short batches. Do not ask more than 8 questions per batch. Continue until there is enough information to design and implement well.

Cover at minimum:

1. Product objective and main use cases.
2. Actors, roles, and permissions.
3. Critical flows by role.
4. Main entities, fields, relationships, and states.
5. Business rules and validations.
6. Initial seed data.
7. Authentication: who can register, allowlists, invitations, corporate domain restrictions.
8. Clerk-specific questions when Clerk is viable:
   - Whether the user has Clerk CLI installed.
   - Whether the user wants it installed or used.
   - Whether they authorize using it to create or configure auth.
   - Whether they are logged in with `clerk auth login`.
   - Whether to create a new Clerk app or link an existing one.
   - How to manage environment variables.
9. File needs: images, documents, visibility, maximum sizes.
10. External integrations.
11. UI requirements: visual tone, density, mobile/desktop, accessibility.
12. Non-functional requirements: privacy, audit, performance, limits, languages.
13. Deploy: Vercel/Supabase, environments, variables, domains.
14. Expected tests and most important E2E flow.
15. Explicitly out-of-scope items for the first version.

If the user responds incompletely, ask concrete follow-ups. For minor non-blocking decisions, propose a conservative default and mark it as assumed.

## Phase 2: Synthesis and Confirmation

When enough information is available, respond with:

1. Product summary.
2. Roles and permissions.
3. Main flows.
4. Proposed data model.
5. Proposed routes/screens.
6. Planned mutations, endpoints, jobs, webhooks, or handlers.
7. Recommended stack, alternatives considered, and tradeoffs.
8. Auth strategy. If using Clerk, state whether Clerk CLI or manual configuration will be used and why.
9. Chosen dependencies and relevant current-docs notes.
10. Required environment variables.
11. Step-by-step implementation plan.
12. Test plan.
13. Risks, doubts, or assumptions.

End with exactly:

```txt
Confirma con APROBADO si quieres que implemente este plan. Si quieres cambiar algo, dime que ajustar.
```

Do not implement until the user replies `APROBADO` or gives clearly equivalent explicit confirmation.

## Phase 3: Execution After Approval

After approval, work autonomously until the reasonable end-to-end plan is complete. Do not ask permission for small decisions; make conservative choices and document assumptions.

Required actions:

1. Reconsult official docs if an uncovered API, error, version, or integration appears.
2. Create or update `specs/` before coding complex flows.
3. Implement the data model, schema, migrations, or equivalent mechanism.
4. Configure authentication, middleware/guards, and protected routes using current provider APIs.
5. If Clerk is approved and CLI use is authorized:
   - Use `clerk init` when it adds value.
   - Use `clerk env pull` only when authorized.
   - Use `clerk doctor` to diagnose the integration when useful.
   - Use `clerk init --prompt` when instructions are useful but project mutation is not.
   - Do not run interactive login, create/link apps, or read/write remote variables without explicit permission.
6. Implement local user records, roles, permissions, and guards when needed.
7. Implement services/use cases, validators, and domain rules.
8. Implement mutations, endpoints, jobs, webhooks, or handlers.
9. Build screens with the approved framework's recommended pattern.
10. Create client components only when interactivity requires them.
11. Implement private storage with signed URLs or an equivalent permissioned alternative when needed.
12. Create seed data when applicable.
13. Create or update `.env.example`.
14. Create README setup docs covering local setup, scripts, variables, migrations, and deploy.
15. Create unit tests for domain rules.
16. Create at least one E2E test for the main flow if the environment permits.
17. Run lint, tests, and build. Explain exact blockers for checks that cannot run.
18. Leave the app runnable locally.

## Quality Rules

- Prioritize clarity, maintainability, and simple architecture.
- Keep strict TypeScript unless the user approved another base.
- Make form errors understandable to real users.
- Handle validation errors and unexpected server errors in mutations.
- Refresh, invalidate, or revalidate affected views after mutations.
- Use domain names, not generic names like `Thing` or `Data`, except in examples.
- Include empty, loading, pending, and error states when relevant.
- Make the UI usable on mobile and desktop.
- Do not introduce dependencies without justification.
- Do not use APIs marked deprecated by current docs when a stable alternative exists.
- Do not commit secrets or real sensitive data.
- Do not stop with half-finished code when you can continue.

## Implementation Updates

During implementation:

- Give brief progress updates.
- Try to resolve blockers before escalating.
- If a blocker depends on the user, state exactly what is missing and what decision is needed.

## Final Delivery Format

At the end, deliver:

- Summary of changes.
- Key files modified.
- Commands executed and results.
- Variables the user must configure.
- Practical next steps.

## Completion Criteria

The task is not done until:

- The app compiles, or the exact blocker is explained.
- Main routes exist.
- Data model and permissions are implemented.
- README lets another person run the project.
- Important tests exist, or their absence is justified.
