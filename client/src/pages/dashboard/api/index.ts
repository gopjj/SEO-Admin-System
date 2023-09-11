// import ApiList from "../../../config/apiList";
// import { axios } from "../../../lib/axios";

// export const getList = async (options?: any) => {
//   return axios.get(ApiList.getList, options);
  
// };
import ApiList from "../../../config/apiList";
import { axios } from "../../../lib/axios";

export const getList = async (options?: any) => {
  return axios.get(ApiList.getList, options);
};

export const getRecord = async (options?: any) => {
  return axios.get(ApiList.getRecord, options);
};
export const getKeyword= async (options?: any) => {
  return axios.get(ApiList.getKeyword, options);
};

// getList().then(response => {
//   const data = response.data;
// }).catch(error => {
//   console.error(error);
// });