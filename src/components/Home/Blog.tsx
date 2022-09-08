import React from "react";
import styled from "styled-components";
import { loremIpsum } from "lorem-ipsum";

import { blogData } from "../../test/blogData";
import { colors } from "../../color";

type ObjType = {
  [index: string]: string;
  algorithm: string;
  frontend: string;
};
const TYPE_PALETTE: ObjType = {
  algorithm: colors.fluor,
  frontend: colors.pink,
};
const getTypeColor = (type?: keyof typeof TYPE_PALETTE) => {
  if (type && TYPE_PALETTE[type]) {
    return TYPE_PALETTE[type];
  }
  return colors.purple;
};

function Blog() {
  console.log();
  return (
    <Container>
      <GridContainer>
        {blogData.map((data, i) => (
          <BlogItem key={i} type={data.type}>
            <TypeText type={data.type}>{data.type}</TypeText>
            <h1>{data.title}</h1>
            <p>{loremIpsum({ count: 2 })}</p>
            <div>
              <button>Continue</button>
            </div>
          </BlogItem>
        ))}
      </GridContainer>
    </Container>
  );
}

export default Blog;
type props = {
  type: string;
};
const Container = styled.div`
  display: flex;
  padding: 0 1rem;
`;
const GridContainer = styled.div`
  display: grid;
  gap: 1rem;
  grid-template-columns: repeat(2, 45vw);
  @media screen and (min-width: 1000px) {
    justify-content: space-between;
    grid-template-columns: repeat(3, auto);
  }
  @media screen and (min-width: 1400px) {
    justify-content: space-between;
    grid-template-columns: repeat(4, auto);
  }
  @media screen and (max-width: 500px) {
    grid-template-columns: repeat(1, 90vw);
  }
`;
const TypeText = styled.h2<props>`
  font-size: 1.2rem;
  font-family: "BM-Air";
  color: ${({ type }: { type: string }) => getTypeColor(type)};
  text-transform: uppercase;
`;
const BlogItem = styled.div<props>`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 1rem;
  border-top: 2px solid ${({ type }: { type: string }) => getTypeColor(type)};
  height: 100%;
  padding: 1rem;
  background-color: ${colors.black};
  box-shadow: rgba(255, 255, 255, 0.12) 0px 1px 3px,
    rgba(255, 255, 255, 0.24) 0px 1px 3px;
  h1 {
    font-size: 1.6rem;
    width: 100%;
    white-space: normal;
    overflow: hidden;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    font-family: "BM-Jua";
    color: ${colors.lightGray};
  }
  p {
    width: 100%;
    white-space: normal;
    overflow: hidden;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    font-family: "BM-Air";
    color: ${colors.darkGray};
  }
  div {
    display: flex;
    flex-direction: row-reverse;
  }
  button {
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
  }
`;
