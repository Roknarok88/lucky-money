import { StrictMode } from 'react'
import React from 'react'
import ReactDOM from 'react-dom/client'
import {BrowserRouter} from "react-router-dom";
import { createRoot } from 'react-dom/client'
import './main.scss'
import i18next from "i18next";
import App from './App.jsx'

import {I18nextProvider} from "react-i18next";

import global_en from "./translations/en/global.json";
import global_es from "./translations/es/global.json";
import global_de from "./translations/de/global.json";

i18next.init({
    interpolation: {escapeValue: true},
    lng: "en",
    resources: {
        en: {
            global: global_en
        },
        es: {
            global: global_es
        },
        de: {
            global: global_de
        }
    }
})


createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <I18nextProvider i18n={i18next}>
            <BrowserRouter>
                <App />
            </BrowserRouter>
        </I18nextProvider>
    </React.StrictMode>,
)
