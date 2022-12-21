import gsap from "gsap";
import React, { useEffect, useRef, useState } from "react";
import ReactLoading from "react-loading";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import useSWR from "swr";
import { colors } from "../../color";

import { getProjectsApi } from "../../utils/apiRoutes";
import { overflowOneLineText } from "../../utils/overflowText";
import { useMobile } from "../../utils/useMobile";
import Button from "../Button";

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

function GridItems() {
  const isMobile = useMobile();
  const ref = useRef<HTMLDivElement[]>([]);
  const { data: projects } = useSWR<IProject[]>(getProjectsApi);
  const [firstLine, setFirstLine] = useState<IProject[]>([]);
  const [secondLine, setSecondLine] = useState<IProject[]>([]);

  const animateRef = useRef<gsap.core.Tween[]>([]);
  const isFocus = useRef<number[]>([-1, -1]);

  useEffect(() => {
    if (projects) {
      const half = Math.floor(projects.length / 2);
      setFirstLine([...projects.slice(0, half), ...projects.slice(0, half)]);
      setSecondLine([
        ...projects.slice(half, projects.length),
        ...projects.slice(half, projects.length),
      ]);
    }
  }, [projects]);

  const flipToBack = (item: Element) => {
    gsap.to(item, {
      duration: 0.4,
      rotateX: 180,
    });
  };

  const flipToFront = (item: Element) => {
    gsap.to(item, {
      duration: 0.4,
      rotateX: 0,
    });
  };
  const handleFlip = (index: number, i: number) => {
    let next;
    let half = Math.floor(firstLine.length / 2);
    if (index === 1) half = Math.floor(secondLine.length / 2);

    if (i < half) {
      next = (i % half) + half;
    } else {
      next = i % half;
    }

    if (isFocus.current[index] === -1) isFocus.current[index] = i;
    else {
      if (isFocus.current[index] !== i) {
        return;
      }
      isFocus.current[index] = -1;
    }

    const parent = ref.current[index];
    animateRef.current[index].paused()
      ? animateRef.current[index].play()
      : animateRef.current[index].pause();

    const clickedElement = parent.children[i];
    const nextElement = parent.children[next];
    if (clickedElement.getAttribute("rotate") === "true") {
      flipToFront(clickedElement);
      flipToFront(nextElement);
      clickedElement.setAttribute("rotate", "false");
      nextElement.setAttribute("rotate", "false");
    } else {
      flipToBack(clickedElement);
      flipToBack(nextElement);
      clickedElement.setAttribute("rotate", "true");
      nextElement.setAttribute("rotate", "true");
    }
  };

  useEffect(() => {
    if (!ref.current) return;
    ref.current.forEach((el, i) => {
      const half = Math.floor(el.children.length / 2);
      if (!el.children) return;
      gsap.fromTo(
        el.children,
        {
          scale: 0.2,
          opacity: 0,
          duration: 0.4,
        },
        {
          scrollTrigger: {
            trigger: ref.current,
            start: "top center",
          },
          stagger: {
            grid: "auto",
            from: "start",
            each: 0.1,
          },
          scale: 1,
          opacity: 1,
        }
      );
      animateRef.current[i] = gsap.to(el, {
        duration: isMobile ? half * 3 : half * 2,
        repeat: -1,
        ease: "linear",
        x:
          i === 0
            ? isMobile
              ? `-=${half * 60}vw`
              : `-=${half * 25}vw`
            : isMobile
            ? `+=${half * 60}vw`
            : `+=${half * 25}vw`,
      });
    });
  });

  return (
    <Container>
      {projects === undefined ? (
        <ReactLoading
          type={"spokes"}
          color={colors.fluor}
          height={"10vw"}
          width={"10vw"}
        />
      ) : (
        <>
          <ProjectWrapper ref={(el: HTMLDivElement) => (ref.current[0] = el)}>
            {firstLine.map((project, i: number) => (
              <Item
                isMobile={isMobile}
                className="card"
                key={i + "_" + project.id}
                onMouseDown={(e: any) => {
                  e.target.tagName !== "BUTTON"
                    ? handleFlip(0, i)
                    : console.log("GO!");
                }}
              >
                <FrontSide src={project.thumbImageUri} alt="" />
                <BackSide project={project} />
              </Item>
            ))}
          </ProjectWrapper>

          <ProjectWrapper
            reverse
            ref={(el: HTMLDivElement) => (ref.current[1] = el)}
          >
            {secondLine.map((project, i: number) => (
              <Item
                isMobile={isMobile}
                key={i + "_" + project.id}
                onMouseDown={(e: any) => {
                  e.target.tagName !== "BUTTON"
                    ? handleFlip(1, i)
                    : console.log("GO!");
                }}
              >
                <FrontSide src={project.thumbImageUri} alt="" />
                <BackSide project={project} />
              </Item>
            ))}
          </ProjectWrapper>
        </>
      )}
    </Container>
  );
}

export default GridItems;

const ProjectWrapper = styled.div<any>`
  display: flex;
  flex-direction: ${(p) => (p.reverse ? "row-reverse" : "row")};
`;

const Container = styled.div`
  height: 50vw;
  @media screen and (max-width: 1000px) {
    height: 120vw;
  }
`;

const Item = styled.div<any>`
  width: 100%;
  min-width: ${(p) => (p.isMobile ? "60vw" : "25vw")};
  aspect-ratio: 1;
  position: relative;
  transform-style: preserve-3d;
`;

const FrontSide = styled.img`
  position: absolute;
  width: 100%;
  height: 100%;
  object-fit: cover;
  backface-visibility: hidden;
`;

function BackSide({ project }: { project: IProject }) {
  const navigate = useNavigate();
  const isMobile = useMobile();

  return (
    <BackSideContainer>
      <Header>
        <h3>{project.type}</h3>
        <h1>{project.title}</h1>
      </Header>
      <div>
        <ShortDescription>
          {project.overview}
          여기에 프로젝트에 관련한 간단한 설명이 들어갈예정입니다~ 여기에
          프로젝트에 관련한 간단한 설명이 들어갈예정입니다~
        </ShortDescription>
      </div>
      <TypeContainer>
        {project.skills.map((skill, i) => (
          <span key={i}>{skill}</span>
        ))}
      </TypeContainer>
      <DateContainer>
        <span>{project.startData}</span>
        <span> ~ </span>
        <span>{project.endDate}</span>
      </DateContainer>
      <div style={{ display: "flex", flexDirection: "row-reverse" }}>
        <Button
          style={{
            width: "inherit",
            backgroundColor: colors.lightGray,
            color: colors.link,
            fontSize: isMobile ? "3vw" : "0.9rem",
            padding: isMobile ? "2vw" : "0.6rem",
          }}
          onClick={() => navigate(`/projects/${project.id}`)}
        >
          자세히보기
        </Button>
      </div>
    </BackSideContainer>
  );
}
const ShortDescription = styled.p`
  font-family: sans-serif;
  font-size: 3vw;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  @media screen and (min-width: 1000px) {
    font-size: 1.1rem;
  }
`;
const DateContainer = styled.div`
  font-size: 2vw;
  @media screen and (min-width: 1000px) {
    font-size: 1rem;
  }
`;
const Header = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2vw;
  h3 {
    padding-bottom: 2vw;
    border-bottom: 1px solid ${colors.darkGray};
    font-size: 2vw;
    color: ${colors.darkGray};
  }
  h1 {
    font-family: "NEXON";
    font-size: 4vw;
    ${overflowOneLineText}
  }
  @media screen and (min-width: 1000px) {
    gap: 0.5rem;
    h3 {
      padding-bottom: 0.7rem;
      font-size: 1rem;
    }
    h1 {
      font-family: "NEXON";
      font-size: 1.5rem;
    }
  }
`;
const TypeContainer = styled.div`
  overflow: scroll;
  white-space: nowrap;
  padding: 1vw 0;
  ::-webkit-scrollbar {
    display: none;
  }
  span {
    font-size: 3vw;
    background-color: ${colors.darkGray};
    padding: 0.5vw 1vw;
    /* color: ${colors.lightGray}; */
    border-radius: 100rem;
    margin-right: 0.1rem;
  }
  @media screen and (min-width: 1000px) {
    padding: 1rem 0 1rem;
    span {
      font-size: 0.8rem;
      padding: 0.2rem 0.4rem;
      margin-right: 0.1rem;
    }
  }
`;

const BackSideContainer = styled.div`
  width: 95%;
  height: 95%;
  position: absolute;
  top: 2.5%;
  left: 2.5%;
  background-color: ${colors.lightGray};
  border-radius: 1rem;
  transform: rotateX(180deg);
  backface-visibility: hidden;
  padding: 3vw;
  font-family: "NEXON-Bold";
  display: flex;
  flex-direction: column;
  gap: 4vw;
  box-shadow: rgba(50, 50, 50, 0.4) 0px 2px 4px,
    rgba(50, 50, 50, 0.3) 0px 7px 13px -3px,
    rgba(50, 50, 50, 0.2) 0px -3px 0px inset;
  @media screen and (min-width: 1000px) {
    padding: 1rem;
    gap: 0.5rem;
  }
`;
