import { BrowserRouter, Route, Routes } from "react-router-dom";
// Spelling error: component, please correct others files as well
import Brand from "../pages/brand/componet/brand";
import Brand1 from "../pages/brand/componet/brand1";
import Brand2 from "../pages/brand/componet/brand2";
import { Dashboard } from "../pages/dashboard/component/Dashboard";
import { Home } from "../pages/home/component/Home";
import Login from "../pages/login/component/login";
import { NoteOptm } from "../pages/noteTrack/component/noteOptm";
import Upload from "../pages/upload/component/Upload";

const Router: React.FC = () => {
  // Follow up:
  // Rename the router path to make it more meaningful
  return (
    <BrowserRouter>
      <Routes>
        <Route path="" element={<Login />}></Route> <Route />
        <Route path="" element={<Home />}>
          <Route path="upload" element={<Upload />}></Route>
          <Route path="option2" element={<NoteOptm />}></Route>
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
