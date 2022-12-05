import React from "react";
import styled from "styled-components";
import { colors } from "../color";

function Footer() {
  return (
    <Container>
      <p>하훈목 / 전화번호: 010-4362-6724 / 메일: hunmok1027@gmail.com</p>
      <p>경기도 부천시 장말로 136번길 </p>
      <p>
        <span>&copy;</span> 2022 HAHUNMOK
      </p>
    </Container>
  );
}

export default Footer;

const Container = styled.div`
  background-color: ${colors.lightBlack};
  padding: 5vh 5vw;
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
  font-size: 0.9rem;
  color: ${colors.lightGray};
  font-family: "BM-Air";
  span {
    font-family: sans-serif;
  }
  @media screen and (min-width: 1000px) {
    margin-left: 8rem;
  }
`;
