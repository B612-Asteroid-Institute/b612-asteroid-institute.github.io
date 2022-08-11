import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter,
  Routes,
  Route, } from "react-router-dom";
import './css/index.css';
import App from './App';
import Precovery from './routes/precovery';
import About from './routes/about';
import reportWebVitals from './reportWebVitals';
import OrbElementsTransform from './routes/orbElementsTransform';

ReactDOM.render(

  <HashRouter>
    <React.StrictMode>
      <Routes>
        <Route path="/" element={<App />}/>
        <Route path="precovery" element={<Precovery />} />
        <Route path="orbElementsTransform" element={<OrbElementsTransform />} />
        <Route path="about" element={<About />} />
    </Routes>
    </React.StrictMode>

  </HashRouter>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
