import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { Provider } from 'react-redux';
import { store } from './app/store';

window.addEventListener('vite:preloadError', (event) => {
  event.preventDefault();

  const reloadKey = 'vite-preload-reload';
  const lastReload = sessionStorage.getItem(reloadKey);

  // Prevent infinite reload loop
  if (!lastReload || Date.now() - Number(lastReload) > 10000) {
    sessionStorage.setItem(reloadKey, Date.now().toString());

    window.location.reload();
  }
});

ReactDOM.createRoot(
  document.getElementById('root')!
).render(
  <Provider store={store}>
    <App />
  </Provider>
);