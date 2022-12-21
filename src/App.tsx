import React, { useLayoutEffect, useState } from "react";
import { Canvas, extend } from "@react-three/fiber";
import { TextGeometry } from "three/examples/jsm/geometries/TextGeometry";
import { BrowserRouter } from "react-router-dom";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import FontFaceObserver from "fontfaceobserver";
import { SWRConfig, preload } from "swr";

import "./style.css";
import { GlobalStyle } from "./GlobalStyle";
import Router from "./Router";
import ThreeLoading from "./components/Home/ThreeLoading";
import {
  getProjectsApi,
  getGuestbooksApi,
  getNotionListApi,
} from "./utils/apiRoutes";
import useImagePreloader from "./hooks/useImagePreloader";

gsap.registerPlugin(ScrollTrigger);
const fetcher = (url: string) => fetch(url).then((res) => res.json());
preload(getNotionListApi + `/0?count=12&filter=all`, fetcher);
preload(getGuestbooksApi, fetcher);
const projects = await preload(getProjectsApi, fetcher);

function App() {
  const [loading, setLoading] = useState(true);
  const { imagesPreloaded } = useImagePreloader(
    projects.map((p: any) => p.thumbImageUri)
  );
  useLayoutEffect(() => {
    extend({ TextGeometry });
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
      {loading || !imagesPreloaded ? (
        <Canvas style={{ width: "100%", height: "100vh" }}>
          <ThreeLoading />
        </Canvas>
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
