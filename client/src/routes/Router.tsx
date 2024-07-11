import { BrowserRouter, Route, Routes } from "react-router-dom";
import { GoodMFamily } from "../pages/brand/component/GoodMFamily";
import { Dashboard } from "../pages/dashboard/component/Dashboard";
import { Home } from "../pages/home/component/Home";
import { Login } from "../pages/login/component/Login";
import { NoteOptm } from "../pages/notetrack/component/NoteOptm";
import { Uploadcom } from "../pages/upload/component/Upload";
import { AppContext } from "../pages/login/component/Appcontext";
import { useContext, useState } from "react";
import { JgDataTrack  } from "../pages/xhsdata/component/JgDataTrack"
import { PgyDataTrack  } from "../pages/xhsdata/component/PgyDataTrack"
import { PccsDataTrack  } from "../pages/xhsdata/component/PccsDataTrack"
export const Router: React.FC = () => {
  
  const appConetxt = useContext(AppContext);
  const [state, setState] = useState(appConetxt.state);
  return (
    <AppContext.Provider value={{ state, setState }}>
    <BrowserRouter>
      <Routes>
        <Route path="" element={<Login />}></Route> <Route />
        <Route path="" element={<Home />}>
          <Route path="upload" element={<Uploadcom />}></Route>
          <Route path="option2" element={<NoteOptm />}></Route>
          <Route path="dashboard" element={<Dashboard />}></Route>
          <Route path="auroradata" element={<JgDataTrack />}></Route>
          <Route path="solardata" element={<PgyDataTrack />}></Route>
          <Route path="pccsdata" element={<PccsDataTrack />}></Route>
        </Route>
        <Route path="/404" element={<div>404 Not Found</div>}></Route>
      </Routes>
    </BrowserRouter>
    </AppContext.Provider>
  );
};


