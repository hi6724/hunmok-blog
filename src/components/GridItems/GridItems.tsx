import MySlider from "../Slider/Slider";
import ReactLoading from "react-loading";
import styled from "styled-components";
import useSWR from "swr";
import { colors } from "../../color";

import { getProjectsApi } from "../../utils/apiRoutes";
import SliderItem from "./SliderItem";

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
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
        infinite: true,
      },
    },
  ],
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
          <SliderItem key={project.id} project={project} />
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
