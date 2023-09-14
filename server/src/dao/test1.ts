// import { Request, RequestHandler, Response } from "express";
// import startupLogDao from "./startupLogDao.js";

// namespace dashboardController {
//   export const getList: RequestHandler = async (
//     req: Request,
//     res: Response
//   ) => {
//     try {
//       const results = await startupLogDao.getList();
//       console.log(results); // 打印查询结果到控制台
//       res.send(results).status(200);
//     } catch (error) {
//       console.error(error);
//       res.status(500).send("Internal Server Error");
//     }
//   };
// }

// export default dashboardController;