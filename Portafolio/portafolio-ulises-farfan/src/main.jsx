import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  RouterProvider
} from "react-router-dom";
import App from './App';
import './index.css';
import axios from "axios"

axios.defaults.baseURL = import.meta.env.VITE_APP_API

ReactDOM.createRoot(document.getElementById("root")).render(
    <RouterProvider router={App} />
);