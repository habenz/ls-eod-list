import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import items from "./data/leftoverItems.js";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App items={items} />
  </StrictMode>
);
