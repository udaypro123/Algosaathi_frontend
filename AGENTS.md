# Frontend Agent Rules

These rules apply to changes in `algosaathi_frontend`.

## Protect existing behavior

- Read the nearby component, route, API client, and types before editing.
- Keep changes local to the requested feature. Preserve current routes, role checks, API contracts, and user flows unless the task explicitly asks to change them.
- Do not replace established Material UI, Redux, React Router, or lazy-loading patterns with a new framework.
- Do not remove, rename, or migrate features as cleanup. Ask before changing authentication behavior, persisted state, or route access rules.
- Add or update focused tests when available. Run lint and TypeScript/build checks that do not require opening or exposing secrets.

## Secrets and sensitive data

- Never open, print, copy, commit, upload, or paste `.env`, credentials, tokens, private keys, production data, or user data into prompts, logs, screenshots, or external tools.
- If a task appears to require the value of a secret, stop and request explicit user permission. Prefer variable names and `.env.example` placeholders instead.
- Treat every `VITE_` variable as public: Vite embeds it in browser assets. Never place a private API key, signing key, database credential, or SMTP password in a frontend variable.
- Do not log access tokens, request/response bodies, user profiles, contact form contents, provider responses, or environment values.
- Never load production credentials or make requests to production services for routine validation.

## Security and validation

- Preserve authentication and authorization checks. Do not store new secrets in browser storage.
- Validate untrusted values at boundaries and avoid rendering untrusted HTML.
- Do not add analytics, telemetry, dependencies, or external services without the user's approval.
- Do not run `npm audit fix --force`. Explain major dependency upgrades and verify compatibility before applying them.
- Before deployment, run `npm run lint`, `npm run build`, and `npm audit --registry=https://registry.npmjs.org/` from this directory. If environment loading is required, ensure only intentionally public `VITE_` settings can enter the bundle; never reveal their values in output.