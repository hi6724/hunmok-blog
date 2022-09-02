import gsap from "gsap";
import React, { useState } from "react";
import styled from "styled-components";

import { colors } from "../color";
import AboutMe from "../components/Home/AboutMe";
import MyProjects from "../components/Home/MyProjects";
import Welcome from "../components/Home/Welcome";

const Home = () => {
  return (
    <Container>
      <Welcome />
      <MyProjects />
      <AboutMe />
    </Container>
  );
};

export default Home;

const Container = styled.div`
  overflow: hidden;
  width: 100%;
  background-color: ${colors.lightBlack};
`;
