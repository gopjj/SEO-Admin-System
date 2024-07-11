import mongoose, {Document, Schema, Model} from 'mongoose';

export interface IPgyData extends Document {
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

const pgyDataSchema = new Schema<IPgyData>({
    noteId: {
        type: String,
        required: true
    },
    collectedDate: {
        type: String,
        required: true
    },
    kolNickName: {
        type: String,
        required: true
    },
    kolPrice: {
        type: String,
        required: true
    },
    noteTitle: {
        type: String,
        required: true
    },
    duration: {
        type: String,
        required: true
    },
    engageRate: {
        type: String,
        required: true
    },
    engageNum: {
        type: Number,
        required: true
    },
    avgViewTime: {
        type: Number,
        required: true
    },
    bizId: {
        type: String,
        required: true
    },
    cmtNum: {
        type: Number,
        required: true
    },
    likeNum: {
        type: Number,
        required: true
    },
    shareNum: {
        type: Number,
        required: true
    },
    readNum: {
        type: Number,
        required: true
    },
    impNum: {
        type: Number,
        required: true
    },
    favNum: {
        type: Number,
        required: true
    },
    followCnt: {
        type: Number,
        required: true
    },
    noteCover: {
        type: String,
        required: true
    },
    notePublishTime: {
        type: String,
        required: true
    },
    noteType: {
        type: String,
        required: true
    },
    spuName: {
        type: String,
        required: true
    },
    readUvNum: {
        type: Number,
        required: true
    },
    totalPlatformPrice: {
        type: String,
        required: true
    },
    videoPlay5sRate: {
        type: String,
        required: true
    },
    picRead3sRate: {
        type: String,
        required: true
    },
    kolFanNum: {
        type: Number,
        required: true
    }
}, {
    collection: 'pgy'
});

const PgyData: Model<IPgyData> = mongoose.model<IPgyData>('PgyData', pgyDataSchema);

export class PgyDataDao {
    getPgyData = async (): Promise<IPgyData[]> => {
        console.log("访问了pgy数据库");
        return await PgyData.find({}).exec();
    };

    insertPgyData = async (data: IPgyData[]): Promise<void> => {
        const bulkOperations = data.map(item => ({
            updateOne: {
                filter: {collectedDate: item.collectedDate, noteTitle: item.noteTitle},
                update: {$setOnInsert: item},
                upsert: true
            }
        }));

        if (bulkOperations.length > 0) {
            const result = await PgyData.bulkWrite(bulkOperations, {ordered: false});
            console.log(result);
        }
    }
}
