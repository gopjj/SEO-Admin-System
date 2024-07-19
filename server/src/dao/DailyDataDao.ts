import mongoose from "mongoose";

const dailyDataSchema = new mongoose.Schema({
    date: {
        type: String,
        required: true
    },
    data: {
        type: Number,
        required: true
    },
    brand: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    }
}, {
    collection: 'daily'
});
const DailyData = mongoose.model('DailyData', dailyDataSchema);

export class DailyDataDao {
    getDailyData = async (date: string[], brand: string) => {
        const query = {
            date: {
                $gte: date[0],
                $lte: date[1]
            },
            brand: brand
        };
        return await DailyData.find(query).exec();
    };

    getDailyBrandData = async () => {
        return DailyData.distinct("brand");
    };

    insertDailyData = async (data: any[]) => {
        const bulkOperations = data.map(item => ({
            updateOne: {
                filter: {author: item.author, date: item.date},
                update: {$setOnInsert: item},
                upsert: true
            }
        }));

        if (bulkOperations.length > 0) {
            const result = await DailyData.bulkWrite(bulkOperations, {ordered: false});
            console.log(result);
        }
    }
}