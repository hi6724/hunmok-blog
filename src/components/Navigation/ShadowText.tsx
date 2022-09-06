import React from "react";
import styled from "styled-components";
import { colors } from "../../color";
import { getNumFromStr } from "../../utils/getNumFromStr";

interface Props {
  text?: string;
  size: number | string;
}

const ShadowText = ({ text, size }: Props) => {
  return (
    <BigText size={size}>
      <span>{text}</span>
      <span className="shadow">{text}</span>
    </BigText>
  );
};

export default ShadowText;

const BigText = styled.span<Props>`
  position: relative;
  .shadow {
    color: ${colors.fluor};
    position: absolute;
    left: -${(p) => {
        if (typeof p.size === "number") {
          return `${p.size / 12}vw`;
        } else {
          const num = getNumFromStr(p.size);
          return num / 12 + p.size.split(num.toString())[1];
        }
      }};
    top: 0;
    z-index: -1;
  }
  font-size: ${(props) =>
    typeof props.size === "number" ? `${props.size}vw` : props.size};
  color: ${colors.pink};
  font-weight: 900;
  font-family: "BM-Jua";
  z-index: 3;
  transform: ${(p) => {
    if (typeof p.size === "number") {
      return `translateX(${p.size / 24}vw)`;
    } else {
      const num = getNumFromStr(p.size);
      return num / 24 + p.size.split(num.toString())[1];
    }
  }};
`;
