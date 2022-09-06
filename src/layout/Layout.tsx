import React from "react";
import { Outlet } from "react-router-dom";
import styled from "styled-components";

import Navigation from "../components/Navigation/Navigation";

const Layout = () => {
  return (
    <>
      <Navigation />
      <Container>
        <Outlet />
      </Container>
    </>
  );
};

export default Layout;

const Container = styled.div`
  max-width: 100vw;
  overflow-x: hidden;
  @media screen and (min-width: 1000px) {
    padding-left: 8rem;
  }
`;
