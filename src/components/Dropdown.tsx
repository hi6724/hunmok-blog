import gsap from 'gsap';
import React, { useRef, useState, useEffect } from 'react';
// @ts-ignore
import { AiOutlineRight } from 'react-icons/ai';
import styled from 'styled-components';
import { colors } from '../color';
import { getTypeColor } from './Home/Blog';

interface IFilterItem {
  uri: string;
  type: string;
}
interface IProps {
  items: IFilterItem[];
  setFilter: Function;
}

function Dropdown({ items, setFilter }: IProps) {
  const menuRef = useRef<HTMLUListElement>(null);
  const [open, setOpen] = useState(false);
  const isAnim = useRef(true);

  const handleOpen = () => {
    if (!isAnim.current) {
      isAnim.current = true;
      setOpen(!open);
    }
  };
  const toggleShow = () => {
    Array.from(menuRef.current!.children as HTMLCollectionOf<HTMLElement>).map(
      (el) => {
        el.style.display = open ? 'flex' : 'none';
      }
    );
  };

  useEffect(() => {
    if (open && menuRef) {
      gsap.to(menuRef.current!.children, {
        onStart: toggleShow,
        onComplete: () => {
          isAnim.current = false;
        },
        opacity: 1,
        yPercent: 0,
        rotateX: 0,
        duration: 0.2,
        stagger: 0.05,
      });
    } else if (!open && menuRef) {
      gsap.to(menuRef.current!.children, {
        onComplete: () => {
          toggleShow();
          isAnim.current = false;
        },
        opacity: 0,
        yPercent: -25,
        rotateX: 180,
        duration: 0.2,
        stagger: { from: 'end', each: 0.05 },
      });
    }
  }, [open]);

  const handleFilter = (filter: string) => {
    setFilter(filter);
    setOpen(false);
  };

  return (
    <Container>
      <Title onClick={handleOpen}>카테고리</Title>

      <Menu ref={menuRef}>
        {items.map((item) => (
          <MenuItem
            key={item.type}
            onClick={() => handleFilter(item.uri)}
            type={item.type}
          >
            <span>{item.type}</span>
            <AiOutlineRight />
          </MenuItem>
        ))}
      </Menu>
    </Container>
  );
}

export default Dropdown;

const Container = styled.div`
  position: relative;
`;

const Title = styled.h1`
  color: ${colors.gray};
  font-family: 'BM-Air';
  font-size: 1.5rem;
  cursor: pointer;
`;
const Menu = styled.ul`
  cursor: pointer;
  position: absolute;
  z-index: 1;
  right: 0;
  top: 3rem;
  height: 20rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
`;
const MenuItem = styled.li<any>`
  opacity: 0;
  padding: 0 1rem;
  background-color: ${colors.lightBlack};
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 12rem;
  height: 100%;
  border-bottom: 1px solid ${colors.darkGray};
  border-width: ${({ last }) => (last ? 0 : 1)}px;
  color: ${({ type }: { type: string }) => getTypeColor(type.toLowerCase())};
  font-family: 'BM-Pro';
  font-size: 1.2rem;
  backface-visibility: hidden;
`;
