// import React from 'react';

// import { fetchData } from "../dashboard/api/test1";

// // 调用 fetchData 函数

// import { Divider } from 'antd';

// const App: React.FC = () => (
//   <>
//     <Divider orientation="left" plain style={{ fontSize: '18px' ,fontWeight: 'bold' }}>
//       OLAY 表格
      
//     </Divider>
    
//     </>
// );

// export default App;
import React from 'react';
import { fetchData } from "../dashboard/api/test1";
import { Divider } from 'antd';

const App: React.FC = () => {
  const handleButtonClick = () => {
    fetchData().then(data => {
      // 在这里使用返回的数据
     // console.log(data);
    }); // 在点击按钮时执行 fetchData
  };

  return (
    <>
      <Divider orientation="left" plain style={{ fontSize: '18px', fontWeight: 'bold' }}>
        OLAY 表格
      </Divider>

      <button onClick={handleButtonClick}>执行 fetchData</button>
    </>
  );
};

export default App;