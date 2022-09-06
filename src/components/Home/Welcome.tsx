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
      <div>
        <TextContainer ref={(el) => (ref.current[0] = el)}>
          <TypingText size={isMobile ? 20 : 8}>
            {isMobile ? "I'm" : "Hi,"}
          </TypingText>
        </TextContainer>
        <TextContainer ref={(el) => (ref.current[1] = el)}>
          <TypingText size={isMobile ? 20 : 8}>
            {!isMobile && "I'm "}
            <ShadowText size={isMobile ? 20 : 8} text="H" />
            unmok,
          </TypingText>
        </TextContainer>
        <TextContainer ref={(el) => (ref.current[2] = el)}>
          {!isMobile && <TypingText size={8}>web developer</TypingText>}
          {isMobile && <TypingText size={20}>web</TypingText>}
        </TextContainer>
        {isMobile && (
          <TextContainer ref={(el) => (ref.current[3] = el)}>
            <TypingText size={8}>developer</TypingText>
          </TextContainer>
        )}
      </div>
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
    font-size: 20vw;
  }
`;
const Container = styled.div`
  width: 100vw;
  display: flex;
  min-height: 100vh;
  flex-direction: column;
  justify-content: center;
  padding: 0 5vw;
`;
