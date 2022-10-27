import gsap from "gsap";
import React, { useEffect, useRef, useState } from "react";
import ReactLoading from "react-loading";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import useSWR from "swr";
import { colors } from "../../color";

import { getProjectsApi } from "../../utils/apiRoutes";
import { useMobile } from "../../utils/useMobile";
import Button from "../Button";

interface IProject {
  id: string;
  icon: string;
  thumbImageUri: string;
  title: string;
  type: string;
  startData: string;
  endDate: string;
  skills: string[];
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
      setFirstLine([...projects.slice(0, 5), ...projects.slice(0, 5)]);
      setSecondLine([...projects.slice(5, 10), ...projects.slice(5, 10)]);
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
    console.log("flip!");
    if (i < 5) {
      next = (i % 5) + 5;
    } else {
      next = i % 5;
    }

    if (isFocus.current[index] === -1) isFocus.current[index] = i;
    else {
      if (isFocus.current[index] !== i) {
        return;
      }
      isFocus.current[index] = -1;
    }

    const parent = ref.current[index];
    animateRef.current[index].kill();

    gsap.getTweensOf(ref.current[index])[0].paused()
      ? gsap.getTweensOf(ref.current[index])[0].play()
      : gsap.getTweensOf(ref.current[index])[0].pause();

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
    ref.current !== null &&
      ref.current.forEach((el, i) => {
        gsap.from(el.children, {
          scale: 0.2,
          opacity: 0,
          duration: 0.4,
          scrollTrigger: {
            trigger: ref.current,
            start: "top center",
          },
          stagger: {
            grid: "auto",
            from: "start",
            each: 0.1,
          },
        });
        animateRef.current[i] = gsap.to(el, {
          duration: isMobile ? 30 : 20,
          repeat: -1,
          ease: "linear",
          x:
            i === 0
              ? isMobile
                ? "-=300vw"
                : "-=125vw"
              : isMobile
              ? "+=300vw"
              : "+=125vw",
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
  @media screen and (max-width: 1000px) {
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
  return (
    <BackSideContainer>
      <Header>
        <h3>{project.type}</h3>
        <h1>{project.title}</h1>
      </Header>
      <div>
        <ShortDescription>
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
            fontSize: "3vw",
            padding: "2vw",
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
`;
const DateContainer = styled.div`
  font-size: 2vw;
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
`;
