import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Provider } from 'react-redux'
import axios from 'axios'
import store from './features/store.jsx'
import { BrowserRouter } from 'react-router-dom'


axios.defaults.withCredentials = true
axios.defaults.baseURL = 'http://localhost:8000/'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
    <Provider store={store}>
    <App />
    </Provider>
    </BrowserRouter>
  </React.StrictMode>,
)
