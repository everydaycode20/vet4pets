import { useEffect, useState } from "react";
import { Dropdown } from "@mui/base/Dropdown";
import { MenuButton } from "@mui/base/MenuButton";
import { Menu } from "@mui/base/Menu";
import { MenuItem } from "@mui/base/MenuItem";
import { HubConnectionBuilder } from "@microsoft/signalr";
import {
  DropdownMenu,
  Root,
  Trigger,
  Portal,
  Item,
  Content,
} from "@radix-ui/react-dropdown-menu";

import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";

import JoinClasses from "../../utils/join-classes";

import styles from "./notifications.module.scss";
import { socketUrl } from "../../constants/apiUrl";

export default function Notifications() {
  const [notification, setNotification] = useState(false);

  function connect() {
    const conn = new HubConnectionBuilder()
      .withUrl(`${socketUrl}/events`)
      .build();

    conn.on("ReceiveMessage", (receiveMessage) => {
      console.log(receiveMessage);

      setNotification(true);

      setTimeout(() => {
        setNotification(false);
      }, 2000);
    });

    conn.start().then(() => {
      console.log("connection started");
    });
  }

  useEffect(() => {
    connect();
  }, []);

  return (
    <div className="">
      <Root>
        <Trigger
          className={JoinClasses(
            "relative",
            notification && styles["new-notification"]
          )}
        >
          <span className="sr-only">3 notifications</span>

          {notification && (
            <div
              className={JoinClasses(
                "bg-pink absolute",
                styles["notification-dot"]
              )}
            ></div>
          )}

          <NotificationsOutlinedIcon htmlColor="#778CA2" />
        </Trigger>

        <Portal>
          <Content
            className={JoinClasses("shadow-1", styles["notifications-content"])}
          >
            <Item className={styles["notifications-content-item"]}>
              <div className="flex flex-col gap-x-[5px]">
                <span className="font-bold">appointment type</span>

                <span className="font-semibold">Sep 10, 10:00am</span>
              </div>

              <div className="flex flex-col">
                <span>
                  <span>Pet:</span> Ancalagon
                </span>

                <span>
                  <span>Owner</span> Morgoth
                </span>
              </div>
            </Item>

            <Item className={styles["notifications-content-item"]}>
              <div className="flex flex-col gap-x-[5px]">
                <span className="font-bold">appointment type</span>

                <span className="font-semibold">Sep 10, 10:00am</span>
              </div>

              <div className="flex flex-col">
                <span>
                  <span>Pet:</span> Ancalagon
                </span>

                <span>
                  <span>Owner</span> Morgoth
                </span>
              </div>
            </Item>

            <Item className={styles["notifications-content-item"]}>
              <div className="flex flex-col gap-x-[5px]">
                <span className="font-bold">appointment type</span>

                <span className="font-semibold">Sep 10, 10:00am</span>
              </div>

              <div className="flex flex-col">
                <span>
                  <span className="font-semibold">Pet:</span> Ancalagon
                </span>

                <span>
                  <span className="font-semibold">Owner:</span> Morgoth
                </span>
              </div>
            </Item>
          </Content>
        </Portal>
      </Root>
    </div>
  );
}
