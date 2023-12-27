import { BrowserRouter, Route, Routes } from "react-router-dom";
import Upload from "../pages/upload/component/Upload";
import Option2 from "../pages/NoteTrack/componet/noteOptm";
import App from "../pages/home/App";
import Dashboard from "../pages/dashboard/dashboard";
import Brand from "../pages/brand/componet/brand";
import Brand1 from "../pages/brand/componet/brand1";
import Brand2 from "../pages/brand/componet/brand2";
import Login from "../pages/login/component/login";

const Router: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="" element={<Login />}></Route> <Route />
        <Route path="" element={<App />}>
          <Route path="upload" element={<Upload />}></Route>
          <Route path="option2" element={<Option2 />}></Route>
          <Route path="dashboard" element={<Dashboard />}></Route>
          <Route path="brand/brand" element={<Brand />}></Route>
          <Route path="brand/brand1" element={<Brand1 />}></Route>
          <Route path="brand/brand2" element={<Brand2 />}></Route>
        </Route>
        <Route path="/404" element={<div>404 Not Found</div>}></Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
