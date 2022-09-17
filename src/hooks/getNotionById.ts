import axios from "axios";

const getNotionById = async (id: string) => {
  const { data } = await axios.get(`http://localhost:8800/notion/${id}`);
  return data;
};

export default getNotionById;
