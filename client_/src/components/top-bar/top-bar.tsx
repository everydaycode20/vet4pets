import { useMatches } from "react-router-dom";

import { Dropdown } from "@mui/base/Dropdown";
import { MenuButton } from "@mui/base/MenuButton";
import { Menu } from "@mui/base/Menu";
import { MenuItem } from "@mui/base/MenuItem";

import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";

import JoinClasses from "../../utils/join-classes";

import Notifications from "../notifications/notifications";

import styles from "./top-bar.module.scss";
import Search from "../search/search";

export default function TopBar() {
  const matches: any = useMatches();

  return (
    <header
      className={JoinClasses(
        "bg-light-gray-3 flex items-center justify-between flex-wrap lg:flex-nowrap",
        styles.header
      )}
    >
      <div className="w-full flex justify-between items-center">
        <h1 className="mb-0 font-semibold">
          {matches[matches.length - 1].handle?.title}
        </h1>

        <button className="block lg:hidden" type="button">
          <span className="sr-only">open menu</span>

          <MenuOutlinedIcon />
        </button>
      </div>

      <nav
        className="flex items-center w-full justify-end"
        aria-label="top navigation"
      >
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
