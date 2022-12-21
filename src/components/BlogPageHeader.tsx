import gsap from "gsap";
import React, { useEffect, useRef } from "react";
import styled from "styled-components";
import { colors } from "../color";
import { useMobile } from "../utils/useMobile";

function BlogPageHeader() {
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
        duration: isMobile ? 10 : 15,
        repeat: -1,
        x: isMobile ? "-75vw" : "-50rem",
      }
    );
  });
  return (
    <HeaderContainer>
      <Work ref={ref}>
        <h3>BLOG</h3>
        <h3>BLOG</h3>
        <h3>BLOG</h3>
        <h3>BLOG</h3>
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

export default BlogPageHeader;

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
const HeaderContainer = styled.div`
  background-color: ${colors.lightGray};
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
`;
const Work = styled.div`
  padding: 6rem 0 4rem 0;
  display: flex;
  h3 {
    font-size: 15vw;
    width: 65vw;
    margin-right: 10vw;
  }
  @media (min-width: 1000px) {
    padding: 10rem 0 6rem 0;
    h3 {
      width: 43rem;
      font-size: 10rem;
      margin-right: 7rem;
    }
  }
`;
