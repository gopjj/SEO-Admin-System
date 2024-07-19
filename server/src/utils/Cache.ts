import {IPgyData} from "../dao/PgyDataDao.js";
import {IJgYiCiTuiCiData} from "../dao/JgDataDao.js";

type CacheType = {
    pgy: {
        content: Array<IPgyData> | null,
    },
    jgYiCiTuiCi: {
        content: Array<IJgYiCiTuiCiData> | null,
    },
};

export let cache: CacheType = {
    pgy: {
        content: null,
    },
    jgYiCiTuiCi: {
        content: null,
    },
};