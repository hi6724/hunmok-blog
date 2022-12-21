import React, { useEffect, useRef, useState } from "react";
import Loading from "react-loading";
import HTMLFlipBook from "react-pageflip";
import useSWR from "swr";
import { getGuestbooksApi } from "../../utils/apiRoutes";
import { IGuestbook } from "../Guestbook/GuestbookItem";
import GuestBookPage from "../Guestbook/GuestBookPage";
import PageCover from "../Guestbook/PageCover";
import { LoadingContainer } from "../../pages/ProjectDetailPage";
import styled from "styled-components";

function GuestBook() {
  const { data } = useSWR<IGuestbook[]>(getGuestbooksApi);
  const [guestBooksList, setGuestBooksList] = useState<any>([]);
  const bookRef = useRef<any>();
  useEffect(() => {
    const newGuestBooks = data?.reduce((acc: any, cur, i, arr) => {
      if (i % 3 === 0) acc.push(arr.slice(i, i + 3));
      return acc;
    }, []);
    setGuestBooksList(newGuestBooks);
  }, [data]);

  return (
    <Container>
      <Wrapper />
      <div style={{ width: "100%" }}>
        {guestBooksList ? (
          <HTMLFlipBook
            style={{ margin: "0 auto" }}
            width={300}
            height={400}
            minWidth={300}
            maxWidth={600}
            maxHeight={800}
            size="stretch"
            showPageCorners={false}
            showCover={false}
            maxShadowOpacity={0.5}
            flippingTime={1000}
            ref={bookRef}
            onFlip={({ data }) => {
              setTimeout(() => {
                if (data + 2 >= bookRef?.current?.pageFlip().getPageCount()) {
                  bookRef?.current?.pageFlip().flip(0);
                } else {
                  bookRef?.current?.pageFlip().flipNext();
                }
              }, 5000);
            }}
            onInit={() => bookRef?.current?.pageFlip().flipNext()}
          >
            <PageCover>GUEST BOOK</PageCover>
            {guestBooksList?.map((guestBooks: IGuestbook[], i: number) => (
              <GuestBookPage
                edit={false}
                bookRef={bookRef}
                guestBooks={guestBooks}
                page={i}
                key={i + 1}
              />
            ))}
            <PageCover bookRef={bookRef} isFinish={true}>
              BOOK END
            </PageCover>
          </HTMLFlipBook>
        ) : (
          <LoadingContainer>
            <Loading width={"30vw"} height={"30vw"} />
          </LoadingContainer>
        )}
      </div>
    </Container>
  );
}

export default GuestBook;
const Container = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  background-image: url("/background.jpg");
  padding: 10vh 0;
  background-size: cover;
  filter: blur(2px);
`;
const Wrapper = styled.div`
  background: transparent;
  width: 100%;
  height: 80vh;
  position: absolute;
  top: 10vh;
  z-index: 999;
`;
