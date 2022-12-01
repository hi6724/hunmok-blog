import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import React, { useEffect, useRef } from "react";
import { AiOutlineArrowRight } from "react-icons/ai";
import styled from "styled-components";
import useSWR from "swr";
import { colors } from "../color";
import { IProject } from "../components/GridItems/GridItems";
import { getProjectsApi } from "../utils/apiRoutes";

function ProjectsPage() {
  const { data: projects } = useSWR<IProject[]>(getProjectsApi);
  const ref = useRef<any>();
  useEffect(() => {
    if (ref.current) {
      Array.from(ref.current.children).forEach((child: any) => {
        console.log(child);
        gsap.from(child, {
          xPercent: 100,
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
      <Header />
      <ProjectsContainer ref={ref}>
        {projects?.map((project) => (
          <Section key={project.id}>
            <img src={project.thumbImageUri} />
            <TextContainer>
              <div>
                <h3 style={{ color: colors.darkGray }}>{project.type}</h3>
                <Title>{project.title}</Title>
              </div>
              <AiOutlineArrowRight color="#fff" size={"7vw"} />
            </TextContainer>
          </Section>
        ))}
      </ProjectsContainer>
      <Footer />
    </>
  );
}

export default ProjectsPage;
const Title = styled.h2`
  color: ${colors.lightGray};
  font-size: 7vw;
`;
const TextContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  font-family: "NEXON";
`;
const ProjectsContainer = styled.div`
  background-color: ${colors.darkBlack};
  padding: 5vh 0;
`;
const Section = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  height: 45vh;
  width: calc(100vw - 2rem);
  margin: 1rem;
  border-bottom: 1px solid ${colors.lightGray};
  img {
    width: 100%;
    aspect-ratio: 16/9;
    object-fit: cover;
  }
`;

function Header() {
  return (
    <HeaderContainer>
      <div>
        <span>work</span>
        <span>work</span>
        <span>work</span>
        <span>work</span>
      </div>
      <div>KEEP SCROLLING</div>
    </HeaderContainer>
  );
}
const HeaderContainer = styled.div`
  height: 70vh;
  background-color: ${colors.lightGray};
`;

function Footer() {
  return (
    <HeaderContainer>
      <div>
        <span>work</span>
        <span>work</span>
        <span>work</span>
        <span>work</span>
      </div>
      <div>KEEP SCROLLING</div>
    </HeaderContainer>
  );
}
const FooterContainer = styled.div`
  height: 70vh;
  background-color: ${colors.darkGray};
`;
