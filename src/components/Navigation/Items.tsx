import React from "react";
import styled from "styled-components";
import { AiFillGithub, AiFillInstagram, AiFillFacebook } from "react-icons/ai";
import { animateScroll } from "react-scroll";

import { colors } from "../../color";
import { useLocation, useNavigate } from "react-router-dom";
import velog from "../../assets/logo/velog.ico";
type item = {
  title: string;
  to?: string;
  path: string;
};
type Props = {
  data: item[];
  toggleOpen: Function;
};

const Items = ({ data, toggleOpen }: Props) => {
  const location = useLocation();
  const navigate = useNavigate();

  const handleClick = ({ path }: item) => {
    toggleOpen();
    if (location.pathname === path) {
      animateScroll.scrollToTop({ duration: 500 });
    } else {
      navigate(path);
    }
  };

  return (
    <Container>
      <ItemsContainer>
        <Divider className="divider" />
        {data.map((el, i) => (
          <React.Fragment key={i}>
            <Item
              focus={location.pathname === el.path}
              onClick={() => handleClick(el)}
            >
              <span>{el.title.toLowerCase()}</span>
            </Item>
            <Divider className="divider" />
          </React.Fragment>
        ))}
      </ItemsContainer>
      <SNSContainer>
        <IconContainer>
          <AiFillGithub color={colors.link} />
        </IconContainer>
        <IconContainer>
          <img src={velog} width={16} alt="" />
        </IconContainer>
        <IconContainer>
          <AiFillInstagram color={colors.pink} />
        </IconContainer>
      </SNSContainer>
    </Container>
  );
};

export default Items;
const IconContainer = styled.div`
  cursor: pointer;
  width: 1rem;
  filter: grayscale(100%);
  transition: all 0.2s;
  :hover {
    filter: grayscale(0%);
  }
`;
const SNSContainer = styled.div`
  height: 20vh;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  font-size: 1.2rem;
  color: ${colors.darkGray};
`;
const ItemsContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: calc(100vh - 13rem);
`;

const Item = styled.div<any>`
  cursor: pointer;
  padding: 1.3rem 0;
  display: flex;
  font-size: 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  font-family: "BM-Air";
  transition: all 0.2s;
  color: ${({ focus }) => (focus ? colors.fluor : "#aaa")};
  :hover {
    color: ${({ focus }) => (focus ? colors.fluor : colors.lightGray)};
    scale: ${({ focus }) => (focus ? 1 : 1.1)};
  }
`;

const Divider = styled.span`
  border-bottom: 1px solid #aaa;
  height: 1px;
  width: 100%;
  transform: scaleY(0.5);
`;
