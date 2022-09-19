import { loremIpsum } from "lorem-ipsum";
import React from "react";
import styled from "styled-components";
import { colors } from "../../color";
import { getTypeColor, PostType } from "../Home/Blog";

type Props = {
  data: PostType;
  onClick: Function;
  isFocus: string;
};

function SmallBlogItem({ data, onClick, isFocus }: Props) {
  return (
    <BlogItem
      onBlur={() => console.log("hh")}
      isFocus={isFocus === data.id}
      type={data.type}
      onClick={onClick}
    >
      <BlogHeader>
        <TypeText type={data.type}>{data.type}</TypeText>
        <CreatedAt>{data.createdAt.split("T")[0]}</CreatedAt>
      </BlogHeader>
      <h1>{data.title}</h1>
      {/* <p>
        Boolean If autoRemoveChildren is set to true, as soon as child
        tweens/timelines complete, they will automatically get killed/removed.
        This is normally undesireable because it prevents going backwards in
        time (like if you want to reverse()
      </p> */}
      <BlogFooter>
        <button>{isFocus === data.id ? "Go Detail Page" : "Continue"}</button>
      </BlogFooter>
    </BlogItem>
  );
}

export default SmallBlogItem;
const CreatedAt = styled.span`
  font-family: "BM-Jua";
  color: ${colors.darkGray};
`;

const TypeText = styled.h2<any>`
  font-size: 1.2rem;
  font-family: "BM-Air";
  color: ${({ type }) => getTypeColor(type)};
  text-transform: uppercase;
`;
const BlogHeader = styled.div`
  display: flex;
  justify-content: space-between;
`;
const BlogFooter = styled.div`
  display: flex;
  flex-direction: row-reverse;
`;
const BlogItem = styled.div<any>`
  border: 2px solid;
  border-color: ${({ type, isFocus }) =>
    isFocus ? getTypeColor(type) : colors.darkBlack};
  border-top: 2px solid ${({ type }) => getTypeColor(type)};
  opacity: ${({ isFocus }) => (isFocus ? 1 : 0.6)};
  /* filter: grayscale(100%); */
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 1rem;
  height: 100%;
  padding: 1rem;
  background-color: ${colors.darkBlack};
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
    color: ${(p) => (p.isFocus ? getTypeColor(p.type) : colors.darkGray)};
  }
`;
