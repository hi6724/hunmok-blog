import React, { useEffect, useState } from "react";
import { AiFillCalendar, AiOutlineUnorderedList } from "react-icons/ai";
import styled from "styled-components";
import { colors } from "../color";
import { useMobile } from "../utils/useMobile";
import skillIcons from "../assets/skills/index";

function DetailHeader({ info }: any) {
  const skillIconsNames = skillIcons.map(
    (str) => str.split("icons8-")[1].split(".")[0]
  );
  const [icon, setIcon] = useState("");
  const isMobile = useMobile();
  useEffect(() => {
    if (!info.icon) return;
    const iconType = info.icon.type;
    if (info.icon.type === "file") {
      setIcon(info.icon.file.url);
    } else {
      setIcon(info.icon[iconType]);
    }
  });
  console.log(icon);
  return (
    <div style={{ position: "relative" }}>
      <CoverContainer>
        <img src={info.cover} style={{ position: "absolute", width: "100%" }} />
        <Icon>{icon.length > 10 ? <img src={icon} /> : icon}</Icon>
      </CoverContainer>
      <Title>
        <h1>{info.title}</h1>
      </Title>
      <Container>
        <SkillContainer>
          <p>
            <AiOutlineUnorderedList />
            기술스택
          </p>
          <SkillItems style={{ display: "grid" }}>
            {info.skills.map((skill: string, i: number) => {
              const index = skillIconsNames
                .map((iconName, i) => iconName == skill)
                .indexOf(true);
              if (index > 0) {
                return (
                  <li key={i}>
                    <img src={skillIcons[index]} />
                    <p>{skill}</p>
                  </li>
                );
              }
              return (
                <li key={i} style={{ padding: "0 0.4rem" }}>
                  <p>{skill}</p>
                </li>
              );
            })}
          </SkillItems>
        </SkillContainer>
        <SkillContainer>
          <p>
            <AiFillCalendar />
            진행기간
          </p>
          <ul>
            {info.start} ~ {info.end}
          </ul>
        </SkillContainer>

        <Header>
          <h3>{info.type}</h3>
          <CreatedAt>작성일 : {info.createdAt.split("T")[0]}</CreatedAt>
        </Header>
      </Container>
    </div>
  );
}

export default DetailHeader;

const SkillItems = styled.ul`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(auto-fill, 200px);
  gap: 0.2rem;
  li {
    border-radius: 0.3rem;
    padding: 0.2rem 0.4rem;
    color: ${colors.darkBlack};
    background-color: ${colors.darkGray};
    display: flex;
    align-items: center;
    height: 40px;
    font-family: "BM-Pro";
    color: ${colors.lightBlack};
    p {
      font-size: 1.2rem;
      word-break: break-all;
    }
    img,
    span {
      font-size: 1.5rem;
      width: 2rem;
    }
  }
  @media (max-width: 1000px) {
    grid-template-columns: repeat(auto-fill, 115px);
    li {
      padding: 0;
      p {
        font-size: 0.8rem;
      }
    }
  }
`;
const SkillContainer = styled.div`
  color: ${colors.white};
  font-family: "NEXON";
  display: flex;
  align-items: center;
  gap: 1rem;
  p {
    display: flex;
    align-items: center;
    gap: 0.2rem;
    min-width: 5rem;
  }
`;
const CoverContainer = styled.div`
  position: relative;
  width: 100%;
  aspect-ratio: 16/6;
  object-fit: contain;
  margin-bottom: 3rem;
  img {
    position: absolute;
    width: 100%;
    object-fit: cover;
    aspect-ratio: 16/6;
    top: 50%;
    transform: translate(0, -50%);
  }
`;

const Icon = styled.span`
  img {
    width: 2.5rem;
    height: 2.5rem;
  }
  font-size: 5rem;
  position: absolute;
  bottom: 0;
  transform: translateY(30%);
`;

const Container = styled.div<any>`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 1rem 0;
`;

const Header = styled.div<any>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-family: "BM-Jua";
  border-bottom: 2px solid ${colors.lightGreen};
  h3 {
    color: ${colors.lightGreen};
    font-size: 2rem;
    text-transform: uppercase;
    margin: 1rem 0;
  }
`;

const CreatedAt = styled.span`
  color: ${colors.darkGray};
`;

const Title = styled.div`
  display: flex;
  align-items: center;
  font-size: 2rem;
  font-family: "BM-Pro";
  color: ${colors.lightGray};
  gap: 1rem;
`;
