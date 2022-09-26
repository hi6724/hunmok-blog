import gsap from "gsap";
import React, { useEffect, useRef } from "react";
import styled from "styled-components";

import bear from "../../assets/logo/bear.png";
import eagle from "../../assets/logo/eagle.webp";
import elephant from "../../assets/logo/elephant.jpg";
import gorilla from "../../assets/logo/gorilla.webp";
import king from "../../assets/logo/king.webp";
import man from "../../assets/logo/man.jpg";
import pama from "../../assets/logo/pama.png";
import panda from "../../assets/logo/panda.jpg";
import rogue from "../../assets/logo/rogue.jpg";
import zap from "../../assets/logo/zap.png";
import { useMobile } from "../../utils/useMobile";

const logoList = [
  bear,
  eagle,
  elephant,
  gorilla,
  king,
  man,
  pama,
  panda,
  rogue,
  zap,
];
const FIRST_LINE = Array.from({ length: 10 }, (_, i) => i % 5);
const SECOND_LINE = Array.from({ length: 10 }, (_, i) => (i % 5) + 5);

function GridItems() {
  const isMobile = useMobile();
  const ref = useRef<HTMLDivElement[]>([]);

  const flipToBack = (e: React.TouchEvent | React.MouseEvent) => {
    gsap.to(e.currentTarget, {
      duration: 0.4,
      rotateX: 180,
    });
  };

  const flipToFront = (e: React.TouchEvent | React.MouseEvent) => {
    gsap.to(e.currentTarget, {
      delay: 2,
      duration: 0.4,
      rotateX: 0,
    });
  };

  useEffect(() => {
    ref.current !== null &&
      ref.current.forEach((el, i) => {
        gsap.from(el.children, {
          scale: 0.2,
          opacity: 0,
          duration: 0.4,
          scrollTrigger: {
            trigger: ref.current,
            start: "top center",
          },
          stagger: {
            grid: "auto",
            from: "start",
            each: 0.1,
          },
        });
        gsap.to(el, {
          duration: 30,
          repeat: -1,
          ease: "linear",
          x:
            i === 0
              ? isMobile
                ? "-=200%"
                : "-=100%"
              : isMobile
              ? "+=200%"
              : "+=100%",
        });
      });
  });

  return (
    <Container>
      <ProjectWrapper ref={(el: HTMLDivElement) => (ref.current[0] = el)}>
        {FIRST_LINE.map((el, i) => (
          <Item
            isMobile={isMobile}
            className="card"
            key={i}
            onTouchStart={flipToBack}
            onTouchEnd={flipToFront}
            onMouseDown={flipToBack}
            onMouseLeave={flipToFront}
          >
            <FrontSide src={logoList[el]} alt="" />
            <BackSide onClick={() => console.log("work")} />
          </Item>
        ))}
      </ProjectWrapper>

      <ProjectWrapper
        reverse
        ref={(el: HTMLDivElement) => (ref.current[1] = el)}
      >
        {SECOND_LINE.map((el, i) => (
          <Item
            isMobile={isMobile}
            key={i}
            onTouchStart={flipToBack}
            onTouchEnd={flipToFront}
            onMouseDown={flipToBack}
            onMouseLeave={flipToFront}
          >
            <FrontSide src={logoList[el]} alt="" />
            <BackSide onClick={() => console.log("work")} />
          </Item>
        ))}
      </ProjectWrapper>
    </Container>
  );
}

export default GridItems;

const ProjectWrapper = styled.div<any>`
  display: flex;
  flex-direction: ${(p) => (p.reverse ? "row-reverse" : "row")};
`;

const Container = styled.div`
  @media screen and (max-width: 1000px) {
  }
`;

const Item = styled.div<any>`
  width: 100%;
  min-width: ${(p) => (p.isMobile ? "40vw" : "25vw")};
  aspect-ratio: 1;
  position: relative;
  transform-style: preserve-3d;
`;

const FrontSide = styled.img`
  position: absolute;
  width: 100%;
  height: 100%;
  object-fit: cover;
  backface-visibility: hidden;
`;

const BackSide = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  background-color: tomato;
  transform: rotateX(180deg);
  backface-visibility: hidden;
`;
