import gsap from "gsap";
import React, { useRef, useState, useEffect } from "react";
import { AiOutlineRight } from "react-icons/ai";
import styled from "styled-components";
import { colors } from "../color";
import { getTypeColor } from "./Home/Blog";

function Dropdown() {
  const menuRef = useRef<HTMLUListElement>(null);
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(!open);
  };
  useEffect(() => {
    if (open) {
      gsap.to(menuRef.current!.children, {
        opacity: 1,
        xPercent: 0,
        duration: 0.6,
        stagger: 0.06,
      });
    } else {
      gsap.to(menuRef.current!.children, {
        opacity: 0,
        xPercent: -25,
        duration: 0.6,
        stagger: { from: "end", each: 0.06 },
      });
    }
  }, [open]);
  console.log(open);
  return (
    <Container>
      <Title onClick={handleOpen}>카테고리</Title>

      <Menu ref={menuRef}>
        <MenuItem type="all">
          <span>all</span>
          <AiOutlineRight />
        </MenuItem>
        <MenuItem type="frontend">
          <span>frontend</span>
          <AiOutlineRight />
        </MenuItem>
        <MenuItem type="backend">
          <span>backend</span>
          <AiOutlineRight />
        </MenuItem>
        <MenuItem type="algorithm">
          <span>algorithm</span>
          <AiOutlineRight />
        </MenuItem>
        <MenuItem type="others" last={true}>
          <span>others</span>
          <AiOutlineRight />
        </MenuItem>
      </Menu>
    </Container>
  );
}

export default Dropdown;

const Container = styled.div`
  /* position: relative; */
`;

const Title = styled.h1`
  color: ${colors.gray};
  font-family: "BM-Air";
  font-size: 1.5rem;
  cursor: pointer;
`;
const Menu = styled.ul`
  position: absolute;
  z-index: 1;
  right: 3vw;
  top: calc(15vh + 2rem);
  height: 20rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
`;
const MenuItem = styled.li<any>`
  padding: 0 1rem;
  background-color: ${colors.lightBlack};
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 12rem;
  height: 100%;
  border-bottom: 1px solid ${colors.darkGray};
  border-width: ${({ last }) => (last ? 0 : 1)}px;
  color: ${({ type }) => getTypeColor(type)};
  font-family: "BM-Pro";
  font-size: 1.2rem;
`;
