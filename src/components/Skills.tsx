import gsap from "gsap";
import React, { useEffect, useRef, useState } from "react";
import { AiOutlineDown, AiOutlineUp } from "react-icons/ai";
import styled from "styled-components";
import { colors } from "../color";
import { getTypeColor } from "./Home/Blog";
import skillIcons from "../assets/skills/index";
import { useRecoilState, useRecoilValue } from "recoil";
import { aboutMeDetailAtom, detailHeightAtom } from "../atom/aboutMeAtom";
import { ISkill, SKILL_DATA } from "../data/skills";

function Skill({ skillData, detail }: { skillData: ISkill; detail: boolean }) {
  const skillBoxRef = useRef<HTMLDivElement>(null);
  const heightRef = useRef<number>(0);
  const arrowRef = useRef<any>();

  const skillIconsNames = skillIcons.map(
    (str) => str.split("icons8-")[1].split(".")[0]
  );

  const [openIndex, setOpenIndex] = useRecoilState(aboutMeDetailAtom);
  const [detailHeight, setDetailHeight] = useRecoilState(detailHeightAtom);

  const handleOpen = () => {
    setDetailHeight(openIndex !== skillData.title ? heightRef.current : 0);
    setOpenIndex(openIndex === skillData.title ? "" : skillData.title);
  };
  useEffect(() => {
    if (skillBoxRef.current) {
      gsap.to(skillBoxRef.current, {
        height: openIndex === skillData.title ? heightRef.current : 0,
      });
    }
  }, [openIndex]);

  useEffect(() => {
    if (arrowRef.current) {
      gsap.from(arrowRef.current, {
        width: 0,
        duration: 1,
        delay: 1.8,
      });
    }
    if (skillBoxRef?.current) {
      gsap.to(skillBoxRef?.current, {
        height: openIndex === skillData.title ? detailHeight : 0,
      });
      heightRef.current = skillBoxRef?.current?.clientHeight;
    }
  }, []);
  return (
    <SkillContainer>
      {!detail ? (
        <>
          <h1>{skillData.title}</h1>
          <Arrow value={skillData.value} type={skillData.type}>
            <div></div>
            <figure ref={arrowRef}></figure>
          </Arrow>
        </>
      ) : (
        <>
          <h1 style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
            {skillData.title}{" "}
            {openIndex !== skillData.title ? (
              <AiOutlineDown
                onClick={handleOpen}
                style={{ cursor: "pointer" }}
              />
            ) : (
              <AiOutlineUp onClick={handleOpen} style={{ cursor: "pointer" }} />
            )}
          </h1>
          <Arrow value={skillData.value} type={skillData.type}>
            <div></div>
            <figure ref={arrowRef}></figure>
          </Arrow>
          <DetailSection
            ref={skillBoxRef}
            typeColor={getTypeColor(skillData.title.toLowerCase())}
          >
            {skillData.details.map((detailData, i) => {
              return (
                <DetailCard key={i}>
                  <TitleContainer>
                    {detailData.title
                      .split("&")
                      .map((str) => str.trim().toLowerCase())
                      .map((str) => skillIconsNames.indexOf(str))
                      .map((index, i) => (
                        <div key={i}>
                          <img src={skillIcons[index]} alt="" />
                          <h1>{detailData.title.split("&")[i]}</h1>
                        </div>
                      ))}
                  </TitleContainer>
                  <Divider />
                  <p style={{ whiteSpace: "break-spaces" }}>
                    {detailData.description.trim()}
                  </p>
                </DetailCard>
              );
            })}
          </DetailSection>
        </>
      )}
    </SkillContainer>
  );
}

function Skills({ detail, ...rest }: { detail: boolean; [key: string]: any }) {
  const detailHeight = useRecoilValue(detailHeightAtom);

  return (
    <SkillsContainer {...rest} height={480 + detailHeight}>
      {SKILL_DATA.map((skill, i) => (
        <Skill skillData={skill} detail={detail} key={i} />
      ))}
    </SkillsContainer>
  );
}

function hexToRgba(str: string, opacity: number) {
  const hex = str.split("#")[1];
  const bigint = parseInt(hex, 16);
  const r = (bigint >> 16) & 255;
  const g = (bigint >> 8) & 255;
  const b = bigint & 255;

  return `rgba(${r},${g},${b},${opacity})`;
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
const SkillsContainer = styled.div<any>`
  height: ${(p) => p.height}px;
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
const DetailSection = styled.section<any>`
  box-shadow: 0 0 20px 2px ${(p) => hexToRgba(p.typeColor, 0.2)};

  overflow: hidden;
  background: ${colors.darkBlack};
  border-radius: 1rem;
  margin: 1rem 0;
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

const Divider = styled.div`
  height: 2px;
  margin: 0.5rem 0;
  background-color: ${colors.darkGray};
`;

const DetailCard = styled.div`
  display: flex;
  flex-direction: column;
  padding: 1rem;
  p {
    font-size: 1rem;
    margin-left: 1rem;
  }
`;
const TitleContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  div {
    display: flex;
    align-items: center;
    gap: 4px;
  }
  h1 {
    font-size: 1.5rem;
  }
  img {
    width: 2rem;
    height: 2rem;
  }
`;
