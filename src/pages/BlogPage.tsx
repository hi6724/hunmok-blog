import React, { useRef, useEffect } from "react";
import gsap from "gsap";
import styled from "styled-components";

import { colors } from "../color";
import Blog from "../components/Home/Blog";
import { bounceAnim } from "../utils/bounceAnim";

function BlogPage() {
  return (
    <Container>
      <Blog show={true} />
    </Container>
  );
}

export default BlogPage;

const Container = styled.div`
  padding: 10vh 0;
  background-color: ${colors.darkBlack};
  min-height: 100vh;
  z-index: 9;
`;
