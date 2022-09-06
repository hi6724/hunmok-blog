import gsap from "gsap";
import React, { useRef, useState } from "react";
import { AiOutlineClose, AiOutlineMenu } from "react-icons/ai";
import styled from "styled-components";

import { colors } from "../../color";
import Items from "./Items";
import Logo from "./Logo";
import ShadowText from "./ShadowText";

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
  const containerRef = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState(false);
  const openMenu = () => {
    gsap.to(containerRef.current, {
      duration: 1.5,
      translateY: isOpen ? "-100vh" : 0,
      ease: "Power4.easeOut",
    });
    setIsOpen(!isOpen);
  };
  return (
    <>
      <Dropdown onClick={openMenu}>
        {isOpen ? (
          <AiOutlineClose color={colors.lightGray} />
        ) : (
          <AiOutlineMenu color={colors.darkGray} />
        )}
      </Dropdown>
      <Container ref={containerRef}>
        <Logo />
        <Items data={DATA} />
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
  position: fixed;
  z-index: 999;
  padding: 1rem;
  font-size: 2rem;
`;
