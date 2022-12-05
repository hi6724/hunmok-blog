import React, { useRef, useEffect } from "react";
import gsap from "gsap";
import styled from "styled-components";

import { colors } from "../color";
import Blog from "../components/Home/Blog";
import { bounceAnim } from "../utils/bounceAnim";
import BlogPageHeader from "../components/BlogPageHeader";

function BlogPage() {
  return (
    <Container>
      <BlogPageHeader />
      <Blog show={true} />
    </Container>
  );
}

export default BlogPage;

const Container = styled.div`
  padding: 0 0 10vh 0;
  background-color: ${colors.lightBlack};
  min-height: 100vh;
  z-index: 9;
`;
