import React, { useEffect, useState } from "react";
import Loading from "react-loading";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import useSWR from "swr";

import { colors } from "../color";
import BlogBlock from "../components/BlogDetail/BlogBlock";
import BlogHeader from "../components/BlogDetail/BlogHeader";
import { getTypeColor } from "../components/Home/Blog";
import { getNotionByIdApi } from "../utils/apiRoutes";
import { LoadingContainer } from "./ProjectDetailPage";

function BlogDetail() {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [blocks, setBlocks] = useState<any>(null);
  const [pageInfo, setPageInfo] = useState<any>(null);

  const { data } = useSWR(`${getNotionByIdApi}/${id}`);
  useEffect(() => {
    window.scrollTo(0, 0);
    if (data) {
      setBlocks(data.child);
      setPageInfo(data.pageInfo);
      setLoading(false);
    }
  }, [data]);

  return (
    <Container>
      {loading ? (
        <LoadingContainer>
          <Loading width={"30vw"} height={"30vw"} />
        </LoadingContainer>
      ) : (
        <div>
          <BlogHeader info={pageInfo} />
          <BlogBlocksContainer>
            {blocks.map((block: any) => (
              <BlogBlock
                key={block.id}
                data={block}
                typeColor={getTypeColor(pageInfo.type)}
              />
            ))}
          </BlogBlocksContainer>
          <div>댓글창</div>
        </div>
      )}
    </Container>
  );
}

export default BlogDetail;

const Container = styled.div`
  padding: 10vh 5vw;
  width: 100%;
  min-height: 100vh;
  background-color: ${colors.lightBlack};
`;
const BlogBlocksContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
`;
