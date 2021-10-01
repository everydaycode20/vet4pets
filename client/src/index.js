import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { BrowserRouter as Router } from "react-router-dom";
import * as serviceWorkerRegistration from './serviceWorkerRegistration';

import "./styles/index.scss";

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <App />
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);

serviceWorkerRegistration.unregister();