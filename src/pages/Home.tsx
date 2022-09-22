import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";

import { colors } from "../color";
import AboutMe from "../components/Home/AboutMe";
import Blog from "../components/Home/Blog";
import ContactMe from "../components/Home/ContactMe";
import MyProjects from "../components/Home/MyProjects";
import Welcome from "../components/Home/Welcome";

let prevScroll = 0;
const Home = () => {
  const showContainer = useRef<HTMLDivElement>(null);

  return (
    <Container>
      <Welcome />
      <MyProjects />
      <AboutMe />
      <Blog />
      <ContactMe />
      <div style={{ height: "20vh", backgroundColor: "tomato" }}>footer</div>
    </Container>
  );
};

export default Home;

const Container = styled.div`
  width: 100%;
  /* transform: translateY(100vh); */
  background-color: ${colors.lightBlack};
`;
