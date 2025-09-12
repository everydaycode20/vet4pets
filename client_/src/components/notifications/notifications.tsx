import { useEffect, useRef, useState } from "react";
import { HubConnectionBuilder } from "@microsoft/signalr";
import {
  Root,
  Trigger,
  Portal,
  Item,
  Content,
} from "@radix-ui/react-dropdown-menu";
import dayjs from "dayjs";

import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";

import JoinClasses from "../../utils/join-classes";

import styles from "./notifications.module.scss";
import { socketUrl } from "../../constants/apiUrl";
import { IAppointments } from "../../models/appointments.interface";

interface AppointmentNotification extends IAppointments {
  read?: boolean;
}

export default function Notifications() {
  const [notification, setNotification] = useState(false);

  const [appointments, setAppointments] = useState<AppointmentNotification[]>(
    []
  );

  const initialized = useRef(false);

  function connect() {
    const appointmentJson = sessionStorage.getItem("next-appointments");

    const conn = new HubConnectionBuilder()
      .withUrl(`${socketUrl}/events`)
      .build();

    conn.on("ReceiveMessage", (receiveMessage) => {
      console.log(receiveMessage);

      const appointment: AppointmentNotification = JSON.parse(receiveMessage);

      appointment.read = false;

      const appArr = [appointment, ...appointments].reverse();

      setAppointments((prev) => [appointment, ...prev]);

      if (appointmentJson === null) {
        sessionStorage.setItem("next-appointments", JSON.stringify(appArr));
      } else {
        const arr: AppointmentNotification[] = JSON.parse(appointmentJson);

        arr.unshift(appointment);

        sessionStorage.setItem("next-appointments", JSON.stringify(arr));
      }

      setNotification(true);
    });

    conn.start().then(() => {
      console.log("connection started");
    });
  }

  useEffect(() => {
    if (!initialized.current) {
      initialized.current = true;

      const appointmentJson = sessionStorage.getItem("next-appointments");

      if (appointmentJson) {
        setAppointments(JSON.parse(appointmentJson));
      }

      try {
        connect();
      } catch (error) {
        console.log(error);
      }
    }
  }, []);

  function changeRead(appointment: AppointmentNotification) {
    if (appointments) {
      const app = appointments.map((a) => {
        if (a.read === false && a.id === appointment.id) {
          a.read = true;
        }

        return a;
      });

      setAppointments(app);

      sessionStorage.setItem("next-appointments", JSON.stringify(app));
    }
  }

  return (
    <div className="" aria-live="polite">
      <Root onOpenChange={() => setNotification(false)}>
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
            {appointments.length === 0 && (
              <span className="text-black p-[2px]">
                no new appointments coming up
              </span>
            )}

            {appointments.length > 0 &&
              appointments.map((appointment) => {
                return (
                  <Item
                    onMouseEnter={() => changeRead(appointment)}
                    onFocus={() => changeRead(appointment)}
                    key={appointment.id}
                    className={JoinClasses(
                      "relative",
                      styles["notifications-content-item"]
                    )}
                  >
                    {!appointment.read && (
                      <div
                        className={JoinClasses(
                          "absolute bg-blue",
                          styles["notifications-content-item-read"]
                        )}
                      ></div>
                    )}

                    <div
                      className={JoinClasses(
                        "flex flex-col gap-x-[6px]",
                        styles["notifications-content-item-type"]
                      )}
                    >
                      <span className="font-bold">{appointment.type?.name}</span>

                      <span className="">
                        {dayjs(appointment.date).format("MMM D, h:mm a")}
                      </span>
                    </div>

                    <div className="flex gap-x-[8px]">
                      <span>
                        <span>Pet:</span> {appointment.pet?.name}
                      </span>

                      <span>
                        <span>Owner:</span> {appointment.owner?.name}
                      </span>
                    </div>
                  </Item>
                );
              })}
          </Content>
        </Portal>
      </Root>
    </div>
  );
}
