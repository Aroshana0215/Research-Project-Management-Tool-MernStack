
import React from 'react';
import App from './App';
import './index.css';
import { createRoot } from 'react-dom/client';
import "core-js";
import "regenerator-runtime";
import  DataProvider  from './redux/store.js'
const container = document.getElementById('root');
const root = createRoot(container);
root.render(
        <DataProvider>
            <App />
        </DataProvider>
);