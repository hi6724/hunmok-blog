import React from "react";
import styled from "styled-components";
import { colors } from "../../color";

interface Props {
  text?: string;
  size: number;
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
    left: -${(props) => props.size / 12}rem;
    top: 0;
    z-index: -1;
  }
  color: ${colors.pink};
  font-size: ${(props) => props.size}rem;
  font-weight: 900;
  font-family: "BM-Jua";
  z-index: 3;
  transform: ${(p) => `translateX(${p.size / 24}rem)`};
`;
