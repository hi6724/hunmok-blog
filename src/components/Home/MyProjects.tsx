import gsap from "gsap";
import React, { useEffect, useRef } from "react";
import styled from "styled-components";

import { colors } from "../../color";
import TypingText from "../../hooks/TypingText";
import { bounceAnim } from "../../utils/bounceAnim";
import GridItems from "../GridItems/GridItems";

function MyProjects() {
  const ref = useRef<any>();

  useEffect(() => {
    if (ref.current !== null) {
      gsap.to(ref.current.children, {
        ...bounceAnim,
        scrollTrigger: {
          trigger: ref.current.children,
          start: "top 60%",
        },
      });
    }
  });

  return (
    <>
      <Container>
        <Title ref={ref}>
          <TypingText size={4}>My Projects</TypingText>
        </Title>
        <Description>
          <p>
            Quisque et nisl nulla. nec bibendum turpis enim, a gravida massa
          </p>
          <p>
            maximus quis. Duis ante ex, volutpat ac pulvinar at, feugiat non
            enim.
          </p>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        </Description>
      </Container>
      <GridItems />
    </>
  );
}

export default MyProjects;

const Container = styled.div`
  padding: 0 5vw;
  margin-bottom: 10vh;
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
`;
