import gsap from "gsap";
import React, { useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";

import { colors } from "../../color";
import TypingText from "../../hooks/TypingText";
import { bounceAnim } from "../../utils/bounceAnim";
import { useMobile } from "../../utils/useMobile";
import Button from "../Button";
import GradientButton from "../GradientButton";
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
          <p>2021년부터 프론트엔드를 공부해 오면서 진행한, 프로젝트들입니다.</p>
          <p>
            저의 프로젝트에 관심이 있으시다면{" "}
            <Link
              to={"/projects"}
              style={{ color: colors.link, cursor: "pointer" }}
            >
              자세히보기
            </Link>
            를 클릭해주세요
          </p>
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
        <GradientButton onClick={() => navigate("/projects")}>
          프로젝트 자세히보기
        </GradientButton>
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
  font-family: "BM-Air";
  line-height: 1.5rem;
  color: ${colors.white};
  display: flex;
  flex-direction: column;
  gap: 1rem;
  font-size: 1.2rem;
`;
