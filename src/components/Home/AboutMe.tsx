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
            {!isMobile ? (
              <>
                <p>
                  <h5>2016.04.03 ~ 2022.03.18 (대학교)</h5>
                  <h5>07.17 ~ {dayjs().format("MM.DD")} (SSAFY)</h5>
                </p>

                <p>
                  <h4>프론트엔드</h4>
                  <h6> react, react-native, next.js</h6>
                  <h6>redux, gsap, styled-components, react-query</h6>
                </p>
                <p>
                  <h4>백엔드</h4>
                  <h6>node.js, python, java</h6>
                  <h6>express, graphql, django, spring</h6>
                </p>
              </>
            ) : (
              <>
                <ul>
                  <li>2016.04.03 ~ 2022.03.18 (대학교)</li>
                  <li>2018.04.09 ~ 2019.12.06 (육군 만기제대)</li>
                  <li>07.17 ~ {dayjs().format("MM.DD")} (SSAFY)</li>
                </ul>
              </>
            )}
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
        <Button onClick={() => navigation("/about-me")}>자세히보기</Button>
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

const Title = styled.h2<any>`
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
  font-family: "BM-Air";
  line-height: 1.5rem;
  color: ${colors.white};
  p {
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
