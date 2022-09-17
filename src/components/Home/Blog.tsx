import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { loremIpsum } from "lorem-ipsum";
import gsap from "gsap";

import { colors } from "../../color";
import TypingText from "../../hooks/TypingText";
import { useMobile } from "../../utils/useMobile";
import { bounceAnim } from "../../utils/bounceAnim";
import axios, { AxiosResponse } from "axios";
import { useNavigate } from "react-router-dom";

type ObjType = {
  [index: string]: string;
  algorithm: string;
  frontend: string;
};
export type PostType = {
  createdAt: string;
  icon:
    | { type: "emoji"; emoji: "✅" | "❌" }
    | { type: "file"; file: { url: string } };
  id: string;
  site: string;
  status: string;
  title: string;
  type: string;
};
export type NotionListResponse = {
  has_more: boolean;
  next_cursor: string;
  results: PostType[];
};

const TYPE_PALETTE: ObjType = {
  algorithm: colors.fluor,
  frontend: colors.pink,
};
export const getTypeColor = (type?: keyof typeof TYPE_PALETTE) => {
  if (type && TYPE_PALETTE[type]) {
    return TYPE_PALETTE[type];
  }
  return colors.purple;
};

function Blog() {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const animCursor = useRef(0);
  const isMobile = useMobile();
  const cursor = useRef("0");
  const navigation = useNavigate();

  const [post, setPost] = useState<PostType[]>([]);
  const [loading, setLoading] = useState(true);

  const getNotionList = async () => {
    if (cursor.current === null) return;
    setLoading(true);
    const { data }: AxiosResponse<NotionListResponse> = await axios.get(
      `http://localhost:8800/notionList/${cursor.current}`
    );
    cursor.current = data.next_cursor;
    animCursor.current += 10;
    setPost([...post, ...data.results]);
    setLoading(false);
  };

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
        scale: 0.2,
        opacity: 0,
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 70%",
        },
        duration: (index) => {
          const delay = index * 0.1 - (animCursor.current - 10) / 10;
          return delay >= 0 ? 0.4 : 0;
        },
        stagger: (index) => {
          const delay = index * 0.1 - (animCursor.current - 10) / 10;
          return delay >= 0 ? delay : 0;
        },
      });
    }
  });

  useEffect(() => {
    getNotionList();
  }, []);

  return (
    <Container>
      <Title size={isMobile ? "3rem" : "5rem"} ref={titleRef}>
        <TypingText size={isMobile ? "3rem" : "5rem"}>My Blog</TypingText>
      </Title>
      <>
        <GridContainer ref={containerRef}>
          {post.map((data) => (
            <BlogItem
              onClick={() => navigation(`/blog/${data.id}`)}
              key={data.id}
              type={data.type}
            >
              <BlogHeader>
                <TypeText type={data.type}>{data.type}</TypeText>
                <CreatedAt>{data.createdAt.split("T")[0]}</CreatedAt>
              </BlogHeader>
              <h1>{data.title}</h1>
              <p>{loremIpsum()}</p>
              <BlogFooter>
                <button>Continue</button>
              </BlogFooter>
            </BlogItem>
          ))}
        </GridContainer>
        {!loading ? (
          cursor.current !== null && (
            <button onClick={getNotionList}>read more</button>
          )
        ) : (
          <div>Loading...</div>
        )}
      </>
    </Container>
  );
}

export default Blog;

const CreatedAt = styled.span`
  font-family: "BM-Jua";
  color: ${colors.darkGray};
`;
const BlogHeader = styled.div`
  display: flex;
  justify-content: space-between;
`;
const BlogFooter = styled.div`
  display: flex;
  flex-direction: row-reverse;
`;
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
  justify-content: center;
  @media screen and (min-width: 1000px) {
    justify-content: space-between;
    grid-template-columns: repeat(3, auto);
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
