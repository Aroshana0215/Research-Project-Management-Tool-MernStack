
import React from 'react';
import App from './App';
import './index.css';
import { createRoot } from 'react-dom/client';
import "core-js";
import "regenerator-runtime";
import  DataProvider  from './redux/store.js'
// import 'bootstrap';
// import 'bootstrap/dist/css/bootstrap.css';
// import 'bootstrap/dist/js/bootstrap.js';
// import $ from 'jquery';
// import Popper from 'popper.js';

const container = document.getElementById('root');
const root = createRoot(container);
root.render(
        <DataProvider>
            <App />
        </DataProvider>
);