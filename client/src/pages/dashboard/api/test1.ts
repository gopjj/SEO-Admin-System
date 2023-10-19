import { getList, getOpnum } from "../api/index";



interface DataSource {
  ID: number;
  author: string;
  note_title: string;
  keyword: string;
  publish_date: string;
  brand: string;
  note_status: string;
  listed: number;
  // 其他属性...
}
// const dataSource = [
//   {
//     key: "1",
//     author: "土拨鼠",
//     title: "Olay两款小白瓶 应该怎么选？Get牛奶肌",
//     keyword: "美白精华",
//     date: "2020-03-13",
//     brand: "Olay",
//     status: "已收录",
//     number: "5",
//   },

export const fetchData = async () => {
    try {
      const response = await getOpnum();
      const returnedData = response as unknown as Array<any>;

     for (const data of returnedData) {
      // console.log(data.ID);
      // console.log(data.author);
      // console.log(data.note_title);
      // console.log(data.keyword);
      // console.log(data.publish_date);
      // console.log(data.brand);
      // console.log(data.note_status);
      // console.log(data.listed);
      console.log(data.opsum);
      // 还可以访问其他属性...
    }
    //   console.log(((response as unknown as any) as Array).forEach(element => {
        
    //   }););
    console.log(response);
    } catch (error) {
      console.error(error);
    }
  };

