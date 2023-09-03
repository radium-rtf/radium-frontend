import ReactDOM from 'react-dom/client';
import './index.css';
import Navigator from './components/Navigator';
import '@/shared/ui/scss/index.scss';
import '@/shared/ui/scss/elements.scss';
import '@/shared/ui/scss/colors.scss';
import { Provider } from 'react-redux';
import { storeConfig } from './shared/api/store';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <Provider store={storeConfig}>
    <Navigator />
  </Provider>
);

