# Margdarshan

A mobile-first, low-bandwidth React + Vite application for simple, positive parenting guidance.

## Included

- English / Hindi / Marathi language toggle.
- Home dashboard with general behavior chatbot.
- Behavior Check survey.
- Results page with tailored AI guidance and follow-up chat.
- No database, cookies, localStorage, sessionStorage, analytics SDK, or server-side conversation store.
- Client data is held only in React memory and cleared on `pagehide` / `beforeunload`.
- AI API key stays server-side.
- Built-in local fallback guidance when no API key is configured.

## Run locally

```bash
npm install
cp .env.example .env
# Add OPENAI_API_KEY to .env
npm run dev
```

Open `http://localhost:5173`.

For production:

```bash
npm run build
PORT=8787 npm start
```

Serve the Vite `dist` directory from your preferred static host and proxy `/api` to the Node server, or adapt the server to serve `dist`.

## Privacy architecture

The app intentionally has no database and does not use browser persistence APIs. The Express server processes each `/api/chat` request without writing user content to application storage.

For a strict zero-data-retention deployment, configure the model provider/project with an eligible Zero Data Retention control and use a compatible endpoint/configuration. The application cannot itself erase data already retained by an external API provider.

`OPENAI_STORE=false` is the default in this project. Do not enable stored Responses or other stateful API features for a zero-retention deployment.

Also disable infrastructure logs that might capture request bodies, reverse-proxy access logs containing sensitive query data, APM breadcrumbs, error-reporting payloads, and third-party analytics. Keep request bodies out of logs.

## Child-safety note

This is educational parenting guidance, not diagnosis or medical care. Keep the service focused on everyday behavior. If a parent describes immediate danger, severe injury, abuse, self-harm, breathing difficulty, loss of consciousness, or another emergency, the assistant should direct them to urgent local help.

## Production hardening checklist

- HTTPS only.
- Do not log request/response bodies.
- Apply rate limiting and request-size limits.
- Keep `OPENAI_API_KEY` server-side.
- Use a provider/project configured for the retention policy required by your deployment.
- Review local privacy, child-safety, and applicable data-protection requirements before public launch.
- Consider adding a server-side Content Security Policy and strict CORS allowlist.
