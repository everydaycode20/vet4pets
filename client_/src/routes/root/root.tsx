import { Outlet } from "react-router-dom";

import Sidebar from "../../components/sidebar/sidebar";

export default function Root() {
  return (
    <div className="flex w-full h-screen overflow-y-hidden">
      <Sidebar />

      <div className="w-full">
        <nav>top bar</nav>

        <main className="w-full h-full">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
