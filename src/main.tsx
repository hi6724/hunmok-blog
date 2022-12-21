import React from "react";
import ReactDOM from "react-dom/client";
import { RecoilRoot } from "recoil";
import { SWRConfig } from "swr";

import App from "./App";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <RecoilRoot>
    <SWRConfig
      value={{
        fetcher: (url: string) => fetch(url).then((res) => res.json()),
        revalidateIfStale: false,
        revalidateOnFocus: false,
        revalidateOnReconnect: false,
      }}
    >
      <App />
    </SWRConfig>
  </RecoilRoot>
);
