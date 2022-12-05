import gsap from "gsap";
import React, { useRef, useState } from "react";
import { AiOutlineClose, AiOutlineLeft, AiOutlineMenu } from "react-icons/ai";
import { useLocation, useNavigate } from "react-router-dom";
import { scroller } from "react-scroll";
import styled from "styled-components";

import { colors } from "../../color";
import { useMobile } from "../../utils/useMobile";
import Items from "./Items";
import Logo from "./Logo";

const DATA = [
  {
    title: "Home",
    to: "top",
    path: "/",
  },
  {
    title: "Projects",
    to: "project-scroll",
    path: "/projects",
  },
  {
    title: "About Me",
    to: "about-scroll",
    path: "/about-me",
  },
  {
    title: "Blog",
    to: "blog-scroll",
    path: "/blog",
  },
  {
    title: "Contact",
    to: "contact-scroll",
    path: "",
  },
];

const Navigation = () => {
  const navigation = useNavigate();
  const location = useLocation();
  const isMobile = useMobile();
  const containerRef = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState(false);

  const openMenu = () => {
    isMobile &&
      gsap.to(containerRef.current, {
        duration: 1.5,
        translateY: isOpen ? "-100vh" : 0,
        ease: "Power4.easeOut",
      });
    setIsOpen(!isOpen);
  };

  const handleBack = () => {
    window.history.state.idx > 0
      ? navigation(-1)
      : location.pathname === "/" &&
        scroller.scrollTo("top", {
          duration: 800,
          delay: 0,
          smooth: "easeInOutQuad",
        });
  };

  return (
    <>
      <Dropdown>
        <AiOutlineLeft onClick={() => handleBack()} />
        {isOpen ? (
          <AiOutlineClose onClick={openMenu} />
        ) : (
          <AiOutlineMenu onClick={openMenu} color={colors.darkGray} />
        )}
      </Dropdown>
      <Container ref={containerRef}>
        <Logo />
        <Items data={DATA} toggleOpen={openMenu} />
      </Container>
    </>
  );
};

export default Navigation;

const Container = styled.div`
  width: 8rem;
  height: 100vh;
  background-color: ${colors.darkBlack};
  position: fixed;
  left: 0;
  @media screen and (max-width: 1000px) {
    transform: translateY(-100vh);
    width: 100vw;
  }
  z-index: 9;
`;
const Dropdown = styled.div`
  @media screen and (min-width: 1000px) {
    display: none;
  }
  color: ${colors.darkGray};
  display: flex;
  width: 100%;
  justify-content: space-between;
  position: fixed;
  z-index: 999;
  padding: 1rem;
  font-size: 2rem;
`;
