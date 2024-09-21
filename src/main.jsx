import React, { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./home/home.jsx";
import { Respuesta_Voz } from "./pages/Respuesta_Voz.jsx";
import { Analisis_Financiero_Screen } from "./pages/Analisis_Financiero_Screen.jsx";
import Operaciones from "./pages/Operaciones.jsx";
import Login from "./routes/Login.jsx";
import Metas from "./pages/Metas.jsx";

const router = createBrowserRouter([
 
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/asistente-inteligente",
    element: <Respuesta_Voz />,
  },
  {
    path: "/analisis-financiero",
    element: <Analisis_Financiero_Screen />,
  },
  {
    path: "/operaciones",
    element: <Operaciones />,
  },
  {
    path: "/metas",
    element: <Metas />,
  },
]);

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
