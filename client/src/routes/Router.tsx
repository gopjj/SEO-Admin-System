import { BrowserRouter, Route, Routes } from "react-router-dom";
import { GoodMFamily } from "../pages/brand/component/GoodMFamily";
import { Dashboard } from "../pages/dashboard/component/Dashboard";
import { Home } from "../pages/home/component/Home";
import { Login } from "../pages/login/component/component/Login";
import { NoteOptm } from "../pages/notetrack/component/NoteOptm";
import { Uploadcom } from "../pages/upload/component/Upload";

export const Router: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="" element={<Login />}></Route> <Route />
        <Route path="" element={<Home />}>
          <Route path="upload" element={<Uploadcom />}></Route>
          <Route path="option2" element={<NoteOptm />}></Route>
          <Route path="dashboard" element={<Dashboard />}></Route>
          <Route path="brand/brand2" element={<GoodMFamily />}></Route>
        </Route>
        <Route path="/404" element={<div>404 Not Found</div>}></Route>
      </Routes>
    </BrowserRouter>
  );
};


