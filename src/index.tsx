import ReactDOM from 'react-dom/client';
import './index.css';
import Navigator from './components/Navigator';
import './scss/index.scss';
import './scss/elements.scss';
import './scss/colors.scss';
import { Provider } from 'react-redux';
import { storeConfig } from './store';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <Provider store={storeConfig}>
    <Navigator />
  </Provider>
);

