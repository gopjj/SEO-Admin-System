import mongoose, {Document, Schema, Model} from "mongoose";

export interface ITbData extends Document {
    date: string;
    search: number;
    brand: string;
}

const tbDataSchema = new Schema<ITbData>({
    date: {
        type: String,
        required: true
    },
    search: {
        type: Number,
        required: true
    },
    brand: {
        type: String,
        required: true
    }
}, {
    collection: 'tb'
});

const TbData: Model<ITbData> = mongoose.model<ITbData>('TbData', tbDataSchema);

export class TbDataDao {
    getTbData = async (date: string[], brand: string): Promise<ITbData[]> => {
        const query = {
            date: {
                $gte: date[0],
                $lte: date[1]
            },
            brand: brand
        };
        return await TbData.find(query).exec();
    };

    insertTbData = async (data: ITbData[]): Promise<void> => {
        const bulkOperations = data.map(item => ({
            updateOne: {
                filter: {brand: item.brand, date: item.date},
                update: {$setOnInsert: item},
                upsert: true
            }
        }));

        if (bulkOperations.length > 0) {
            const result = await TbData.bulkWrite(bulkOperations, {ordered: false});
            console.log(result);
        }
    }
}
