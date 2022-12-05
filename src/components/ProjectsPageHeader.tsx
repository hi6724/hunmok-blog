import React from "react";
import styled from "styled-components";
import { colors } from "../color";

function ProjectsPageHeader() {
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

export default ProjectsPageHeader;

const HeaderContainer = styled.div`
  height: 70vh;
  background-color: ${colors.lightGray};
`;
