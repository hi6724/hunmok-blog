import React, { useRef, useEffect } from "react";
import gsap from "gsap";
import styled from "styled-components";

import { colors } from "../color";
import Blog from "../components/Home/Blog";
import TypingText from "../hooks/TypingText";
import { bounceAnim } from "../utils/bounceAnim";
import { useMobile } from "../utils/useMobile";
import Dropdown from "../components/Dropdown";

function BlogPage() {
  const isMobile = useMobile();

  const titleRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (titleRef.current) {
      gsap.to(titleRef.current?.children, {
        ...bounceAnim,
      });
    }
  }, []);

  return (
    <Container>
      <HeaderContainer>
        <Title size={isMobile ? "3rem" : "5rem"} ref={titleRef}>
          <TypingText size={isMobile ? "3rem" : "5rem"}>블로그</TypingText>
        </Title>
        <Dropdown />
        {/* <ul>
          <li>frontend</li>
          <li>algorithm</li>
          <li>backend</li>
        </ul> */}
      </HeaderContainer>
      <Blog show={true} />
    </Container>
  );
}

export default BlogPage;

const Container = styled.div`
  padding: 10vh 0;
  background-color: ${colors.darkBlack};
  min-height: 100vh;
  z-index: 9;
`;

const HeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 5vw;
`;

const Title = styled.h2<any>`
  font-size: ${(p) => p.size};
  font-family: "BM-Pro";
  color: ${colors.fluor};
  margin-bottom: 2rem;
  display: flex;
`;
