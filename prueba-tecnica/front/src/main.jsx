import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import Check from './Check'
import './index.css'
import axios from 'axios'
import { createBrowserRouter, RouterProvider, Navigate } from "react-router-dom";
axios.defaults.baseURL = import.meta.env.VITE_BACK_URL

const router = createBrowserRouter([
  {
    path: "/home",
    element: <App/>
  },
  {
    path: "/:key",
    element: <Check/>
  },{
    path: "*",
    element: <Navigate to="/home" replace/>
  }
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);
