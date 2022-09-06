import { Canvas, extend } from "@react-three/fiber";
import gsap from "gsap";
import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { TextGeometry } from "three/examples/jsm/geometries/TextGeometry";

import { colors } from "../../color";
import TypingText from "../../hooks/TypingText";
import { bounceAnim } from "../../utils/bounceAnim";
import Three from "./Three";

function AboutMe() {
  const titleRef = useRef<HTMLHeadingElement>(null);
  useEffect(() => {
    if (titleRef.current !== null) {
      gsap.to(titleRef.current?.children, {
        ...bounceAnim,
        scrollTrigger: {
          trigger: titleRef.current.children,
          start: "top 60%",
        },
      });
    }
    extend({ TextGeometry });
  });

  return (
    <Container>
      <div>
        <Title ref={titleRef}>
          <TypingText size={4}>About Me</TypingText>
        </Title>
        <Description>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc posuere
          varius arcu volutpat ullamcorper. Donec accumsan odio eu blandit
          auctor. Phasellus vitae ornare enim, vitae eleifend nunc.
        </Description>
        <Description>
          Nullam commodo nisl ut dapibus varius. Vivamus vestibulum, purus et
          placerat blandit, purus magna consequat nisl, at fringilla erat nisl
          non massa. Duis nisl dolor, feugiat non risus ut, pretium porta odio.
        </Description>
        <Description>
          Curabitur consequat facilisis fringilla. Pellentesque turpis diam,
          convallis ac sollicitudin non, maximus in odio. Curabitur porta
          interdum libero quis facilisis. Nunc a aliquam ipsum, aliquet cursus
          odio. Mauris eu pulvinar metus.
        </Description>
      </div>
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Canvas>
          <Three />
        </Canvas>
      </div>
    </Container>
  );
}

export default AboutMe;

const Container = styled.div`
  margin-top: 25vh;
  min-height: 100vh;
  padding: 0 5vw;
  display: grid;
  grid-template-columns: 25vw 55vw;
  align-items: center;
  @media screen and (max-width: 1000px) {
    display: flex;
    flex-direction: column;
  }
`;

const Title = styled.h2`
  font-size: 4rem;
  font-family: "BM-Pro";
  color: ${colors.fluor};
  margin-bottom: 2rem;
  display: flex;
`;

const Description = styled.div`
  font-size: 1.2rem;
  font-family: "BM-Air";
  line-height: 1.5rem;
  color: ${colors.white};
  margin-bottom: 1rem;
`;
