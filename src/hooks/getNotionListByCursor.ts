import axios, { AxiosResponse } from "axios";
import { NotionListResponse } from "../components/Home/Blog";
import { apiRoutes } from "../utils/apiRoutes";

const getNotionListByCursor = async (cursor: string, count: number) => {
  if (cursor === null) return;
  const { data }: AxiosResponse<NotionListResponse> = await axios.get(
    `${apiRoutes.rootApi}${apiRoutes.getNotionList}${cursor}`,
    {
      params: { count: count },
    }
  );
  cursor = data.next_cursor;
  return data;
};
export default getNotionListByCursor;
