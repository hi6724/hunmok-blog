import styled from "styled-components";
import { IProject } from "./GridItems";

import React from "react";
import SliderCover from "./SliderCover";

function SliderItem({ project }: { project: IProject }) {
  return (
    <Item key={project.id}>
      <img src={project.thumbImageUri} alt="" />
      <SliderCover project={project} />
    </Item>
  );
}

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
export default SliderItem;
