import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import useSWR from "swr";

import { colors } from "../color";
import BlogBlock from "../components/BlogDetail/BlogBlock";
import BlogHeader from "../components/BlogDetail/BlogHeader";
import { getTypeColor } from "../components/Home/Blog";
import { getNotionByIdApi } from "../utils/apiRoutes";

function BlogDetail() {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [blocks, setBlocks] = useState<any>(null);
  const [pageInfo, setPageInfo] = useState<any>(null);

  const { data } = useSWR(`${getNotionByIdApi}/${id}`);
  useEffect(() => {
    if (data) {
      setBlocks(data.child);
      setPageInfo(data.pageInfo);
      setLoading(false);
    }
  }, [data]);

  return (
    <Container>
      {loading ? (
        "Loading..."
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
