import dayjs from "dayjs";
import gsap from "gsap";
import React, { useRef, useEffect } from "react";
import { animateScroll } from "react-scroll";
import styled from "styled-components";

import { colors } from "../color";
import ShadowText from "../components/Navigation/ShadowText";
import Timeline from "../components/Timeline";
import TypingText from "../hooks/TypingText";
import { bounceAnim } from "../utils/bounceAnim";
import { useMobile } from "../utils/useMobile";

function AboutMePage() {
  animateScroll.scrollToTop();
  const isMobile = useMobile();
  const titleRef = useRef<HTMLHeadingElement>(null);
  const descriptionRef = useRef<HTMLDivElement>(null);
  const tl = gsap.timeline();
  useEffect(() => {
    if (titleRef.current && descriptionRef.current) {
      tl.to(titleRef.current?.children, {
        ...bounceAnim,
        scrollTrigger: {
          trigger: titleRef.current.children,
          start: "top 40%",
        },
      });
      tl.from(descriptionRef.current?.children, {
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
  });

  return (
    <Container>
      <Title size={isMobile ? "3rem" : "5rem"} ref={titleRef}>
        <TypingText size={isMobile ? "3rem" : "5rem"}>
          나를 소개합니다
        </TypingText>
      </Title>
      <Description ref={descriptionRef}>
        {!isMobile ? (
          <>
            <section>
              <h4>프론트엔드</h4>
              <h6> react, react-native, next.js</h6>
              <h6>redux, gsap, styled-components, react-query</h6>
            </section>
            <section>
              <h4>백엔드</h4>
              <h6>node.js, python, java</h6>
              <h6>express, graphql, django, spring</h6>
            </section>
            <Timeline />
          </>
        ) : (
          <>
            <section>
              저는 2015년에 고등학교를 졸업하고, 일본으로 유학을 떠났습니다.
              1년동안의 어학연수를 마치고 일본에 있는 대학교에
              <h6>
                <StrongText> 정보시스템 공학과</StrongText> 로 입학을 했습니다.
              </h6>
            </section>
            <section>
              <StrongText>일본어</StrongText>를 능숙하게 사용할 수 있고,
              프론트엔드는 2021년 5월에 html, css, js 를 시작으로 현재는
              프론트엔드는 react, next.js 백엔드는 express,django, spring 를
              사용할 수 있습니다.
            </section>
            <Timeline />
          </>
        )}
      </Description>
    </Container>
  );
}

export default AboutMePage;

const StrongText = styled.span`
  color: ${colors.pink};
`;

const Container = styled.div`
  width: 100%;
  min-height: 100vh;
  background-color: ${colors.lightBlack};
  padding: 10vh 5vw;
`;

const Title = styled.h2<any>`
  font-size: ${(p) => p.size};
  font-family: "BM-Pro";
  color: ${colors.fluor};
  margin-bottom: 2rem;
  display: flex;
`;
const Description = styled.div`
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
