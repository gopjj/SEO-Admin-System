import ApiList from "../../../config/apiList";
import { axios } from "../../../lib/axios";


export interface PgyData {
  noteId: string;
  collectedDate: string;
  kolNickName: string;
  kolPrice: string;
  noteTitle: string;
  duration: string;
  engageRate: string;
  engageNum: number;
  avgViewTime: number;
  bizId: string;
  cmtNum: number;
  likeNum: number;
  shareNum: number;
  readNum: number;
  impNum: number;
  favNum: number;
  followCnt: number;
  noteCover: string;
  notePublishTime: string;
  noteType: string;
  spuName: string;
  readUvNum: number;
  totalPlatformPrice: string;
  videoPlay5sRate: string;
  picRead3sRate: string;
  kolFanNum: number;
}

export interface PccsData {
  brand: string;
  dateRange: string;
  author: string;
  formattedPccs: string;
}

export interface JgYiCiTuiCiData {
  collectedDate: string;
  keyword: string;
  monthpv: number;
  competitionScore: string;
  competitionLevel: string;
  recommendReason: string;
  bid: number;
}

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
export const getBrandhrj = async (options?: any) => {
  return axios.get(ApiList.getBrandhrj, options);
};

export const getCombinedData = async (options?: any) => {
  return axios.get(ApiList.getCombinedData, options);
};

// get brand dailyReport
export const getDailyList = async (options?: any) => {
  return axios.get(ApiList.getDailyList, options);
};

export const getPgyData = async (options?: any): Promise<PgyData[]> => {
  return await axios.get(ApiList.getPgyData, options) as PgyData[];
};

export const getJgYiCiTuiCiData = async (options?: any): Promise<JgYiCiTuiCiData[]> => {
  return await axios.get(ApiList.getJgYiCiTuiCiData, options) as JgYiCiTuiCiData[];
};

// export const getJgShangXiaYouData = async (options?: any): Promise<AxiosResponse<JgShangXiaYouData[]>> => {
//     return axios.get(ApiList.getJgShangXiaYouData, options);
// };

export const scrapePgyData = async (options?: any) => {
  return axios.get(ApiList.scrapePgyData, options);
}

export const scrapeJgYiCiTuiCiData = async (options?: any) => {
  return axios.get(ApiList.scrapeJgYiCiTuiCiData, options);
}

export const scrapeJgShangXiaYouData = async (options?: any) => {
  return axios.get(ApiList.scrapeJgShangXiaYouData, options);
}

export const scrapeJgIndustryWordData = async (options?: any) => {
  return axios.get(ApiList.scrapeJgIndustryWordData, options);
}

export const getDailyBrandData = async (options?: any): Promise<string[]> => {
  return await axios.get(ApiList.getDailyBrandData, options) as string[];
}

export const calculatePccsData = async (searchDate: string, selectedBrand: string, days: number): Promise<PccsData[]> => {
  const params = {
      date: searchDate,
      brand: selectedBrand,
      days: days
  };
  return await axios.get(ApiList.calculatePccsData, {params}) as PccsData[];
}

export const getJgYiCiTuiCiWords = async (options?: any): Promise<string> => {
  return await axios.get(ApiList.getJgYiCiTuiCiWords, options) as string;
}

export const setJgYiCiTuiCiWords = async (data: string) => {
  return await axios.post(ApiList.setJgYiCiTuiCiWords, { content: data });
}

export const setJgShangXiaYouWords = async (data: string) => {
  return await axios.post(ApiList.setJgShangXiaYouWords, { content: data });
}

export const getJgShangXiaYouWords = async (options?: any): Promise<string> => {
  return await axios.get(ApiList.getJgShangXiaYouWords, options) as string;
}