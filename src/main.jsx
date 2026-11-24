import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from "react-redux";
import { store } from "./app/store";
import './index.css'
import App from './App.jsx'
import "leaflet/dist/leaflet.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { HelmetProvider } from "react-helmet-async";

createRoot(document.getElementById('root')).render(
  <StrictMode>
  <HelmetProvider> 
    <Provider store={store}>
      <App />
    <ToastContainer position = "top-right" autoClose={3000}/>
    </Provider>
  </HelmetProvider>
  </StrictMode>,
)
