import { BrowserRouter, Route, Routes } from "react-router-dom";
import Option1 from "../pages/Option1";
import Option2 from "../pages/Option2";
import App from "../pages/App";
import Dashboard from "../pages/dashboard/dashboard";

const Router: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route path="option1" element={<Option1 />}></Route>
          <Route path="option2" element={<Option2 />}></Route>
          <Route path="dashboard" element={<Dashboard/>}></Route>
        </Route>
        <Route path="/404" element={<div>404 Not Found</div>}></Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
