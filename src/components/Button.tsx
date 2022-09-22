import React, { FC, ReactNode } from "react";
import styled from "styled-components";
import { colors } from "../color";

type Props = {
  children: ReactNode;
  onClick?: React.MouseEventHandler<HTMLButtonElement> | undefined;
  [x: string]: any;
};
const Button: FC<Props> = ({ children, onClick, ...rest }) => {
  return (
    <ButtonContainer {...rest} onClick={onClick}>
      {children}
    </ButtonContainer>
  );
};

export default Button;

export const ButtonContainer = styled.button`
  cursor: pointer;
  box-shadow: rgba(50, 50, 50, 0.4) 0px 2px 4px,
    rgba(50, 50, 50, 0.3) 0px 7px 13px -3px,
    rgba(50, 50, 50, 0.2) 0px -3px 0px inset;
  padding: 0.5rem;
  border: none;
  background-color: ${colors.darkBlack};
  width: 45%;
  border-radius: 0.6rem;
  font-size: 1rem;
  font-family: "BM-Pro";
  color: ${colors.darkGray};
`;
