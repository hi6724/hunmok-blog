import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { loremIpsum } from "lorem-ipsum";
import gsap from "gsap";

import { colors } from "../../color";
import TypingText from "../../hooks/TypingText";
import { useMobile } from "../../utils/useMobile";
import { bounceAnim } from "../../utils/bounceAnim";
import axios from "axios";

type ObjType = {
  [index: string]: string;
  algorithm: string;
  frontend: string;
};
export type PostType = {
  createdAt: string;
  icon: "✅" | "❌";
  idx: string;
  object: string;
  site: string;
  status: string;
  title: string;
  type: string;
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
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const isMobile = useMobile();
  const [post, setPost] = useState<PostType[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async function () {
      const { data } = await axios.get("http://localhost:8800/notionList/0");
      console.log(data);
      // loading && setPost(data);
      setLoading(false);
    })();
  });

  useEffect(() => {
    if (titleRef.current) {
      gsap.to(titleRef.current?.children, {
        ...bounceAnim,
        scrollTrigger: {
          trigger: titleRef.current.children,
          start: "top 70%",
        },
      });
    }
    if (containerRef.current && !loading) {
      gsap.from(containerRef.current?.children, {
        duration: 0.4,
        scale: 0.2,
        opacity: 0,
        stagger: {
          grid: "auto",
          from: "start",
          each: 0.1,
        },
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 70%",
        },
      });
    }
  });

  return (
    <Container>
      <Title size={isMobile ? "3rem" : "5rem"} ref={titleRef}>
        <TypingText size={isMobile ? "3rem" : "5rem"}>My Blog</TypingText>
      </Title>
      {loading && !(post.length > 0) ? (
        "loading"
      ) : (
        <GridContainer ref={containerRef}>
          {post.map((data) => (
            <BlogItem key={data.idx} type={data.type}>
              <TypeText type={data.type}>{data.type}</TypeText>
              <h1>{data.title}</h1>
              <p>{loremIpsum({ count: 2 })}</p>
              <div>
                <button>Continue</button>
              </div>
            </BlogItem>
          ))}
        </GridContainer>
      )}
    </Container>
  );
}

export default Blog;

const Title = styled.h2<any>`
  font-size: ${(p) => p.size};
  font-family: "BM-Pro";
  color: ${colors.fluor};
  margin-bottom: 2rem;
  margin-left: 5vw;
  display: flex;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
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
const TypeText = styled.h2<any>`
  font-size: 1.2rem;
  font-family: "BM-Air";
  color: ${({ type }: { type: string }) => getTypeColor(type)};
  text-transform: uppercase;
`;
const BlogItem = styled.div<any>`
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
