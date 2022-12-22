import gsap from "gsap";
import React, { useEffect, useRef } from "react";
import { AiOutlineArrowRight } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import useSWR from "swr";
import { colors } from "../color";
import { IProject } from "../components/GridItems/GridItems";
import ProjectsPageHeader from "../components/ProjectsPageHeader";
import { getProjectsApi } from "../utils/apiRoutes";
import { useMobile } from "../utils/useMobile";
import ScrollTrigger from "gsap/ScrollTrigger";
import ProjectsCard from "../components/ProjectsCard";
import TypingText from "../hooks/TypingText";
import { bounceAnim } from "../utils/bounceAnim";

const anim = {
  open: {
    y: 0,
    autoAlpha: 1,
    overwrite: true,
    duration: 0.6,
  },
  close: {
    y: 100,
    duration: 0.3,
    autoAlpha: 0,
    overwrite: true,
  },
};

function ProjectsPage() {
  const isMobile = useMobile();
  const navigate = useNavigate();
  const { data: projects } = useSWR<IProject[]>(getProjectsApi);
  const ref = useRef<any>();
  const titleRef = useRef<any>();
  const animated = useRef<any>(true);
  useEffect(() => {
    window.scrollTo(0, 0);
    if (titleRef.current && animated.current) {
      gsap.to(titleRef.current?.children, {
        ...bounceAnim,
        onStart: () => {
          animated.current = false;
        },
      });
    }
    if (ref.current) {
      gsap.set(ref.current?.children, {
        opacity: 0,
        y: 100,
      });
      ScrollTrigger.batch(ref.current?.children, {
        interval: 0.1,
        start: "top 70%",
        onEnter: (batch) => gsap.to(batch, anim.open),
        onLeave: (batch) => gsap.to(batch, anim.close),
        onEnterBack: (batch) => gsap.to(batch, anim.open),
        onLeaveBack: (batch) => gsap.to(batch, anim.close),
      });
    }
  }, [ref.current]);
  return (
    <>
      <ProjectsPageHeader text={"PROJECTS"} />

      <Title size={isMobile ? "3rem" : "5rem"} ref={titleRef}>
        <TypingText size={isMobile ? "3rem" : "5rem"}>
          나의 프로젝트들
        </TypingText>
      </Title>
      <ProjectsContainer ref={ref}>
        {projects?.map((project, i) =>
          isMobile ? (
            <Section
              style={{ marginLeft: i % 2 === 0 ? "auto" : "" }}
              key={project.id}
            >
              <div style={{ width: "100%" }}>
                <img src={project.thumbImageUri} />
              </div>
              <TextContainer
                onClick={() => navigate(`/projects/${project.id}`)}
              >
                <div
                  style={{
                    width: isMobile ? "calc(100% - 9vw)" : "calc(100% - 2rem)",
                  }}
                >
                  <h3
                    style={{
                      color: colors.darkGray,
                      margin: "0.3rem 0 0.6rem",
                    }}
                  >
                    {project.type}
                  </h3>
                  <ProjectTitle>{project.title}</ProjectTitle>
                </div>
                <AiOutlineArrowRight
                  color="#fff"
                  size={"2rem"}
                  style={{
                    minWidth: "2rem",
                    minHeight: "2rem",
                  }}
                />
              </TextContainer>
            </Section>
          ) : (
            <ProjectsCard project={project} />
          )
        )}
      </ProjectsContainer>
    </>
  );
}

export default ProjectsPage;
const Title = styled.h2<any>`
  background-color: ${colors.lightBlack};
  padding: 2rem 5vw;
  font-size: ${(p) => p.size};
  font-family: "BM-Pro";
  color: ${colors.fluor};
  display: flex;
`;

const ProjectTitle = styled.h2`
  color: ${colors.lightGray};
  font-size: 1.5rem;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  width: 100%;
  @media (min-width: 1000px) {
    font-size: 2rem;
  }
`;
const TextContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  width: 100%;
  font-family: "NEXON";
  cursor: pointer;
  padding: 1rem;
  transition: all 0.3s;
  border-bottom: 1px solid ${colors.lightGray};
  &:hover {
    box-shadow: rgba(50, 50, 50, 0.8) 0px 2px 4px,
      rgba(50, 50, 50, 0.6) 0px 7px 13px -3px,
      rgba(50, 50, 50, 0.4) 0px -3px 0px inset;
  }
`;
const ProjectsContainer = styled.div`
  background-color: ${colors.lightBlack};
  padding: 0 0 5vh 0;
  min-height: 80vh;
  @media (min-width: 1000px) {
    width: 100%;
    margin: 0;
    padding: 5vh 2rem;
  }
`;
const Section = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  /* height: 45vh; */
  padding: 0.5rem 0;
  width: calc(100vw - 2rem);
  max-width: 600px;
  margin: 0 auto;
  img {
    width: 100%;
    aspect-ratio: 16/9;
    object-fit: cover;
  }
  @media (min-width: 1000px) {
    width: 70%;
    margin: 0;
    padding: 10rem 1rem;
  }
`;
