import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import gsap from "gsap";

import ShadowText from "../Navigation/ShadowText";
import { colors } from "../../color";
import TypingText from "../../hooks/TypingText";
import { bounceAnim } from "../../utils/bounceAnim";
import { useMobile } from "../../utils/useMobile";

const Welcome = () => {
  const ref = useRef<any[]>([]);
  const timeline = gsap.timeline();
  const isMobile = useMobile();

  useEffect(() => {
    if (ref.current !== null) {
      ref.current.forEach((el) => {
        el &&
          timeline.to(el.children, {
            ...bounceAnim,
          });
      });
    }
  });

  return (
    <Container>
      <TextContainer ref={(el) => (ref.current[0] = el)}>
        <TypingText size={8}>
          {/* {isMobile ? "나는" : "안녕하세요"} */}
          안녕하세요
        </TypingText>
      </TextContainer>

      <TextContainer ref={(el) => (ref.current[1] = el)}>
        {!isMobile && <TypingText size={8}>프론트엔드 개발자</TypingText>}
        {isMobile && <TypingText size={8}>프론트엔드</TypingText>}
      </TextContainer>
      {isMobile && (
        <TextContainer ref={(el) => (ref.current[2] = el)}>
          <TypingText size={8}>개발자</TypingText>
        </TextContainer>
      )}
      <TextContainer ref={(el) => (ref.current[3] = el)}>
        <TypingText size={8}>
          <ShadowText size={isMobile ? 15 : 8} text="하훈목" />
          {" 입니다"}
        </TypingText>
      </TextContainer>
    </Container>
  );
};

export default Welcome;

const TextContainer = styled.h2`
  display: flex;
  font-size: 8vw;
  font-family: "BM-Pro";
  color: ${colors.white};
  @media screen and (max-width: 1000px) {
    font-size: 15vw;
  }
`;
const Container = styled.div`
  width: 100vw;
  display: flex;
  min-height: 100vh;
  flex-direction: column;
  justify-content: center;
  padding: 0 5vw;
  gap: 2vh;
`;
