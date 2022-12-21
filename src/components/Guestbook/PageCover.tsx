import React from "react";
import Lottie from "lottie-react";
import swipeLeft from "../../assets/swipeLeft.json";
import goBack from "../../assets/goBack.json";
import { GuestBookPageStyle } from "./GuestBookPage";
import { useMobile } from "../../utils/useMobile";

const PageCover = React.forwardRef(
  ({ bookRef, isFinish, children, ...rest }: any, ref: any) => {
    console.log(bookRef?.current?.pageFlip());
    const isMobile = useMobile();
    const handleClick = () => {
      if (!isFinish) return;
      bookRef?.current?.pageFlip().flip(0);
    };
    return (
      <GuestBookPageStyle
        className="page page-cover"
        ref={ref}
        data-density="hard"
      >
        <div className="page-content">
          <h2>{children} </h2>
          <h3 style={{ margin: "3rem auto" }}>
            <Lottie
              onClick={handleClick}
              animationData={isFinish ? goBack : swipeLeft}
              loop={true}
              style={{
                width: isFinish ? "70px" : "100px",
                cursor: "pointer",
              }}
            />
          </h3>
        </div>
      </GuestBookPageStyle>
    );
  }
);
export default PageCover;
