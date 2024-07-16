import { Outlet } from "react-router-dom";

import Sidebar from "../../components/sidebar/sidebar";
import TopBar from "../../components/top-bar/top-bar";

export default function Root() {
  return (
    <div className="flex w-full h-screen overflow-y-hidden">
      <Sidebar />

      <div className="w-full">
        <TopBar />

        <main className="w-full h-full bg-light-gray-3">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
