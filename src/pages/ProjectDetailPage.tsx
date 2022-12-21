import React, { useEffect, useState } from "react";
import { AiFillPieChart } from "react-icons/ai";
import Loading from "react-loading";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import useSWR from "swr";

import { colors } from "../color";
import BlogBlock from "../components/BlogDetail/BlogBlock";
import DetailHeader from "../components/DetailHeader";
import { getTypeColor } from "../components/Home/Blog";
import { getProjectByIdApi } from "../utils/apiRoutes";

function ProjectDetailPage() {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [blocks, setBlocks] = useState<any>(null);
  const [pageInfo, setPageInfo] = useState<any>(null);

  const { data } = useSWR(`${getProjectByIdApi}/${id}`);
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
          <DetailHeader info={pageInfo} />
          <BlogBlocksContainer>
            <Overview>
              <h2>📝요약</h2>
              <p>{pageInfo.overview}</p>
            </Overview>
            {blocks.map((block: any) => (
              <BlogBlock
                key={block.id}
                data={block}
                typeColor={getTypeColor(pageInfo.type)}
              />
            ))}
          </BlogBlocksContainer>
        </div>
      )}
    </Container>
  );
}

export default ProjectDetailPage;
const Overview = styled.div`
  h2 {
    margin-bottom: 1rem;
    font-size: 2rem;
    font-family: "BM-Pro";
    display: flex;
    align-items: center;
    gap: 1rem;

    color: ${colors.lightGray};
  }
  p {
    color: ${colors.gray};
    white-space: break-spaces;
    font-family: "NEXON";
    font-size: 1.2rem;
    line-height: 1.5rem;
  }
  padding-bottom: 2rem;
`;
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
export const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 80vh;
`;
