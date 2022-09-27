import React from "react";
import styled from "styled-components";
import { colors } from "../color";
import Blog from "../components/Home/Blog";

function BlogPage() {
  return (
    <Container>
      <Blog btn={true} />
    </Container>
  );
}

export default BlogPage;

const Container = styled.div`
  padding: 10vh 0;
  background-color: ${colors.darkBlack};
  min-height: 100vh;
`;
