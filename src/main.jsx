import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import leftoverItems from "./data/leftoverItems.json";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App items={leftoverItems} />
  </StrictMode>
);
