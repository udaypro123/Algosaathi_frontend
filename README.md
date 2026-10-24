# AlgoSaathi Frontend

React 19, TypeScript, Vite 8, Material UI, Redux Toolkit, and React Router frontend for AlgoSaathi.

## Requirements

- Node.js `20.19+` or `22.12+`
- npm
- The AlgoSaathi backend running locally or a deployed backend URL

## Local setup

From this directory:

```powershell
npm ci
```

Create a local `.env` from `.env.example` only if you do not already have one. Keep real values in the ignored local file; do not commit it.

```env
VITE_API_URL=http://localhost:5000/api
VITE_GOOGLE_CLIENT_ID=your-google-oauth-client-id
```

Start the frontend with `npm run dev`. The default Vite URL is `http://localhost:5173`.

Anything prefixed with `VITE_` is embedded in the browser bundle and is visible to users. Only public configuration belongs there; never put database passwords, private API keys, signing secrets, or other server credentials in frontend environment variables.

## Available scripts

| Command | Purpose |
| --- | --- |
| `npm run dev` | Start the Vite development server |
| `npm run build` | Type-check and create the production bundle |
| `npm run lint` | Run ESLint |
| `npm run preview` | Preview the production bundle locally |

## Project layout

- `src/API/`: authenticated and public Axios clients, Google sign-in helper
- `src/app/`: Redux store and React Router configuration
- `src/common/`: shared headers, footer, drawers, loaders, and UI components
- `src/Modules/`: feature pages for auth, courses, news, templates, contact, dashboards, and complaints
- `src/redux/`: authentication state and shared Redux components
- `src/routes/`: route guards
- `src/seo/`: page metadata helpers

Public pages include home, login/signup, contact, news, templates, and `/privacy-policy`. The dashboard and management routes use protected role-based routing. Keep route behavior and API response contracts compatible when changing a feature.

## Backend connection

The frontend reads `VITE_API_URL` and defaults to the same-origin `/api` path, where the backend mounts its APIs. The deployment workflow sets `VITE_API_URL=/api`. For local development, start the backend from the sibling `algosaathi_backend` directory and set the frontend API URL to `http://localhost:5000/api`. Set the backend `FRONTEND_URL` to `http://localhost:5173` for local CORS.

The deployed privacy policy URL is `https://algosaathi.com/privacy-policy`. A mobile app or Play Store listing can open this public HTTPS page after the frontend deployment supports SPA route rewrites to `index.html`.

## Validation

Run `npm run lint` and `npm run build` before deploying. Vite loads local environment files during a production build; do not put secrets in any `VITE_` variable, and do not print environment values in build logs.

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])

```
