import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";

import { BMAir, BME, BMHR, BMJua, BMPro } from "./assets/font/index";

export const GlobalStyle = createGlobalStyle`
 ${reset}
 *{
     box-sizing: border-box;
 }
 @font-face{
    font-family: "BM-Pro";
    src: url(${BMPro})
 }
 @font-face{
    font-family: "BM-Air";
    src: url(${BMAir})
 }
 @font-face{
    font-family: "BM-E";
    src: url(${BME})
 }
 @font-face{
    font-family: "BM-HR";
    src: url(${BMHR})
 }
 @font-face{
    font-family: "BM-Jua";
    src: url(${BMJua})
 }
`;
