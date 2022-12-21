import React from "react";
import styled from "styled-components";
import { colors } from "../../color";
import typeTransform from "../../utils/typeTransform";
import { CodeBlock, CopyBlock, dracula } from "react-code-blocks";

function BlogBlock({ data, typeColor }: any) {
  return (
    <Container typeColor={typeColor}>
      {typeTransform(data.type) !== "hr" ? (
        typeTransform(data.type) === "code" ? (
          <CopyBlock
            language="sql"
            text={data.payload}
            codeBlock
            theme={dracula}
            showLineNumbers={false}
            style={{ width: "100%" }}
          />
        ) : typeTransform(data.type) === "img" ? (
          <img src={data.payload.file.url} />
        ) : (
          React.createElement(typeTransform(data.type), {
            ...(data.link && {
              onClick: () => console.log(data.link),
              link: data.link,
            }),
            dangerouslySetInnerHTML: { __html: data.payload },
          })
        )
      ) : (
        React.createElement("hr", {
          color: typeColor,
          style: { width: "100%" },
        })
      )}
    </Container>
  );
}

export default BlogBlock;

const Container = styled.div<any>`
  font-size: 1rem;
  line-height: 120%;
  h1,
  h2,
  h3,
  div,
  p,
  code,
  section,
  li,
  div {
    font-family: "NEXON";
  }

  width: 100%;
  > * {
    width: 100%;
  }
  display: flex;
  white-space: pre-wrap;
  color: ${colors.gray};
  font-family: "BM-E";
  [link] {
    display: inline;
    cursor: pointer;
    border-bottom: 2px solid;
    padding-bottom: 3px;
    color: ${colors.link};
  }
  h1,
  h2,
  h3 {
    color: ${colors.lightGray};
    font-family: "BM-Pro";
    font-size: 2rem;
  }
  h2 {
    font-size: 1.8rem;
  }
  h3 {
    font-size: 1.6rem;
  }
  /* callout */
  section {
    padding: 1rem;
    background-color: ${colors.lightGray};
    color: ${colors.black};
    border-radius: 0.5rem;
    font-family: "NEXON";
  }
  p {
    font-family: "NEXON";
  }
  /* code */
  /* img */
  img {
    width: 100%;
  }
`;
