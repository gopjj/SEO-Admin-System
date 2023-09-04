import ApiList from "../../../config/apiList";
import { axios } from "../../../lib/axios";

export const getList = async (options?: any) => {
  return axios.get(ApiList.getList, options);
};
