import { Canvas, extend } from "@react-three/fiber";
import gsap from "gsap";
import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { TextGeometry } from "three/examples/jsm/geometries/TextGeometry";
import dayjs from "dayjs";

import Three from "./Three";
import { colors } from "../../color";
import TypingText from "../../hooks/TypingText";
import { bounceAnim } from "../../utils/bounceAnim";
import { useMobile } from "../../utils/useMobile";
import Button from "../Button";
import ScrollAnimContainer from "../ScrollAnimContainer";
import ShadowText from "../Navigation/ShadowText";
import { useNavigate } from "react-router-dom";
import GradientButton from "../GradientButton";
import Skills from "../Skills";

function AboutMe() {
  const navigation = useNavigate();
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
    <div style={{ position: "relative" }}>
      <Title size={isMobile ? "3rem" : "5rem"} ref={titleRef}>
        <TypingText size={isMobile ? "3rem" : "5rem"}>
          나를 소개합니다
        </TypingText>
      </Title>
      <Container>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <Description ref={descriptionRef}>
            <section>
              <span style={{ color: colors.fluor }}>일본어</span>를 능숙하게
              사용할 수 있고, 2020년 10월에 html, css, js 를 시작으로 웹개발
              공부를 시작했습니다. 현재는
              <span style={{ color: colors.fluor }}>
                {" "}
                react, next.js, express, spring
              </span>{" "}
              등을 사용할 수 있습니다.
            </section>
            <Skills detail={false} />
          </Description>
        </div>
        <div
          style={{
            width: "100%",
            aspectRatio: "1",
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
      <ScrollAnimContainer
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
        }}
        from={true}
        anim={{ opacity: 0, scale: 0.3 }}
      >
        <GradientButton onClick={() => navigation("/about-me")}>
          자세히보기
        </GradientButton>
      </ScrollAnimContainer>
    </div>
  );
}

export default AboutMe;

const Container = styled.div`
  min-height: 70vh;
  padding: 0 5vw;
  display: grid;
  grid-template-columns: 25vw 55vw;

  @media screen and (max-width: 1000px) {
    display: flex;
    flex-direction: column;
  }
`;

export const Title = styled.h2<any>`
  padding: 0 5vw;
  font-size: ${(p) => p.size};
  font-family: "BM-Pro";
  color: ${colors.fluor};
  margin-bottom: 2rem;
  display: flex;
  @media screen and (min-width: 1000px) {
    position: absolute;
    top: 0px;
  }
`;

const Description = styled.div`
  word-break: keep-all;
  font-family: "BM-Air";
  line-height: 1.5rem;
  color: ${colors.white};
  section {
    font-size: 1.2rem;
    margin-bottom: 1rem;
  }
  h6 {
    text-overflow: ellipsis;
    display: block;
    overflow: hidden;
    white-space: nowrap;
  }
`;
