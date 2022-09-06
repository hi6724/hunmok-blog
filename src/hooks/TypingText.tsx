import React from "react";
import styled from "styled-components";

type Props = {
  children: React.ReactNode;
  size: number;
};
/**
 *
 * @param children div등으로 감싸지 말고 하나의 text로 넣어주세요
 * @returns div로 감싸져서 모든 text들을 하나의 span으로 바꾸어서 return
 * 컴포넌트는 하나의 char로 취급한다
 */
const TypingText = ({ children, size }: Props) => {
  if (typeof children === "string") {
    children = [children];
  }

  if (!Array.isArray(children)) return null;
  return (
    <React.Fragment>
      {children?.map((string, i) => {
        if (typeof string == "string") {
          return (
            <React.Fragment key={i}>
              {string.split("").map((char: string, j: number) => {
                if (char === " ") {
                  return (
                    <div
                      key={j}
                      style={{
                        width: `${size / 3}vw`,
                        display: "inline-block",
                      }}
                    />
                  );
                }
                return <Span key={i + j}>{char}</Span>;
              })}
            </React.Fragment>
          );
        }
        return <Span key={i}>{string}</Span>;
      })}
    </React.Fragment>
  );
};

export default TypingText;

const Span = styled.span`
  opacity: 0;
`;
