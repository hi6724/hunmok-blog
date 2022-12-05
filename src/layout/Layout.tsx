import React from "react";
import { Outlet } from "react-router-dom";
import styled from "styled-components";
import Footer from "../components/Footer";

import Navigation from "../components/Navigation/Navigation";

const Layout = () => {
  return (
    <>
      <Navigation />
      <Container>
        <Outlet />
      </Container>
      <Footer />
    </>
  );
};

export default Layout;

const Container = styled.div`
  max-width: 100vw;
  overflow: hidden;
  @media screen and (min-width: 1000px) {
    padding-left: 8rem;
  }
`;
