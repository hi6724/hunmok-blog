import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { colors } from "../../color";
import ShadowText from "./ShadowText";

const Logo = () => {
  const navigate = useNavigate();
  return (
    <Container onClick={() => navigate("/")}>
      <ShadowText text="H" size={"6rem"} />
      <NameText>Hunmok</NameText>
      <h4>web developer</h4>
    </Container>
  );
};

export default Logo;

const Container = styled.div`
  cursor: pointer;
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
