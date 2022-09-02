import gsap from "gsap";
import React, { useEffect, useRef } from "react";
import styled from "styled-components";
import logoList from "../../assets/logo";

// function animateBoxes(from, axis, ease) {
//   //one stagger call does all the animation:
//   tl.to(".box", {
//       duration: 1,
//       scale: 0.1,
//       y: 60,
//       yoyo: true,
//       repeat: 1,
//       ease: "power1.inOut",
//       stagger: {
//         amount: 1.5,
//         grid: grid,
//         axis: axis,
//         ease: ease,
//         from: from
//       }
//     }
//   );
// }
const TEMP_DATA = Array.from({ length: 10 }, (_, i) => i);
function GridItems() {
  const ref = useRef<HTMLDivElement>(null);

  const flipToBack = (e: React.MouseEvent<HTMLDivElement>) => {
    const { currentTarget } = e;
    gsap.killTweensOf(currentTarget);
    gsap.to(currentTarget, {
      duration: 0.4,
      rotateX: 180,
    });
  };

  const flipToFront = (e: React.MouseEvent<HTMLDivElement>) => {
    const { currentTarget } = e;
    gsap.to(currentTarget, {
      delay: 0.4,
      duration: 0.4,
      rotateX: 0,
    });
  };

  useEffect(() => {
    ref.current !== null &&
      gsap.from(ref.current?.children, {
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
  });

  return (
    <Container ref={ref}>
      {TEMP_DATA.map((el) => (
        <Item
          className="card"
          key={el}
          onMouseOver={flipToBack}
          onMouseLeave={flipToFront}
        >
          <FrontSide src={logoList[el]} alt="" />
          <BackSide />
        </Item>
      ))}
    </Container>
  );
}

export default GridItems;

const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(5, auto);
`;

const Item = styled.div`
  width: 100%;
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
