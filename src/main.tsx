
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App'
import {Provider} from "react-redux";
import {store} from "./app/store";

window.addEventListener('vite:preloadError', (event) => {
  event.preventDefault();
  window.location.reload();
});


ReactDOM.createRoot(
document.getElementById('root')!
)
.render(

<Provider store={store}>
<App/>
</Provider>

)