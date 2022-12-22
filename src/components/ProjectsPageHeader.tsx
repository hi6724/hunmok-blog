import gsap from "gsap";
import React, { useEffect, useRef } from "react";
import styled from "styled-components";
import { colors } from "../color";
import { useMobile } from "../utils/useMobile";

function ProjectsPageHeader({ text }: { text: string }) {
  const isMobile = useMobile();
  const ref = useRef<any>();
  useEffect(() => {
    gsap.fromTo(
      ref.current,
      {
        x: 0,
      },
      {
        ease: "linear",
        duration: 15,
        repeat: -1,
        x: isMobile
          ? `-${(text.length + 1) * 4.5}rem`
          : `-${(text.length + 1) * 6}rem`,
      }
    );
  });
  return (
    <HeaderContainer>
      <Work ref={ref} num={text.length}>
        <div>{text}</div>
        <div>{text}</div>
        <div>{text}</div>
        <div>{text}</div>
        <div>{text}</div>
      </Work>

      <Scroll>
        <h2>KEEP SCROLLING</h2>
        <a href="#">
          <span></span>
          <span></span>
          <span></span>
        </a>
      </Scroll>
    </HeaderContainer>
  );
}

export default ProjectsPageHeader;

const HeaderContainer = styled.div`
  background-color: ${colors.lightGray};
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
`;
const Work = styled.div<any>`
  padding: 6rem 0 3rem 0;
  display: flex;
  div {
    display: flex;
    font-size: 7rem;
    width: ${(p) => p.num * 4.5}rem;
    margin-right: 4.5rem;
    flex: 0 0 auto;
  }
  @media (min-width: 1000px) {
    padding: 1rem 0 2rem 0;
    div {
      display: flex;
      font-size: 9.5rem;
      width: ${(p) => p.num * 6}rem;
      margin-right: 6rem;
      flex: 0 0 auto;
    }
  }
`;

const Scroll = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  font-size: 5vw;
  font-family: "NEXON-Light";
  gap: 1rem;
  padding: 0 1rem 2rem;
  p {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  a {
    width: 10vw;
    position: relative;
    padding-top: 15vw;
  }
  a span {
    position: absolute;
    top: 0;
    left: 50%;
    width: 5vw;
    height: 5vw;
    margin-left: -2.5vw;
    border-left: 1px solid ${colors.darkBlack};
    border-bottom: 1px solid ${colors.darkBlack};
    -webkit-transform: rotate(-45deg);
    transform: rotate(-45deg);
    -webkit-animation: sdb 2s infinite;
    animation: sdb 2s infinite;
    opacity: 0;
    box-sizing: border-box;
  }
  a span:nth-of-type(1) {
    -webkit-animation-delay: 0s;
    animation-delay: 0s;
  }
  a span:nth-of-type(2) {
    top: 3vw;
    -webkit-animation-delay: 0.15s;
    animation-delay: 0.15s;
  }
  a span:nth-of-type(3) {
    top: 6vw;
    -webkit-animation-delay: 0.3s;
    animation-delay: 0.3s;
  }

  @media (min-width: 1000px) {
    font-size: 3rem;
    a {
      width: 6rem;
      position: relative;
      padding-top: 9rem;
    }
    a span {
      width: 3rem;
      height: 3rem;
      margin-left: -1.5rem;
    }
    a span:nth-of-type(2) {
      top: 1.8rem;
    }
    a span:nth-of-type(3) {
      top: 3.6rem;
    }
  }

  @-webkit-keyframes sdb {
    0% {
      opacity: 0;
    }
    50% {
      opacity: 1;
    }
    100% {
      opacity: 0;
    }
  }
  @keyframes sdb {
    0% {
      opacity: 0;
    }
    50% {
      opacity: 1;
    }
    100% {
      opacity: 0;
    }
  }
`;
