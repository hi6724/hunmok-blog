import React from "react";
import styled from "styled-components";
import { colors } from "../color";

function BlogPageHeader() {
  return (
    <HeaderContainer>
      <div>
        <span>work</span>
        <span>work</span>
        <span>work</span>
        <span>work</span>
      </div>
      <div>KEEP SCROLLING</div>
    </HeaderContainer>
  );
}

export default BlogPageHeader;

const HeaderContainer = styled.div`
  height: 20vh;
  background-color: ${colors.lightGray};
`;
