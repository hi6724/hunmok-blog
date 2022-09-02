import React, { FC, ReactNode } from "react";
import styled from "styled-components";

type Props = {
  children: ReactNode;
};
const Button: FC<Props> = ({ children }) => {
  return <Container>children</Container>;
};

export default Button;

const Container = styled.button``;
