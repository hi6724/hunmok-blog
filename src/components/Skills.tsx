import gsap from "gsap";
import React, { useEffect, useRef } from "react";
import styled from "styled-components";
import { colors } from "../color";
import { getTypeColor } from "./Home/Blog";

interface ISkill {
  title: string;
  type: string;
  value: number;
}

const SKILL_DATA: ISkill[] = [
  {
    title: "FrontEnd",
    type: "frontend",
    value: 80,
  },
  {
    title: "ReactJs",
    type: "frontend",
    value: 70,
  },
  {
    title: "NextJs",
    type: "fullstack",
    value: 50,
  },
  {
    title: "BackEnd",
    type: "backend",
    value: 50,
  },
];

function Skill({ skillData }: { skillData: ISkill }) {
  const arrowRef = useRef<any>();
  useEffect(() => {
    gsap.from(arrowRef.current, {
      width: 0,
      duration: 1,
      delay: 1.4,
    });
  });
  return (
    <SkillContainer>
      <h1>{skillData.title}</h1>
      <Arrow value={skillData.value} type={skillData.type}>
        <div></div>
        <figure ref={arrowRef}></figure>
      </Arrow>
    </SkillContainer>
  );
}

function Skills() {
  return (
    <SkillsContainer>
      {SKILL_DATA.map((skill) => (
        <Skill skillData={skill} />
      ))}
    </SkillsContainer>
  );
}

export default Skills;
const Arrow = styled.div<any>`
  width: 100%;
  padding: 0.5rem 0;
  position: relative;
  div {
    width: 100%;
    height: 1px;
    position: absolute;
    bottom: 0;
    background-color: ${colors.darkGray};
  }
  figure {
    width: ${({ value }) => value}%;
    height: 3px;
    position: absolute;
    bottom: -1px;
    background-color: ${({ type }) => getTypeColor(type)};
  }
`;
const SkillsContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 3rem 0;
  gap: 2rem;
`;
const SkillContainer = styled.div`
  h1 {
    font-family: "BM-Pro";
    font-size: 1.5rem;
  }
`;
