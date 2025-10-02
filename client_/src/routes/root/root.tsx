import { Outlet, useMatches } from "react-router-dom";

import Sidebar from "../../components/sidebar/sidebar";
import TopBar from "../../components/top-bar/top-bar";

import styles from "./root.module.scss";
import JoinClasses from "../../utils/join-classes";

export default function Root() {
  const matches: any = useMatches();

  return (
    <div className="flex w-full h-screen overflow-hidden">
      <Sidebar />

      <div className={JoinClasses("w-full", styles["main-container"])}>
        <TopBar />

        <main className="w-full bg-light-gray-3 overflow-y-auto dark:bg-dark">
          <div
            className={JoinClasses(
              "container",
              matches[matches.length - 1].handle?.title === "Appointments"
                ? "h-full"
                : ""
            )}
          >
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}
