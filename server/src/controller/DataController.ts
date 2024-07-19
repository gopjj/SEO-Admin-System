import { Request, Response, RequestHandler } from 'express';
import { getDailyList } from '../dao/BrandDailyDAO.js'; // 确保路径正确
import { getttldata } from '../dao/ttlDao.js'; // 确保路径正确

class DataController {
  getDailyList: RequestHandler = async (req, res) => {
    try {
      const { brand, collect_date, keyword, note_title, author } = req.query;

      // 构建查询对象时，只添加非空参数
      const query: any = {};
      if (brand) query.brand = brand as string;
      if (collect_date) query.collect_date = collect_date as string;
      if (keyword) query.keyword = keyword as string;
      if (note_title) query.note_title = note_title as string;
      if (author) query.author = author as string;

      const results = await getDailyList(query); // 将整个查询对象传递给 DAO 方法

      const response = {
        code: 200,
        total: results.length, // 添加总记录数
        data: results.map((result: { [x: string]: any; brand: any; collect_date: any; keyword: any; note_id: any; note_title: any; note_link: any; note_type: any; publish_date: any; author: any; like: any; favourite: any; comment: any; interaction: any; fan: any; brand_emo: any; update_date: any; }) => ({
          brand: result.brand,
          collect_date: result.collect_date,
          keyword: result.keyword,
          note_id: result.note_id,
          note_title: result.note_title,
          note_link: result.note_link,
          note_type: result.note_type,
          publish_date: result.publish_date,
          author: result.author,
          like: result.like,
          favourite: result.favourite,
          comment: result.comment,
          interaction: result.interaction,
          usertype: result.usertype,
          fan: result.fan,
          brand_emo: result.brand_emo,
          update_date: result.update_date
        })),
        msg: `Fetched ${results.length} records.`
      };

      res.status(200).json(response); // 返回 JSON 格式的响应
    } catch (error) {
      console.error('Error fetching daily list:', error);
      res.status(500).json({ code: 500, data: [], msg: 'An error occurred while fetching the daily list.' });
    }
  };
  getttldata:RequestHandler = async(req,res) =>{
    try{
      const { keyword } = req.query;
      const query: any = {};
      if (keyword) query.keyword = keyword as string;
      const results = await getttldata(query); // 将整个查询对象传递给 DAO 方法
      const response = {
        code:200,
        total:results.length,
        data:results.map((result: { [x: string]: any; keyword: any; kpi: any; sovkpi: any; totalsov: any; toalcom: any; }) => ({
          keyword: result.keyword,
          kpi: result.kpi,
          sovkpi: result.sovkpi,
          totalsov: result.totalsov,
          totalcom: result.totalcom,
        })),
        msg:`Fetched ${results.length} records.`  
      };
      res.status(200).json(response); // 返回 JSON 格式的响应
    } catch (error) {
      console.error('Error fetching TT data:', error);
      res.status(500).json({ code: 500, data: [], msg: 'An error occurred while fetching the TT data.' });
    }
  };
}

export default DataController;