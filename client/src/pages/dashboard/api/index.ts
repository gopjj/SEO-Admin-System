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
export const getBrand = async (options?: any) => {
  return axios.get(ApiList.getBrand, options);
};
export const getBrand1 = async (options?: any) => {
  return axios.get(ApiList.getBrand1, options);
};
export const getBrand2 = async (options?: any) => {
  return axios.get(ApiList.getBrand2, options);
};
export const getRecord = async (options?: any) => {
  return axios.get(ApiList.getRecord, options);
};
export const getKeyword= async (options?: any) => {
  return axios.get(ApiList.getKeyword, options);
};
export const getOpnum= async (options?: any) => {
  return axios.get(ApiList.getOpnum, options);
};
export const getLnum= async (options?: any) => {
  return axios.get(ApiList.getOpnum, options);
};
export const login = async (username: string, password: string) => {
  const data = {
    username: username,
    password: password
  };

  return axios.post(ApiList.login, data);
};


// getList().then(response => {
//   const data = response.data;
// }).catch(error => {
//   console.error(error);
// });