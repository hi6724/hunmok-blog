import styled from "styled-components";
import { Element } from "react-scroll";

import { colors } from "../color";
import AboutMe from "../components/Home/AboutMe";
import Blog from "../components/Home/Blog";
import ContactMe from "../components/Home/ContactMe";
import MyProjects from "../components/Home/MyProjects";
import Welcome from "../components/Home/Welcome";
import GuestBookPreview from "../components/GuestBookPreview/GuestBookPreview";

const Home = () => {
  return (
    <Container>
      <Element name="top" />
      <Welcome />
      <Element style={{ paddingTop: "10vh" }} name="project-scroll" />
      <MyProjects />
      <Element style={{ paddingTop: "10vh" }} name="about-scroll" />
      <AboutMe />
      <Element style={{ paddingTop: "10vh" }} name="blog-scroll" />
      <Blog />
      <Element style={{ paddingTop: "10vh" }} name="contact-scroll" />
      <GuestBookPreview />
      <ContactMe />
    </Container>
  );
};

export default Home;

const Container = styled.div`
  width: 100%;
  /* transform: translateY(100vh); */
  background-color: ${colors.lightBlack};
`;
