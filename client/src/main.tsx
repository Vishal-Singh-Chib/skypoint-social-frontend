import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './app/layout/styles.css'
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { RouterProvider } from 'react-router-dom';
import { router } from './app/root/Routes.tsx';
import { Provider } from 'react-redux';
import { store } from './app/store/store.ts';
import { GoogleOAuthProvider } from "@react-oauth/google";

console.log(store.getState());
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <GoogleOAuthProvider clientId="281903957047-hm76ufodlo2pgs4tedj7o4386ipa7nc7.apps.googleusercontent.com">
    <Provider store={store}>
          <RouterProvider router={router} />
    </Provider>
    </GoogleOAuthProvider>
  </StrictMode>,
)
