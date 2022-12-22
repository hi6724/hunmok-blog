import React from "react";
import ReactDOM from "react-dom/client";
import { RecoilRoot } from "recoil";
import { SWRConfig } from "swr";

import App from "./App";
import { GlobalStyle } from "./GlobalStyle";

function localStorageProvider(): any {
  const map = new Map(JSON.parse(localStorage.getItem("app-cache") || "[]"));

  window.addEventListener("beforeunload", () => {
    const appCache = JSON.stringify(Array.from(map.entries()));
    localStorage.setItem("app-cache", appCache);
  });

  return map;
}

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <RecoilRoot>
    <SWRConfig
      value={{
        fetcher: (url: string) => fetch(url).then((res) => res.json()),
        revalidateIfStale: false,
        revalidateOnFocus: false,
        revalidateOnReconnect: false,
        provider: localStorageProvider,
      }}
    >
      <GlobalStyle />
      <App />
    </SWRConfig>
  </RecoilRoot>
);
