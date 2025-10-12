import { Dispatch, ReactNode, SetStateAction, useState } from "react";
import {
  Root,
  Trigger,
  Portal,
  Content,
  Close,
  Arrow,
} from "@radix-ui/react-popover";
import dayjs from "dayjs";

import CloseIcon from "@mui/icons-material/Close";
import DriveFileRenameOutlineIcon from "@mui/icons-material/DriveFileRenameOutline";
import DeleteIcon from "@mui/icons-material/Delete";

import {
  Root as DialogRoot,
  Trigger as DialogTrigger,
  Overlay,
  Description,
  Content as DialogContent,
  Portal as DialogPortal,
  Title,
} from "@radix-ui/react-dialog";

import { useMutation, useQuery } from "@tanstack/react-query";

import styles from "./event-popover.module.scss";
import { IAppointments } from "../../models/appointments.interface";
import JoinClasses from "../../utils/join-classes";
import { apiUrl } from "../../constants/apiUrl";
import GetAppointments from "./appointments-fetch";

import { useAtom } from "jotai";
import {
  addAppointmentState,
  options,
} from "../../routes/appointments/appointment-state";

export default function CalendarEvent({
  event,
  view,
  data,
  selectedId,
  setSelectedEvent,
  calendarDate,
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
  calendarDate: {
    start: dayjs.Dayjs;
    end: dayjs.Dayjs;
  };
}) {
  const startTime = dayjs(event.start).format("HH:mm a");
  const endTime = dayjs(event.end).format("HH:mm a");

  const appointmentData = data?.find((d) => d.id === event.id);

  const [openModal, setOpenModal] = useState(false);

  const [_, setState] = useAtom(addAppointmentState);

  const [__, setCalendarOptions] = useAtom(options);

  const deleteAppointment = useMutation({
    mutationFn: async (appointmentId: number | string) => {
      const res = await fetch(`${apiUrl}/appointments?id=${appointmentId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      return res.json();
    },
    onSuccess: () => {
      appointmentsData.refetch().then(() => {
        setOpenModal(false);
      });
    },
    onError: () => {},
  });

  const appointmentsData = useQuery({
    queryKey: ["calendar", calendarDate],
    queryFn: (): Promise<IAppointments[]> =>
      GetAppointments(
        calendarDate.start.format("YYYY-MM-DD"),
        calendarDate.end.format("YYYY-MM-DD")
      ),
    enabled: false,
  });

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
            id="event-popover"
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

              <div
                className={JoinClasses(
                  "mt-[12px] flex gap-x-[12px]",
                  styles.btns
                )}
              >
                <button
                  type="button"
                  aria-label="edit appointment opens a dialog"
                  title="edit appointment"
                  onClick={() => {
                    setCalendarOptions({
                      start: event.start,
                      end: event.end,
                      color: event.color,
                      edit: true,
                      appointment: appointmentData,
                      day: event.start,
                    });

                    setState(true);
                  }}
                >
                  <DriveFileRenameOutlineIcon htmlColor="#778ca2" />
                </button>

                <DeleteModal
                  openModal={openModal}
                  setOpenModal={setOpenModal}
                  yesBtn={
                    <button
                      type="button"
                      className=" default-button default-button-blue"
                      onClick={() => deleteAppointment.mutate(event.id)}
                    >
                      yes
                    </button>
                  }
                >
                  <button
                    type="submit"
                    aria-label="delete appointment"
                    title="delete appointment"
                    onClick={() => setOpenModal(true)}
                  >
                    <DeleteIcon htmlColor="#778ca2" />
                  </button>
                </DeleteModal>
              </div>
            </div>

            <Close
              className={styles.Close}
              aria-label="Close"
              onClick={() => setSelectedEvent(0)}
            >
              <CloseIcon />
            </Close>

            <Arrow className={styles.Arrow} />
          </Content>
        </Portal>
      </Root>
    </>
  );
}

function DeleteModal({
  openModal,
  setOpenModal,
  children,
  yesBtn,
}: {
  openModal: boolean;
  setOpenModal: Dispatch<SetStateAction<boolean>>;
  children: ReactNode;
  yesBtn: ReactNode;
}) {
  return (
    <DialogRoot open={openModal} onOpenChange={setOpenModal}>
      <DialogTrigger asChild>{children}</DialogTrigger>

      <DialogPortal>
        <Overlay
          className={styles["dialog-overlay"]}
          onClick={() => setOpenModal(false)}
        />

        <DialogContent className={styles["dialog-content"]}>
          <Title className="sr-only">delete appointment</Title>

          <Description className="">
            are you sure you want to delete this appointment
          </Description>

          <div className="flex gap-x-[12px] justify-center">
            <button
              type="button"
              className="default-button"
              onClick={() => setOpenModal(false)}
            >
              cancel
            </button>

            {yesBtn}
          </div>
        </DialogContent>
      </DialogPortal>
    </DialogRoot>
  );
}
