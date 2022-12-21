import gsap from "gsap";
import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { colors } from "../../color";
import TypingText from "../../hooks/TypingText";
import { bounceAnim } from "../../utils/bounceAnim";
import ScrollAnimContainer from "../ScrollAnimContainer";
import GradientButton from "../GradientButton";
import { useNavigate } from "react-router-dom";
import { useMobile } from "../../utils/useMobile";
import GuestBook from "./GuestBook";

function GuestBookPreview() {
  const isMobile = useMobile();
  const titleRef = useRef<any>();
  const navigate = useNavigate();

  useEffect(() => {
    if (titleRef.current) {
      gsap.to(titleRef.current?.children, {
        ...bounceAnim,
        scrollTrigger: {
          trigger: titleRef.current.children,
          start: "top 60%",
        },
      });
    }
  }, []);

  return (
    <div style={{ position: "relative" }}>
      <Title size={isMobile ? "3rem" : "5rem"} ref={titleRef}>
        <TypingText size={isMobile ? "3rem" : "5rem"}>방명록</TypingText>
      </Title>

      <GuestBook />

      <ScrollAnimContainer
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
          marginTop: "5vh",
        }}
        from={true}
        anim={{ opacity: 0, scale: 0.3 }}
      >
        <GradientButton onClick={() => navigate("/guestbook")}>
          방명록 보러 가기
        </GradientButton>
      </ScrollAnimContainer>
    </div>
  );
}

export default GuestBookPreview;

const Title = styled.h2<any>`
  font-size: ${(p) => p.size};
  font-family: "BM-Pro";
  color: ${colors.fluor};
  margin-bottom: 2rem;
  display: flex;
  padding: 2rem 5vw;
`;
