import gsap from "gsap";
import React, { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

import { colors } from "../../color";
import TypingText from "../../hooks/TypingText";
import { bounceAnim } from "../../utils/bounceAnim";
import { useMobile } from "../../utils/useMobile";
import Button from "../Button";
import GridItems from "../GridItems/GridItems";
import ScrollAnimContainer from "../ScrollAnimContainer";

function MyProjects() {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const descriptionRef = useRef<HTMLDivElement>(null);
  const isMobile = useMobile();
  const navigate = useNavigate();

  useEffect(() => {
    if (titleRef.current !== null) {
      gsap.to(titleRef.current.children, {
        ...bounceAnim,
        scrollTrigger: {
          trigger: titleRef.current.children,
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
  });

  return (
    <>
      <Container>
        <Title size={isMobile ? "3rem" : "5rem"} ref={titleRef}>
          <TypingText size={isMobile ? "3rem" : "5rem"}>
            나의 프로젝트들
          </TypingText>
        </Title>
        <Description ref={descriptionRef}>
          <p>
            Quisque et nisl nulla. nec bibendum turpis enim, a gravida massa
          </p>
          {!isMobile && (
            <>
              <p>
                maximus quis. Duis ante ex, volutpat ac pulvinar at, feugiat non
                enim.
              </p>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
            </>
          )}
        </Description>
      </Container>
      <GridItems />
      <ScrollAnimContainer
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
          marginTop: "5vh",
        }}
        from={true}
        anim={{ opacity: 0, scale: 0.3 }}
      >
        <Button onClick={() => navigate("/projects")}>전체보기</Button>
      </ScrollAnimContainer>
    </>
  );
}

export default MyProjects;

const Container = styled.div`
  padding: 0 5vw;
  margin-bottom: 10vh;
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
