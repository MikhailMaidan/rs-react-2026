import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './index.css';
import App from './App.tsx';
import { About } from './components/About/About.tsx';
import { DetailsPanel } from './components/DetailsPanel/DetailsPanel.tsx';
import { NotFound } from './components/NotFound/NotFound.tsx';
import { store } from './store/store.ts';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <BrowserRouter basename={import.meta.env.BASE_URL}>
        <Routes>
          <Route path="/" element={<App />}>
            <Route index element={<DetailsPanel />} />
          </Route>
          <Route path="/about" element={<About />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  </StrictMode>
);
