import { useMatches } from "react-router-dom";
import { Dropdown } from "@mui/base/Dropdown";
import { MenuButton } from "@mui/base/MenuButton";
import { Menu } from "@mui/base/Menu";
import { MenuItem } from "@mui/base/MenuItem";

import JoinClasses from "../../utils/join-classes";

import Notifications from "../notifications/notifications";

import styles from "./top-bar.module.scss";
import Search from "../search/search";

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
        {matches[matches.length - 1].handle?.title}
      </h1>

      <nav className="flex items-center" aria-label="top navigation">
        <Search />

        <Notifications />

        <div className="flex">
          <Dropdown>
            <MenuButton className="relative">
              <span className="sr-only">profile</span>

              <div className={JoinClasses("bg-gray", styles.profile)}></div>
            </MenuButton>

            <Menu>
              <MenuItem>Profile</MenuItem>
            </Menu>
          </Dropdown>
        </div>
      </nav>
    </header>
  );
}
