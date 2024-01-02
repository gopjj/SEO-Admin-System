import { BrowserRouter, Route, Routes } from "react-router-dom";
import GoodMFamily from "../pages/Brand/Componet/goodMFamily";
import { Dashboard } from "../pages/dashboard/component/Dashboard";
import { Home } from "../pages/home/component/Home";
import Login from "../pages/login/component/login";
import { NoteOptm } from "../pages/NoteTrack/component/noteOptm";
import Upload from "../pages/upload/component/Upload";

const Router: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="" element={<Login />}></Route> <Route />
        <Route path="" element={<Home />}>
          <Route path="upload" element={<Upload />}></Route>
          <Route path="option2" element={<NoteOptm />}></Route>
          <Route path="dashboard" element={<Dashboard />}></Route>
          <Route path="brand/brand2" element={<GoodMFamily />}></Route>
        </Route>
        <Route path="/404" element={<div>404 Not Found</div>}></Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
