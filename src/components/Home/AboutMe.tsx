import { Canvas, extend } from "@react-three/fiber";
import gsap from "gsap";
import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { TextGeometry } from "three/examples/jsm/geometries/TextGeometry";

import Three from "./Three";
import { colors } from "../../color";
import TypingText from "../../hooks/TypingText";
import { bounceAnim } from "../../utils/bounceAnim";
import { useMobile } from "../../utils/useMobile";

function AboutMe() {
  const isMobile = useMobile();
  const titleRef = useRef<HTMLHeadingElement>(null);
  const descriptionRef = useRef<HTMLDivElement>(null);
  const threeRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (titleRef.current) {
      gsap.to(titleRef.current?.children, {
        ...bounceAnim,
        scrollTrigger: {
          trigger: titleRef.current.children,
          start: "top 60%",
        },
      });
    }
    if (threeRef.current) {
      gsap.from(threeRef.current, {
        opacity: 0,
        duration: 2,
        scale: 0.1,
        scrollTrigger: {
          trigger: threeRef.current,
          start: "top 60%",
        },
      });
    }
    if (descriptionRef.current) {
      gsap.from(descriptionRef.current.children, {
        opacity: 0,
        y: 30,
        duration: 1.5,
        stagger: {
          each: 0.5,
        },
        scrollTrigger: {
          trigger: descriptionRef.current.children,
          start: "top 60%",
        },
      });
    }
    extend({ TextGeometry });
  });

  return (
    <Container>
      <div>
        <Title size={isMobile ? "3rem" : "5rem"} ref={titleRef}>
          <TypingText size={isMobile ? "3rem" : "5rem"}>About Me</TypingText>
        </Title>
        <Description ref={descriptionRef}>
          {!isMobile ? (
            <>
              <p>
                Nullam commodo nisl ut dapibus varius. Vivamus vestibulum, purus
                et placerat blandit, purus magna consequat nisl, at fringilla
                erat nisl non massa. Duis nisl dolor, feugiat non risus ut,
                pretium porta odio.
              </p>
              <p>
                Curabitur consequat facilisis fringilla. Pellentesque turpis
                diam, convallis ac sollicitudin non, maximus in odio. Curabitur
                porta interdum libero quis facilisis. Nunc a aliquam ipsum,
                aliquet cursus odio. Mauris eu pulvinar metus.
              </p>
            </>
          ) : (
            <>
              <p>
                Lorem ipsum dolor accumsan sit amet, consectetur adipiscing
                elit.
              </p>
              <p>
                Donec accumsan odio eu. Phasellus vitae ornare enim, vitae
                eleifend nunc.
              </p>
            </>
          )}
        </Description>
      </div>
      <div
        style={{
          width: isMobile ? "95vw" : "100%",
          height: isMobile ? "95vw" : "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Canvas ref={threeRef}>
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

const Title = styled.h2<any>`
  font-size: ${(p) => p.size};
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
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
`;
