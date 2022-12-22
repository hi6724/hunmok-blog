import { IProject } from "./GridItems";
import { useNavigate } from "react-router-dom";
import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import styled from "styled-components";
import Button from "../Button";
import { colors } from "../../color";
import {
  overflowMultiLineText,
  overflowOneLineText,
} from "../../utils/overflowText";
import skillIcons from "../../assets/skills/index";

function SliderCover({ project }: { project: IProject }) {
  const coverRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState([0, 0]);
  const navigate = useNavigate();
  const skillIconsNames = skillIcons.map(
    (str) => str.split("icons8-")[1].split(".")[0]
  );
  const handleMouseDown = (data: React.MouseEvent) => {
    setMousePosition([data.clientX, data.clientY]);
  };
  const handleMouseUp = (data: React.MouseEvent) => {
    const x = Math.abs(mousePosition[0] - data.clientX);
    const y = Math.abs(mousePosition[1] - data.clientY);
    if (x + y < 100) {
      gsap.to(coverRef.current, {
        duration: 0.2,
        opacity: coverRef.current?.style!.opacity == "1" ? 0 : 1,
      });
    }
  };
  const handleClick = () => {
    if (coverRef.current?.style!.opacity != "1") return;
    navigate(`/projects/${project.id}`);
  };

  const SkillIcon = ({ str }: { str: string }) => {
    const index = skillIconsNames
      .map((iconName) => iconName == str)
      .indexOf(true);
    if (index < 0) return null;
    return <img src={skillIcons[index]} />;
  };

  return (
    <Cover
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      ref={coverRef}
    >
      <Description lines={3}>
        <div>
          <h1>{project.title}</h1>
          <p>{project.overview}</p>
        </div>
        <ul>
          {project.skills.map((str) => (
            <SkillIcon str={str} />
          ))}
        </ul>
        <div>
          <Button style={{ color: colors.fluor }} onClick={handleClick}>
            자세히 보기
          </Button>
        </div>
      </Description>
    </Cover>
  );
}
export default SliderCover;

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
  background-color: ${colors.lightBlack};
  padding: 2rem 1rem;
  max-width: 80%;
  font-family: "NEXON";
  color: ${colors.lightGray};
  justify-content: space-between;
  div {
    width: 100%;
    h1 {
      font-family: "NEXON-Bold";
      font-size: 1.5rem;
      width: 100%;
      ${overflowOneLineText}
      border-bottom: 1px solid ${colors.darkGray};
      padding-bottom: 0.5rem;
      margin-bottom: 1rem;
    }
    p {
      ${overflowMultiLineText}
      line-height: 1.2rem;
      height: 3.6rem;
    }
  }
  div:nth-child(3) {
    display: flex;
    flex-direction: row-reverse;
  }
  ul {
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    img {
      width: 2.5rem;
    }
  }
  @media only screen and (min-width: 1000px) {
    div {
      h1 {
        font-size: 2.5rem;
      }
      p {
        font-size: 1.2rem;
        line-height: 1.5rem;
        height: 4.5rem;
      }
    }
    ul {
      img {
        width: 4rem;
      }
    }
  }
`;
