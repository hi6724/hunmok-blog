import axios from "axios";

const getNotionById = async (id: string) => {
  const { data } = await axios.get(
    `https://hunmok-blog.herokuapp.com/notion/${id}`
  );
  return data;
};

export default getNotionById;
