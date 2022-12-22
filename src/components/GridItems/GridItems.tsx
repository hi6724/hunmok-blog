import MySlider from "../Slider/Slider";
import gsap from "gsap";
import React, { useEffect, useRef, useState } from "react";
import ReactLoading from "react-loading";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import useSWR from "swr";
import { colors } from "../../color";

import { getProjectsApi } from "../../utils/apiRoutes";

export interface IProject {
  id: string;
  icon: string;
  thumbImageUri: string;
  title: string;
  type: string;
  startData: string;
  endDate: string;
  skills: string[];
  overview: string;
}

const CenteredDiv = styled.div`
  aspect-ratio: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;
const Cover = styled(CenteredDiv)`
  position: absolute;
  background-color: rgba(0, 0, 0, 0.8);
  opacity: 0;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 9;
`;
const Description = styled(CenteredDiv)`
  border-radius: 1rem;
  background-color: white;
  padding: 1rem;
  max-width: 80%;
`;

const SliderCover = ({ project }: { project: IProject }) => {
  const coverRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState([0, 0]);
  const handleMouseDown = (data: React.MouseEvent) => {
    setMousePosition([data.clientX, data.clientY]);
  };
  const handleMouseUp = (data: React.MouseEvent) => {
    const x = Math.abs(mousePosition[0] - data.clientX);
    const y = Math.abs(mousePosition[1] - data.clientY);
    if (x + y < 100) {
      console.log(coverRef.current?.style.opacity);
      gsap.to(coverRef.current, {
        duration: 0.2,
        opacity: coverRef.current?.style!.opacity == "1" ? 0 : 1,
      });
    }
  };

  return (
    <Cover
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      ref={coverRef}
    >
      <Description>
        <h1>{project.title}</h1>
        <p>{project.overview}</p>
      </Description>
    </Cover>
  );
};

const sliderSettings = {
  dots: true,
  infinite: false,
  speed: 500,
  slidesToShow: 3,
  slidesToScroll: 3,
  initialSlide: 0,
  arrows: false,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2,
        infinite: true,
      },
    },
  ],
};

const Item = styled.div`
  background-color: #fff;
  box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
  aspect-ratio: 1;
  position: relative;
  img {
    width: 100%;
    aspect-ratio: 1;
    object-fit: cover;
  }
`;
const SliderItem = ({ project }: { project: IProject }) => {
  return (
    <Item key={project.id}>
      <img src={project.thumbImageUri} alt="" />
      <SliderCover project={project} />
    </Item>
  );
};

function GridItems() {
  const { data: projects, isLoading } = useSWR<IProject[]>(getProjectsApi);
  if (isLoading || !projects)
    return (
      <SliderSection>
        <ReactLoading width={"5rem"} />
      </SliderSection>
    );

  return (
    <SliderSection>
      <MySlider settings={sliderSettings} width="90vw">
        {projects.map((project) => (
          <SliderItem project={project} />
        ))}
      </MySlider>
    </SliderSection>
  );
}

export default GridItems;

const SliderSection = styled.section`
  width: 100%;
  background-color: ${colors.lightBlack};
  padding: 4rem 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 3rem;
  h2 {
    font-size: 2.2rem;
    font-weight: 600;
  }
  .slick-slide > div {
    width: 100%;
  }
`;
