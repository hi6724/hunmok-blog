import React, { useEffect, useState, useRef } from "react";
import styled from "styled-components";
import useSWR from "swr";
import HTMLFlipBook from "react-pageflip";
import { getGuestbooksApi } from "../../utils/apiRoutes";
import Loading from "react-loading";
import PageCover from "./PageCover";
import GuestBookPage from "./GuestBookPage";
import { colors } from "../../color";
import ReactPaginate from "react-paginate";
import { LoadingContainer } from "../../pages/ProjectDetailPage";

export interface IGuestbook {
  content: string;
  createdAt: string;
  icon: { type: string; emoji: string };
  id: string;
  title: string;
  user: { username: string; password: string };
}

function GuestbookItem({ isLoading }: { isLoading: boolean }) {
  const [isMobile, setIsMobile] = useState(false);
  const { data, mutate } = useSWR<IGuestbook[]>(getGuestbooksApi);
  const [guestBooksList, setGuestBooksList] = useState<any>([]);
  const [forcePage, setForcePage] = useState(0);
  const [totalPage, setTotalPage] = useState(0);
  const [wait, setWait] = useState(false);
  const bookRef = useRef<any>();
  useEffect(() => {
    const newGuestBooks = data?.reduce((acc: any, cur, i, arr) => {
      if (i % 3 === 0) acc.push(arr.slice(i, i + 3));
      return acc;
    }, []);
    setGuestBooksList(newGuestBooks);
    isMobile
      ? setTotalPage(newGuestBooks?.length + 2)
      : setTotalPage(Math.ceil(newGuestBooks?.length / 2) + 1);
    if (wait && data && data?.length > 0) {
      setWait(false);
    }
  }, [data, isMobile]);

  useEffect(() => {
    if (isLoading) {
      setWait(true);
      mutate();
    }
  }, [isLoading]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <Container>
      {guestBooksList && !wait ? (
        <HTMLFlipBook
          width={300}
          height={400}
          minWidth={300}
          maxWidth={600}
          maxHeight={800}
          size="stretch"
          showCover={false}
          maxShadowOpacity={0.5}
          mobileScrollSupport={true}
          flippingTime={500}
          showPageCorners={false}
          // disableFlipByClick={true}
          ref={bookRef}
          onFlip={({ data }) =>
            isMobile ? setForcePage(data) : setForcePage(data / 2)
          }
          onInit={({ data: { mode } }) =>
            mode === "portrait" ? setIsMobile(true) : setIsMobile(false)
          }
          onChangeOrientation={({ data }) =>
            data === "portrait" ? setIsMobile(true) : setIsMobile(false)
          }
        >
          <PageCover>GUEST BOOK</PageCover>
          {guestBooksList?.map((guestBooks: IGuestbook[], i: number) => (
            <GuestBookPage
              bookRef={bookRef}
              guestBooks={guestBooks}
              page={i}
              edit
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

      <CustomPaginate
        breakLabel="..."
        onPageChange={({ selected }: any) => {
          if (isMobile) {
            bookRef?.current?.pageFlip().flip(selected);
          } else {
            bookRef?.current?.pageFlip().flip(selected * 2);
          }
        }}
        forcePage={forcePage}
        pageRangeDisplayed={5}
        pageCount={totalPage}
        className="paginate"
        previousLabel="<"
        nextLabel=">"
        previousClassName={"btn"}
        nextClassName={"btn"}
        pageClassName={"btn"}
        disabledClassName="disabled"
        marginPagesDisplayed={1}
        activeClassName="active"
      />
    </Container>
  );
}

export default GuestbookItem;

const CustomPaginate = styled(ReactPaginate)<any>`
  position: absolute;
  bottom: 6.5rem;
  list-style-type: none;

  display: flex;
  justify-content: center;
  align-items: center;
  height: 3rem;
  border-radius: 0.6rem;
  background: #ffffff;
  box-shadow: 0 0.8rem 2rem rgba(#5a6181, 0.05);

  .hidden {
    display: none;
  }
  .btn,
  .break,
  a {
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 1rem;
    width: 3rem;
    height: 3rem;
    cursor: pointer;
    @media (max-width: 1000px) {
      width: 2rem;
      height: 2rem;
    }
  }
  .break {
    pointer-events: none;
  }
  .btn {
    scale: 0.8;
    border-radius: 0.4rem;

    &:hover {
      color: ${colors.primary};
    }

    &.active {
      color: #ffffff;
      background: ${colors.primary};
      font-weight: 600;
      border: 4px solid ${colors.primary};
      border-radius: 50%;
    }
  }
`;
const Container = styled.div`
  position: relative;
  padding: 10rem 1rem;
  background-image: url("/background.jpg");
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: "NEXON";
  @media (max-width: 1000px) {
    padding: 10rem 0;
  }
  .flip-book {
    box-shadow: 0 0 20px 0 rgba(0, 0, 0, 0.5);
    display: none;
    background-size: cover;
  }
`;
