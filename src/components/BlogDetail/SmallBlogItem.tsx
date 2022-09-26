import { loremIpsum } from "lorem-ipsum";
import React from "react";
import styled from "styled-components";
import { colors } from "../../color";
import convertHexToRGBA from "../../utils/convertHexToRGBA";
import Button from "../Button";
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
        <Button>{isFocus === data.id ? "자세히 보기" : "계속"}</Button>
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

  transition: border 0.4s;
  button {
    transition: all 0.4s;
    color: ${(p) => (p.isFocus ? colors.lightGray : colors.darkGray)};
    background-color: ${(p) =>
      p.isFocus
        ? convertHexToRGBA(getTypeColor(p.type), 0.6)
        : colors.darkBlack};
  }
`;
