import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
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

function ProjectsPage() {
  const isMobile = useMobile();
  const navigate = useNavigate();
  const { data: projects } = useSWR<IProject[]>(getProjectsApi);
  const ref = useRef<any>();
  useEffect(() => {
    if (ref.current) {
      Array.from(ref.current.children).forEach((child: any) => {
        console.log(child);
        gsap.from(child, {
          xPercent: 130,
          duration: 1,
          scrollTrigger: {
            trigger: child,
            start: "top center",
          },
        });
        // img
        // child.children[0]

        //textContainer child.children[1]
      });
    }
  }, [ref.current]);

  return (
    <>
      <ProjectsPageHeader />
      <ProjectsContainer ref={ref}>
        {projects?.map((project) => (
          <Section key={project.id}>
            <div
              style={{
                width: "100%",
                aspectRatio: "16/9",
                overflow: "hidden",
                maxHeight: "35vh",
                marginBottom: "1rem",
              }}
            >
              <img src={project.thumbImageUri} />
            </div>
            <TextContainer onClick={() => navigate(`/projects/${project.id}`)}>
              <div>
                <h3
                  style={{ color: colors.darkGray, margin: "0.3rem 0 0.6rem" }}
                >
                  {project.type}
                </h3>
                <Title>{project.title}</Title>
              </div>
              <AiOutlineArrowRight
                color="#fff"
                size={isMobile ? "7vw" : "3rem"}
              />
            </TextContainer>
          </Section>
        ))}
      </ProjectsContainer>
    </>
  );
}

export default ProjectsPage;
const Title = styled.h2`
  color: ${colors.lightGray};
  font-size: 7vw;
  @media (min-width: 1000px) {
    font-size: 3rem;
  }
`;
const TextContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  font-family: "NEXON";
  cursor: pointer;
  padding: 1rem;
  transition: all 0.3s;
  &:hover {
    box-shadow: rgba(50, 50, 50, 0.8) 0px 2px 4px,
      rgba(50, 50, 50, 0.6) 0px 7px 13px -3px,
      rgba(50, 50, 50, 0.4) 0px -3px 0px inset;
  }
`;
const ProjectsContainer = styled.div`
  background-color: ${colors.lightBlack};
  padding: 5vh 0;
`;
const Section = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  /* height: 45vh; */
  padding: 2rem 0;
  width: calc(100vw - 2rem);
  margin: 1rem;
  border-bottom: 1px solid ${colors.lightGray};
  img {
    width: 100%;
    aspect-ratio: 16/9;
    object-fit: cover;
    max-height: 35vh;
  }
  @media (min-width: 1000px) {
    width: 100%;
    margin: 0;
    padding: 1rem;
  }
`;
