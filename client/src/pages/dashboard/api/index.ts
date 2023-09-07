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


// getList().then(response => {
//   const data = response.data;
// }).catch(error => {
//   console.error(error);
// });