import React, { useEffect, useRef, useState } from "react";
import {
  AiFillCalendar,
  AiFillPieChart,
  AiOutlineUnorderedList,
} from "react-icons/ai";
import styled from "styled-components";
import { colors } from "../color";
import { useMobile } from "../utils/useMobile";
import { getTypeColor } from "./Home/Blog";

function DetailHeader({ info }: any) {
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
          <SkillItems
            style={{
              display: "grid",
              gridTemplateColumns: isMobile
                ? "1fr 1fr 1fr"
                : "repeat(auto-fill, minmax(8rem, 1fr))",

              width: "100%",
            }}
          >
            {info.skills.map((skill: string, i: number) => (
              <li key={i}>{skill}</li>
            ))}
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
        <SkillContainer>
          <p>
            <AiFillPieChart />
            요약
          </p>
          <ul>{info.overview}</ul>
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
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
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
  ul {
    display: flex;
    gap: 0.2rem;
    li {
      border-radius: 0.3rem;
      padding: 0.2rem 0.4rem;
      color: ${colors.darkBlack};
      background-color: ${colors.darkGray};
    }
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
