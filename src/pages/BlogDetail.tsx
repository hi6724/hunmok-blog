import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { colors } from "../color";
import BlogHeader from "../components/BlogDetail/BlogHeader";

const getNotionById = async (id: string) => {
  const { data } = await axios.get(`http://localhost:8800/notion/${id}`);
  return data;
};

function BlogDetail() {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState<any>(null);
  const [pageInfo, setPageInfo] = useState<any>(null);

  useEffect(() => {
    if (id !== undefined) {
      (async function () {
        const data = await getNotionById(id);
        loading && setPage(data.child);
        loading && setPageInfo(data.pageInfo);
        setLoading(false);
      })();
    }
  });
  console.log(pageInfo);
  return (
    <Container>
      {loading ? (
        "Loading..."
      ) : (
        <div>
          <BlogHeader info={pageInfo} />
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
