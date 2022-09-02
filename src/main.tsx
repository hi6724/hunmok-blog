import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { GlobalStyle } from "./GlobalStyle";
import Router from "./Router";

gsap.registerPlugin(ScrollTrigger);
ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <>
    <GlobalStyle />
    <BrowserRouter>
      <Router />
    </BrowserRouter>
  </>
);
