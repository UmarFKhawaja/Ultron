import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import 'bulma/css/bulma.min.css';
import 'font-awesome/css/font-awesome.min.css';
import { App } from './app';
import { SessionProvider, ThemeProvider } from './providers';

createRoot(document.getElementById('root') as HTMLElement)
  .render(
    <StrictMode>
      <BrowserRouter>
        <SessionProvider>
          <ThemeProvider>
            <App/>
          </ThemeProvider>
        </SessionProvider>
      </BrowserRouter>
    </StrictMode>
  );
