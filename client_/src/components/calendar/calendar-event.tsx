import { Dispatch, SetStateAction, useEffect, useState } from "react";
import {
  Root,
  Trigger,
  Portal,
  Content,
  Close,
  PopoverArrow,
  Arrow,
} from "@radix-ui/react-popover";
import dayjs from "dayjs";

import CloseIcon from "@mui/icons-material/Close";

import styles from "./event-popover.module.scss";
import { IAppointments } from "../../models/appointments.interface";

export default function CalendarEvent({
  event,
  view,
  data,
  selectedId,
  setSelectedEvent,
}: {
  event: {
    id: number | string;
    title?: string;
    start: Date;
    end: Date;
    color?: string;
  };
  view: string;
  data?: IAppointments[];
  selectedId: string | number;
  setSelectedEvent: Dispatch<SetStateAction<string | number>>;
}) {
  const startTime = dayjs(event.start).format("HH:mm a");
  const endTime = dayjs(event.end).format("HH:mm a");

  const appointmentData = data?.find((d) => d.id === event.id);

  const [open, setOpen] = useState(true);

  return (
    <>
      <Root open={selectedId === event.id}>
        <Trigger asChild>
          <div
            className="rbc-event-custom relative"
            style={{ backgroundColor: event.color }}
          >
            <div
              className="absolute rbc-event-border"
              style={{ backgroundColor: event.color }}
            ></div>

            {(view === "week" || view === "day") && (
              <div className="rbc-event-label-custom">
                <span className="font-semibold">
                  {startTime}-{endTime}
                </span>
              </div>
            )}

            <div className="rbc-event-content-custom">
              <span className="font-semibold">{event.title}</span>
            </div>
          </div>
        </Trigger>

        <Portal>
          <Content
            className={styles.Content}
            onInteractOutside={() => {
              setSelectedEvent(0);
            }}
          >
            <div>
              <div className="flex gap-x-[12px] mb-[4px]">
                <p className="font-semibold">{event.title}</p>

                <p>
                  {startTime}-{endTime}
                </p>
              </div>

              <div className="flex gap-x-[12px]">
                <p>{appointmentData?.pet.name}</p>

                <p>{appointmentData?.owner.name}</p>
              </div>
            </div>

            <Close className={styles.Close} aria-label="Close">
              <CloseIcon />
            </Close>

            <Arrow className={styles.Arrow} />
          </Content>
        </Portal>
      </Root>
    </>
  );
}
