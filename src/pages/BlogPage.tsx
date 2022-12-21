import React, { useRef, useEffect } from "react";
import gsap from "gsap";
import styled from "styled-components";

import { colors } from "../color";
import Blog from "../components/Home/Blog";
import ProjectsPageHeader from "../components/ProjectsPageHeader";
import { useMobile } from "../utils/useMobile";
import TypingText from "../hooks/TypingText";
import { bounceAnim } from "../utils/bounceAnim";

function BlogPage() {
  const isMobile = useMobile();
  const titleRef = useRef<HTMLHeadingElement>(null);
  const descriptionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    if (titleRef.current) {
      gsap.to(titleRef.current?.children, {
        ...bounceAnim,
        scrollTrigger: {
          trigger: titleRef.current.children,
          start: "top 60%",
        },
      });
      if (descriptionRef.current) {
        gsap.from(descriptionRef.current?.children, {
          delay: 0.5,
          opacity: 0,
          y: 30,
          duration: 0.8,
          stagger: {
            each: 0.2,
          },
        });
      }
    }
  });
  return (
    <Container>
      <ProjectsPageHeader text="BLOG" />
      <Title size={isMobile ? "3rem" : "5rem"} ref={titleRef}>
        <TypingText size={isMobile ? "3rem" : "5rem"}>블로그</TypingText>
      </Title>
      <Description ref={descriptionRef}>
        <section>
          알고리즘 스터디, SSAFY 에서 배운내용 그리고 개인적으로 공부한 내용을
          노션에 기록했습니다.
        </section>
        <section>
          노션에서만 볼 수 있는 점이 아쉬워서, 노션 API 를 사용해서 블로그
          형태로 만들어 보았습니다.
        </section>
        <section>
          여기 게시글은 저의 개인 공부목적이 강하며, 저의 블로그는
          <StrongText target="_blank" href="https://velog.io/@hunmok1027">
            개인 블로그
          </StrongText>
          에서 더 자세하게 볼 수 있습니다.
        </section>
      </Description>
      <Blog show={true} />
    </Container>
  );
}

export default BlogPage;
const StrongText = styled.a`
  color: ${colors.link};
  margin: 0 0.5rem;
`;

const Description = styled.div`
  padding: 1rem 3rem;
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
export const Title = styled.h2<any>`
  padding: 2rem 5vw;
  font-size: ${(p) => p.size};
  font-family: "BM-Pro";
  color: ${colors.fluor};
  margin-bottom: 2rem;
  display: flex;
`;

const Container = styled.div`
  padding: 0 0 10vh 0;
  background-color: ${colors.lightBlack};
  min-height: 100vh;
  z-index: 9;
`;
