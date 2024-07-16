import { useMatches } from "react-router-dom";
import JoinClasses from "../../utils/join-classes";

import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";

import styles from "./top-bar.module.scss";

export default function TopBar() {
  const matches: any = useMatches();

  return (
    <header
      className={JoinClasses(
        "bg-light-gray-3 flex items-center justify-between",
        styles.header
      )}
    >
      <h1 className="mb-0 font-semibold">
        {matches[matches.length - 1].handle.title}
      </h1>

      <nav>
        <NotificationsOutlinedIcon htmlColor="#778CA2" />
      </nav>
    </header>
  );
}
