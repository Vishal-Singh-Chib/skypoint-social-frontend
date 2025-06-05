
# React Client Setup (Google Auth + MUI + Redux + Vite)

This README describes how to set up and run the React frontend for a social media app with Google authentication, using MUI v6, Redux Toolkit, Vite, and TypeScript.

---

## 🔧 Prerequisites

- Node.js (v18+ recommended)
- npm
- npm install react-router-dom
- npm install react-redux
- npm install @reduxjs/toolkit

---

## 📦 Project Dependencies (from package.json)

These libraries are already included in your `package.json`:

### ✅ Core Packages

- **React 19**: Frontend framework
- **React DOM 19**
- **React Router DOM 7**: Routing
- **Redux Toolkit 2.8**: Global state management
- **React Redux 9.2**: Redux bindings for React

### 🎨 UI & Styling

- **Material UI 6 (MUI)**: UI components
- **@emotion/react** & **@emotion/styled**: Styling engine for MUI
- **@fontsource/roboto**: Default MUI font
- **@mui/icons-material**: Icon set

### 📅 Utilities

- **date-fns**: For date formatting

### 🔐 Google Authentication

- **@react-oauth/google**: Google login with OAuth2

### ⚙️ Development Tools

- **Vite 6**: Fast frontend tooling and dev server
- **vite-plugin-mkcert**: Locally trusted HTTPS certs (for Google OAuth)
- **TypeScript ~5.8**
- **ESLint**: Linting and quality enforcement

---

## 🚀 Getting Started

### 1. Install Dependencies

```bash
npm install
```

### 2. Enable HTTPS for Google Login

If using Google login locally, you must serve the app over HTTPS:

```bash
npm install vite-plugin-mkcert -D
```

Add to `vite.config.ts`:

```ts
import mkcert from 'vite-plugin-mkcert';

export default defineConfig({
  server: {
    https: true
  },
  plugins: [react(), mkcert()]
});
```

## 🧪 Scripts

| Script       | Purpose                              |
|--------------|--------------------------------------|
| `dev`        | Runs Vite development server         |
| `build`      | Builds the app for production        |
| `preview`    | Previews the production build        |
| `lint`       | Runs ESLint on the project           |

---

## 🌐 Google OAuth Setup

1. Visit [Google Cloud Console](https://console.cloud.google.com/).
2. Create a **Web App OAuth2 Client ID**.
3. Add your frontend URL (`https://localhost:3000`) to **Authorized JavaScript Origins**.
4. Use `GoogleOAuthProvider` to wrap your app.

```tsx
import { GoogleOAuthProvider } from '@react-oauth/google';

<GoogleOAuthProvider clientId="YOUR_CLIENT_ID">
  <App />
</GoogleOAuthProvider>
```

5. Add `GoogleLogin` where needed:

```tsx
<GoogleLogin
  onSuccess={(credentialResponse) => {
    console.log(credentialResponse);
  }}
  onError={() => console.log('Login Failed')}
/>
```

---

## 📁 Suggested Folder Structure

```
src/
│
├── components/       # Reusable UI components
├── pages/            # Route pages
├── redux/            # Redux slices & store
├── App.tsx
└── main.tsx
```

---

## ✅ Final Notes

- Make sure `vite-plugin-mkcert` is correctly configured.
- Keep Google client ID **client-side only** for login.
- Always verify the `credentialResponse` with the server for real-world apps.

---

© 2025 Your Project
