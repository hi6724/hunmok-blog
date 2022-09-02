import React, { useEffect, useRef } from "react";
import styled from "styled-components";
import gsap from "gsap";

import ShadowText from "../Navigation/ShadowText";
import { colors } from "../../color";
import TypingText from "../../hooks/TypingText";
import { bounceAnim } from "../../utils/bounceAnim";

const Welcome = () => {
  const ref = useRef<any[]>([]);
  const timeline = gsap.timeline();

  useEffect(() => {
    if (ref.current !== null) {
      ref.current.forEach((el) => {
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
          <TypingText size={6}>Hi,</TypingText>
        </TextContainer>
        <TextContainer ref={(el) => (ref.current[1] = el)}>
          <TypingText size={6}>
            I'm <ShadowText size={6} text="H" />
            unmok,
          </TypingText>
        </TextContainer>
        <TextContainer ref={(el) => (ref.current[2] = el)}>
          <TypingText size={6}>web developer</TypingText>
        </TextContainer>
      </div>
    </Container>
  );
};

export default Welcome;

const TextContainer = styled.h2`
  display: flex;
  font-size: 6rem;
  font-family: "BM-Pro";
  color: ${colors.white};
`;
const Container = styled.div`
  display: flex;
  height: 100vh;
  flex-direction: column;
  justify-content: center;
  padding: 0 5vw;
`;
