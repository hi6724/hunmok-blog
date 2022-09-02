import React from "react";
import styled from "styled-components";

import { colors } from "../../color";
import Items from "./Items";
import Logo from "./Logo";

const DATA = [
  {
    title: "About",
  },
  {
    title: "My Skills",
  },
  {
    title: "Work",
  },
  {
    title: "Contact",
  },
  {
    title: "Blog",
  },
];

const Navigation = () => {
  return (
    <Container>
      <Logo />
      <Items data={DATA} />
    </Container>
  );
};

export default Navigation;

const Container = styled.div`
  width: 8rem;
  height: 100vh;
  background-color: ${colors.darkBlack};
  position: fixed;
  left: 0;
`;
