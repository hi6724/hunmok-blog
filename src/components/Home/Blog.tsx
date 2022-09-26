import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { loremIpsum } from "lorem-ipsum";
import gsap from "gsap";
import ReactLoading from "react-loading";

import { colors } from "../../color";
import TypingText from "../../hooks/TypingText";
import { useMobile } from "../../utils/useMobile";
import { bounceAnim } from "../../utils/bounceAnim";
import axios, { AxiosResponse } from "axios";
import { useNavigate } from "react-router-dom";
import SmallBlogItem from "../BlogDetail/SmallBlogItem";
import { apiRoutes } from "../../utils/apiRoutes";
import Button from "../Button";
import getNotionListByCursor from "../../hooks/getNotionListByCursor";

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

let titleAnim = true;
function Blog() {
  const isMobile = useMobile();
  const navigation = useNavigate();

  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const animCursor = useRef(0);
  const cursor = useRef("0");
  const animate = useRef(true);
  const count = useRef(isMobile ? 6 : 12);

  const [post, setPost] = useState<PostType[]>([]);
  const [loading, setLoading] = useState(true);
  const [focusItem, setFocusItem] = useState("");

  const getNotionList = async () => {
    setLoading(true);
    const data = await getNotionListByCursor(cursor.current, count.current);
    if (data) {
      cursor.current = data.next_cursor;
      animCursor.current += count.current;
      animate.current = true;
      setPost([...post, ...data.results]);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (titleRef.current && titleAnim) {
      gsap.to(titleRef.current?.children, {
        ...bounceAnim,
        onStart: () => {
          titleAnim = false;
        },
        scrollTrigger: {
          trigger: titleRef.current.children,
          start: "top 70%",
        },
      });
    }
    if (containerRef.current && !loading && animate.current) {
      gsap.from(containerRef.current?.children, {
        scale: 0,
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 70%",
        },
        duration: (index) => {
          const delay =
            index * 0.1 - (animCursor.current - count.current) / count.current;
          return delay >= 0 ? 0.6 : 0;
        },
        stagger: (index) => {
          const delay =
            index * 0.1 - (animCursor.current - count.current) / count.current;
          return delay >= 0 ? delay : 0;
        },
        onStart: () => {
          animate.current = false;
        },
      });
    }
  });

  useEffect(() => {
    setPost([]);
    titleAnim = true;
    getNotionList();
  }, []);

  const handleClick = (id: string) => {
    if (focusItem === id) {
      navigation(`/blog/${id}`);
    } else {
      setFocusItem(id);
    }
  };

  return (
    <Container>
      <Title size={isMobile ? "3rem" : "5rem"} ref={titleRef}>
        <TypingText size={isMobile ? "3rem" : "5rem"}>블로그</TypingText>
      </Title>
      <>
        <GridContainer ref={containerRef}>
          {post.map((data) => (
            <SmallBlogItem
              onClick={() => handleClick(data.id)}
              isFocus={focusItem}
              key={data.id}
              data={data}
            />
          ))}
        </GridContainer>
        <CenteredContainer>
          {!loading ? (
            cursor.current !== null && (
              <Button onClick={getNotionList}>블로그페이지로</Button>
            )
          ) : (
            <ReactLoading
              type={"spokes"}
              color={colors.fluor}
              height={"10vw"}
              width={"10vw"}
            />
          )}
        </CenteredContainer>
      </>
    </Container>
  );
}

export default Blog;
const CenteredContainer = styled.div`
  margin-top: 1rem;
  display: flex;
  justify-content: center;
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
    grid-template-columns: repeat(3, calc(30vw - 1.5rem));
    gap: 0.5rem;
  }

  @media screen and (max-width: 500px) {
    grid-template-columns: repeat(1, 90vw);
  }
`;
