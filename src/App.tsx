import React, { useLayoutEffect, useState } from "react";
import { BrowserRouter } from "react-router-dom";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import FontFaceObserver from "fontfaceobserver";

import "./style.css";
import { GlobalStyle } from "./GlobalStyle";
import Router from "./Router";

gsap.registerPlugin(ScrollTrigger);

function App() {
  const [loading, setLoading] = useState(true);
  useLayoutEffect(() => {
    (async function () {
      const fonts = [
        new FontFaceObserver("BM-Pro").load(),
        new FontFaceObserver("BM-Air").load(),
        new FontFaceObserver("BM-Jua").load(),
      ];
      await Promise.all(fonts);
      setLoading(false);
    })();
  });
  return (
    <>
      {loading ? (
        "loading..."
      ) : (
        <>
          <GlobalStyle />
          <BrowserRouter>
            <Router />
          </BrowserRouter>
        </>
      )}
    </>
  );
}

export default App;
