import ApiList from "../../../config/apiList";
import { axios } from "../../../lib/axios";

export const getList = async (options?: any) => {
  return axios.get(ApiList.getList, options);
};
export const getBrand = async (options?: any) => {
  return axios.get(ApiList.getBrand, options);
};
export const getRecord = async (options?: any) => {
  return axios.get(ApiList.getRecord, options);
};
export const getKeyword = async (options?: any) => {
  return axios.get(ApiList.getKeyword, options);
};
export const getListed = async (options?: any) => {
  return axios.get(ApiList.getListed, options);
};
export const getLnum = async (options?: any) => {
  return axios.get(ApiList.getListed, options);
};
export const getopAll = async (options?: any) => {
  return axios.get(ApiList.getopAll, options);
};

export const getnoteaco = async (options?: any) => {
  return axios.get(ApiList.getnoteaco, options);
};
export const getgmfData = async (options?: any) => {
  return axios.get(ApiList.getgmfData, options);
};

export const login = async (username: string, password: string) => {
  const data = {
    username: username,
    password: password,
  };

  return axios.post(ApiList.login, data);
};
export const getGdb = async (options?: any) => {
  return axios.get(ApiList.getGdb, options);
};
