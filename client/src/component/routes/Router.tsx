import { App } from "antd";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Option1 from "../page/Option1";
import Option2 from "../page/Option2";

const Router: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route path="option1" element={<Option1 />}></Route>
          <Route path="option2" element={<Option2 />}></Route>
        </Route>
        <Route path="/404" element={<div>404 Not Found</div>}></Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
