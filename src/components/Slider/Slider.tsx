import React, { ReactElement } from "react";
import Slider, { Settings } from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import styled from "styled-components";

interface Props {
  children: ReactElement[];
  width?: string;
  settings?: Settings;
}

function MySlider({ children, width = "100vw", settings }: Props) {
  return (
    <Container width={width}>
      <Slider {...settings} autoplay={false} autoplaySpeed={1000}>
        {children.map((item, key) => (
          <div key={key}>{item}</div>
        ))}
      </Slider>
    </Container>
  );
}

export default MySlider;

interface ContainerProp {
  width?: string;
}

export const Container = styled.div<ContainerProp>`
  max-width: ${({ width }) => (width ? width : "100vw")};
  position: relative;
  .slick-slide {
    display: flex;
    justify-content: center;
  }
`;
