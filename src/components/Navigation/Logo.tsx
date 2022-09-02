import React from "react";
import styled from "styled-components";
import { colors } from "../../color";
import ShadowText from "./ShadowText";

const Logo = () => {
  return (
    <Container>
      <ShadowText text="H" size={5.5} />
      <NameText>Hunmok</NameText>
      <h4>web developer</h4>
    </Container>
  );
};

export default Logo;

const Container = styled.div`
  padding: 1rem 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0rem;
  background-color: black;
  height: 12rem;
  h4 {
    margin-top: 1rem;
    color: ${colors.darkGray};
    font-size: 1rem;
    font-family: "BM-Air";
  }
`;

const NameText = styled.h2`
  color: ${colors.white};
  font-size: 1.7rem;
  font-family: "BM-Pro";
`;
