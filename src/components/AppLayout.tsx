import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";

const AppLayout = () => {
  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex-1 overflow-y-auto">
        <div className="max-w-5xl mx-auto p-8">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AppLayout;
