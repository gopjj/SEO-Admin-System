import mongoose, {Document, Model} from 'mongoose';

export interface IJgYiCiTuiCiData extends Document {
    collectedDate: string;
    keyword: string;
    monthpv: number;
    competitionScore: string;
    competitionLevel: string;
    recommendReason: string;
    bid: number;
}

export interface IJgShangXiaYouData extends Document {
    collectedDate: string;
    keyword: string;
    monthpv: number;
    sessionSource: string;
    competitionScore: string;
    competitionLevel: string;
    bid: number;
}

const jgYiCiTuiCiDataSchema = new mongoose.Schema({
    collectedDate: {
        type: String,
        required: true
    },
    keyword: {
        type: String,
        required: true
    },
    monthpv: {
        type: Number,
        required: true
    },
    competitionScore: {
        type: String,
        required: true
    },
    competitionLevel: {
        type: String,
        required: true
    },
    recommendReason: {
        type: String,
        required: true
    },
    bid: {
        type: Number,
        required: true
    }
}, {
    collection: 'jg_yicituici'
});

const jgShangXiaYouDataSchema = new mongoose.Schema({
    collectedDate: {
        type: String,
        required: true
    },
    keyword: {
        type: String,
        required: true
    },
    monthpv: {
        type: Number,
        required: true
    },
    sessionSource: {
        type: String,
        required: true
    },
    competitionScore: {
        type: String,
        required: true
    },
    competitionLevel: {
        type: String,
        required: true
    },
    bid: {
        type: Number,
        required: true
    }
}, {
    collection: 'jg_shangxiayou'
});

const JgYiCiTuiCiData: Model<IJgYiCiTuiCiData> = mongoose.model<IJgYiCiTuiCiData>('JgYiCiTuiCiData', jgYiCiTuiCiDataSchema);
const JgShangXiaYouData: Model<IJgShangXiaYouData> = mongoose.model<IJgShangXiaYouData>('JgShangXiaYouData', jgShangXiaYouDataSchema);

export class JgDataDao {
    getJgYiCiTuiCiData = async (): Promise<IJgYiCiTuiCiData[]> => {
        console.log("访问了jg数据库");
        return await JgYiCiTuiCiData.find({}).exec();
    };

    getJgShangXiaYouData = async (): Promise<IJgShangXiaYouData[]> => {
        return await JgShangXiaYouData.find({}).exec();
    };

    insertJgYiCiTuiCiData = async (data: IJgYiCiTuiCiData[]): Promise<void> => {
        const bulkOperations = data.map(item => ({
            updateOne: {
                filter: {collectedDate: item.collectedDate, keyword: item.keyword},
                update: {$setOnInsert: item},
                upsert: true
            }
        }));

        if (bulkOperations.length > 0) {
            const result = await JgYiCiTuiCiData.bulkWrite(bulkOperations, {ordered: false});
            console.log(result);
        }
    }

    // insertJgShangXiaYouData = async (data: any[]) => {
    //     const bulkOperations = data.map(item => ({
    //         updateOne: {
    //             filter: {collectedDate: item.collectedDate, keyword: item.keyword},
    //             update: {$setOnInsert: item},
    //             upsert: true
    //         }
    //     }));
    //
    //     if (bulkOperations.length > 0) {
    //         const result = await JgShangXiaYouData.bulkWrite(bulkOperations, {ordered: false});
    //         console.log(result);
    //     }
    // }
}
