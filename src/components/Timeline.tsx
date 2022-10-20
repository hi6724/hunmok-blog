import dayjs from "dayjs";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import React, { useEffect, useRef } from "react";
import styled from "styled-components";
import { colors } from "../color";
import { getTypeColor } from "./Home/Blog";

const anim = {
  open: {
    autoAlpha: 1,
    rotationX: 0,
    overwrite: true,
    duration: 0.6,
  },
  close: {
    duration: 0.3,
    autoAlpha: 0,
    rotationX: 180,
    overwrite: true,
  },
};

function Timeline() {
  const arrowRef = useRef<any>();
  const contentRef = useRef<any>();
  const containerRef = useRef<any>();

  useEffect(() => {
    gsap.to(arrowRef.current, {
      scrollTrigger: {
        trigger: arrowRef.current,
        start: "top 90%",
        end: `+=${containerRef.current?.clientHeight}`,
        scrub: true,
      },
      ease: "linear",
      height: "100%",
    });

    if (contentRef.current?.children) {
      gsap.set(contentRef.current?.children, {
        opacity: 0,
        rotationX: 180,
      });
      ScrollTrigger.batch(contentRef.current?.children, {
        interval: 0.1,
        start: "top 90%",
        onEnter: (batch) => {
          console.log();
          gsap.to(batch, anim.open);
          gsap.to(batch[0].children[0], {});
        },
        onLeave: (batch) => gsap.to(batch, anim.close),
        onEnterBack: (batch) => gsap.to(batch, anim.open),
        onLeaveBack: (batch) => gsap.to(batch, anim.close),
      });
    }
    console.dir(containerRef.current?.clientHeight);
  }, [containerRef]);

  return (
    <>
      <Container>
        <Arrow color={colors.darkGray} />
        <ArrowContainer ref={containerRef}>
          <Arrow
            ref={arrowRef}
            color={colors.lightGray}
            style={{ width: "3px", transform: "translateX(-1px)", height: "0" }}
          />
          <Content ref={contentRef}>
            <ListItem type="language">
              <figure />
              <div>
                <h6>language</h6>
                <h3>2015.04 ~ 2016.03 (어학당)</h3>
                <p>대학교에 입학하기 전에 1년동안 일본어를 공부했습니다</p>
              </div>
            </ListItem>
            <ListItem type="fullstack">
              <figure />
              <div>
                <h6>fullstack</h6>
                <h3>2016.04 ~ 2018.03 (대학교 1,2학년)</h3>
                <p>
                  정보시스템 공학과에 입학하여 컴퓨터 관련된 기초 지식을
                  쌓았습니다. 2학년까지 마친 후 휴학을 하였습니다
                </p>
              </div>
            </ListItem>
            <ListItem type="other">
              <figure />
              <div>
                <h6>other</h6>
                <h3>2018.04 ~ 2019.12 (군대)</h3>
                <p>강원도 양구에서 육군으로 군복무를 완수하였습니다</p>
              </div>
            </ListItem>
            <ListItem type="fullstack">
              <figure />
              <div>
                <h6>fullstack</h6>
                <h3>2020.04 ~ 2022.03 (대학교 3,4학년)</h3>
                <p>
                  3학년때는 대학과목을 들었고, 4학년 때는 기존의 정적인 신호등
                  시스템을 개선하는 방안에 대하여 졸업논문을 작성했습니다
                </p>
              </div>
            </ListItem>
            <ListItem type="frontend">
              <figure />
              <div>
                <h6>frontend</h6>
                <h3>2020.10 (Web개발 시작)</h3>
                <p>
                  학교수업으로 web개발 수업을 처음으로 듣게 되었습니다. 이 때
                  web 개발로 진로를 결정했습니다.
                </p>
              </div>
            </ListItem>
            <ListItem type="backend">
              <figure />
              <div>
                <h6>backend</h6>
                <h3>2021.05 ~ (ExpressJs)</h3>
                <p>
                  노마드코더의 youtube 클론 강의를 수강했습니다. ExpressJs로 MVC
                  패턴을 사용하여 youtube 사이트를 클론했습니다.
                </p>
              </div>
            </ListItem>
            <ListItem type="frontend">
              <figure />
              <div>
                <h6>frontend</h6>
                <h3>2021.08 ~ (ReactJS,ReactNative)</h3>
                <p>
                  자바스크립트의 기초가 어느정도 갖춰졌다고 생각하여, 본격적으로
                  프레임워크 공부를 시작했습니다.
                </p>
              </div>
            </ListItem>
            <ListItem type="fullstack">
              <figure />
              <div>
                <h6>fullstack</h6>
                <h3>2022.07 ~ (SSAFY)</h3>
                <p>
                  2022년 7월 부터 현재까지 SSAFY를 다니며, 저에게 부족했던
                  알고리즘 역량을 키우고 있고, 팀 프로젝트를 통해
                  커뮤니케이션능력을 기르고 있습니다.
                </p>
              </div>
            </ListItem>
          </Content>
        </ArrowContainer>
      </Container>
    </>
  );
}

export default Timeline;
const ListItem = styled.li<any>`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 2rem;
  backface-visibility: hidden;
  div {
    border-top: 1px solid ${({ type }) => getTypeColor(type)};
    width: 30vw;
    border-radius: 0.5rem;
    padding: 1rem;
    background-color: ${colors.lightBlack};
    box-shadow: rgba(50, 50, 50, 0.4) 0px 2px 4px,
      rgba(50, 50, 50, 0.3) 0px 7px 13px -3px,
      rgba(50, 50, 50, 0.2) 0px -3px 0px inset;
    h3 {
      font-size: 1.2rem;
      font-family: "BM-Jua";
      margin-bottom: 1rem;
      color: ${({ type }) => getTypeColor(type)};
    }
    h6 {
      color: ${({ type }) => getTypeColor(type)};
    }
  }
  figure {
    width: 2rem;
    border: 0.5rem solid white;
    height: 2rem;
    background-color: ${({ type }) => getTypeColor(type)};
    border-radius: 50%;
    z-index: 9;
  }
  @media screen and (max-width: 1000px) {
    width: 100%;
    div {
      width: calc(100% - 3rem);
    }
  }
`;
const Content = styled.ul`
  padding: 2rem 0;
`;
const Container = styled.article`
  min-height: 100px;
  position: relative;
`;

const ArrowContainer = styled.div`
  height: 100%;
  display: flex;
  position: relative;
  overflow: hidden;
`;

const Arrow = styled.div<any>`
  width: 1px;
  height: 100%;
  position: absolute;
  top: 0;
  left: 1rem;
  background-color: ${({ color }) => color};
`;
