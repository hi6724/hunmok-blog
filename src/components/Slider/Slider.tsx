import React, { ReactElement, useRef, useEffect } from "react";
import Slider, { Settings } from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import styled from "styled-components";
import { colors } from "../../color";
import Lottie from "lottie-react";
import swipeLeft from "../../assets/swipeLeftColor.json";
import gsap from "gsap";
import { useRecoilState } from "recoil";
import { swipeAtom } from "../../atom/swipeAtom";

interface Props {
  children: ReactElement[];
  width?: string;
  settings?: Settings;
}

function MySlider({ children, width = "100vw", settings }: Props) {
  const coverRef = useRef<HTMLDivElement>(null);
  const [swiped, setSwiped] = useRecoilState(swipeAtom);
  useEffect(() => {
    if (!coverRef.current) return;
    gsap.to(coverRef.current, {
      scrollTrigger: {
        trigger: coverRef.current,
        start: "top 30%",
      },
      opacity: 0,
      display: "none",
      duration: 0.4,
      delay: 2,
      onComplete: () => setSwiped(true),
    });
  }, []);
  return (
    <Container width={width}>
      <Slider
        {...settings}
        autoplay={true}
        autoplaySpeed={3000}
        infinite={true}
      >
        {children.map((item, key) => (
          <div key={key}>{item}</div>
        ))}
      </Slider>
      {!swiped && (
        <Cover ref={coverRef} onClick={() => setSwiped(true)}>
          <Lottie
            animationData={swipeLeft}
            loop={true}
            style={{
              width: "300px",
            }}
          />
        </Cover>
      )}
    </Container>
  );
}

export default MySlider;

interface ContainerProp {
  width?: string;
}

export const Container = styled.div<ContainerProp>`
  position: relative;
  width: ${({ width }) => (width ? width : "100vw")};
  position: relative;
  .slick-slide {
    display: flex;
    justify-content: center;
  }
  .slick-dots > li > button:before {
    color: ${colors.lightGray};
  }
`;
const Cover = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.7);
  width: 100%;
  height: 100%;
`;
