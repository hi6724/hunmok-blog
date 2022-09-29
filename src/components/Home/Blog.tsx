import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { loremIpsum } from "lorem-ipsum";
import gsap from "gsap";
import ReactLoading from "react-loading";

import { colors } from "../../color";
import TypingText from "../../hooks/TypingText";
import { useMobile } from "../../utils/useMobile";
import { bounceAnim } from "../../utils/bounceAnim";
import { useNavigate } from "react-router-dom";
import SmallBlogItem from "../BlogDetail/SmallBlogItem";
import Button from "../Button";
import getNotionListByCursor from "../../hooks/getNotionListByCursor";
import Dropdown from "../Dropdown";
import { getNotionListApi } from "../../utils/apiRoutes";
import useSWR from "swr";

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

function Blog({ btn }: { btn?: boolean }) {
  const isMobile = useMobile();
  const navigation = useNavigate();

  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);

  const animate = useRef(true);
  const titleAnim = useRef(true);
  const count = useRef(isMobile ? 6 : 12);

  const animCursor = useRef(isMobile ? 6 : 12);
  const cursor = useRef("0");

  const [loading, setLoading] = useState(true);
  const [focusItem, setFocusItem] = useState("");
  const [postList, setPostList] = useState<PostType[]>([]);

  const { data, error } = useSWR<NotionListResponse>(
    `${getNotionListApi}/${cursor.current}?count=${count.current}`
  );

  useEffect(() => {
    if (titleRef.current && titleAnim.current) {
      gsap.to(titleRef.current?.children, {
        ...bounceAnim,
        onStart: () => {
          titleAnim.current = false;
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
            index / count.current -
            (animCursor.current - count.current) / count.current;
          return delay >= 0 ? 0.6 : 0;
        },
        stagger: (index) => {
          const delay =
            index / count.current -
            (animCursor.current - count.current) / count.current;
          return delay >= 0 ? delay : 0;
        },
        onStart: () => {
          animate.current = false;
        },
      });
    }
  });

  const handleClick = (id: string) => {
    if (focusItem === id) {
      navigation(`/blog/${id}`);
    } else {
      setFocusItem(id);
    }
  };

  useEffect(() => {
    if (data !== undefined) {
      setPostList([...postList, ...data?.results]);
      setLoading(false);
    }
  }, [data]);

  return (
    <Container>
      <HeaderContainer>
        <Title size={isMobile ? "3rem" : "5rem"} ref={titleRef}>
          <TypingText size={isMobile ? "3rem" : "5rem"}>블로그</TypingText>
        </Title>
      </HeaderContainer>
      <>
        <GridContainer ref={containerRef}>
          {postList.map((el) => (
            <SmallBlogItem
              onClick={() => handleClick(el.id)}
              isFocus={focusItem}
              key={el.id}
              data={el}
            />
          ))}
        </GridContainer>
        <CenteredContainer>
          {data ? (
            cursor.current !== null && !btn ? (
              <Button onClick={() => navigation("/blog")}>자세히보기</Button>
            ) : (
              data.next_cursor && (
                <Button
                  onClick={() => {
                    animate.current = true;
                    animCursor.current += count.current;
                    cursor.current = data.next_cursor;
                    setLoading(true);
                  }}
                >
                  더보기
                </Button>
              )
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

const HeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  .sort-btn {
    padding: 1rem;
    background-color: ${colors.darkGray};
  }
`;
