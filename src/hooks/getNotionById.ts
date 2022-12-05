import axios from "axios";

const getNotionById = async (id: string) => {
  const { data } = await axios.get(`http://huntree.cafe24app.com/notion/${id}`);
  return data;
};

export default getNotionById;
