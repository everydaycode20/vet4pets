import { Dropdown } from "@mui/base/Dropdown";
import { MenuButton } from "@mui/base/MenuButton";
import { Menu } from "@mui/base/Menu";
import { MenuItem } from "@mui/base/MenuItem";

import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";

import JoinClasses from "../../utils/join-classes";

import styles from "./notifications.module.scss";

export default function Notifications() {
  return (
    <div className="">
      <Dropdown>
        <MenuButton className="relative">
          <span className="sr-only">notifications</span>

          <div
            className={JoinClasses(
              "bg-pink absolute",
              styles["notification-dot"]
            )}
          ></div>

          <NotificationsOutlinedIcon htmlColor="#778CA2" />
        </MenuButton>

        <Menu>
          <MenuItem>Profile</MenuItem>
        </Menu>
      </Dropdown>
    </div>
  );
}
