import { useMemo, useState, useCallback } from "react";
import { useAtom } from "jotai";
import { Calendar, dayjsLocalizer, SlotInfo } from "react-big-calendar";
import dayjs from "dayjs";

import NavigateBeforeOutlinedIcon from "@mui/icons-material/NavigateBeforeOutlined";
import NavigateNextOutlinedIcon from "@mui/icons-material/NavigateNextOutlined";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";

import JoinClasses from "../../utils/join-classes";

import styles from "./calendar.module.scss";
import "./calendar.scss";

import {
  addAppointmentState,
  options,
} from "../../routes/appointments/appointment-state";
import CalendarEvent from "./calendar-event";
import { useQuery } from "@tanstack/react-query";
import { apiUrl } from "../../constants/apiUrl";
import { IAppointments } from "../../models/appointments.interface";

dayjs.Ls.en.weekStart = 1;
const localizer = dayjsLocalizer(dayjs);

export default function CalendarExtended() {
  const minDate = useMemo(() => new Date(1972, 0, 1, 8, 0, 0, 0), []);
  const maxDate = useMemo(() => new Date(1972, 0, 1, 18, 0, 0, 0), []);

  const [calendarDate, setCalendarDate] = useState({
    start: dayjs().startOf("month"),
    end: dayjs().endOf("month"),
  });

  console.log(calendarDate);

  const [view, setView] = useState<
    "month" | "week" | "work_week" | "day" | "agenda"
  >("month");

  const onView = useCallback((newView: any) => setView(newView), [setView]);

  const [state, setState] = useAtom(addAppointmentState);

  const [calendarOptions, setCalendarOptions] = useAtom(options);

  console.log(calendarOptions.day);

  const [tempCalendarSelection, setTempCalendarSelection] = useState([]);

  const handleSelectSlot = useCallback((slotInfo: SlotInfo) => {
    console.log(slotInfo);

    setCalendarOptions({
      mode: "calendar",
      timeStart: slotInfo.start,
      timeEnd: slotInfo.end,
      day: slotInfo.start,
    });

    setState(true);
  }, []);

  console.log(view);

  const d = useQuery({
    queryKey: ["calendar"],
    queryFn: async (): Promise<IAppointments[]> => {
      const res = await fetch(
        `${apiUrl}/appointments/date-range?start=${calendarDate.start.format(
          "YYYY-MM-DD"
        )}&end=${calendarDate.end.format("YYYY-MM-DD")}`,
        {
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          method: "GET",
        }
      );

      return await res.json();
    },
  });

  console.log(d.data);

  const d2 = d.data?.map((a) => ({
    id: a.id,
    title: "test",
    start: dayjs(a.date).toDate(),
    end: dayjs(a.endDate).toDate(),
  }));

  console.log(d2);

  return (
    <div className={JoinClasses("h-full bg-white", styles.container)}>
      <Calendar
        localizer={localizer}
        events={
          calendarOptions.day &&
          calendarOptions.timeEnd &&
          calendarOptions.timeStart
            ? [
                ...d2!,
                {
                  id: "temp-selection",
                  start: calendarOptions.timeStart,
                  end: calendarOptions.timeEnd,
                },
              ]
            : d2
        }
        startAccessor="start"
        endAccessor="end"
        views={["month", "week", "day"]}
        max={maxDate}
        min={minDate}
        components={{
          toolbar: Toolbar,
          // month: {
          //   event: CalendarEvent,
          // },
        }}
        onView={onView}
        view={view}
        culture="es"
        eventPropGetter={(event: any) => {
          if (event.id === "temp-selection") {
            return {
              style: {
                backgroundColor: "rgba(77, 124, 254, 0.35)",
                border: "none",
              },
            };
          }

          return {};
        }}
        selectable
        onSelectSlot={handleSelectSlot}
        // onSelectEvent={() => {}}
        // selected={(e: any) => {
        //   console.log(e);
        // }}
        onNavigate={(e) => {
          console.log(e);
        }}
      />
    </div>
  );
}

function Toolbar({
  onNavigate,
  label,
  onView,
  view,
}: {
  onNavigate: (action: "PREV" | "TODAY" | "NEXT") => void;
  onView: (view: "month" | "week" | "work_week" | "day" | "agenda") => void;
  label: string;
  view: string;
}) {
  const views = ["Month", "Week", "Day"];

  const [state, setState] = useAtom(addAppointmentState);

  const back = () => {
    onNavigate("PREV");
  };

  const next = () => {
    onNavigate("NEXT");
  };

  const today = () => {
    onNavigate("TODAY");
  };

  const goToView = (
    view: "month" | "week" | "work_week" | "day" | "agenda"
  ) => {
    onView(view);
  };

  return (
    <div
      className={JoinClasses(
        "flex justify-between items-center",
        styles["toolbar-container"]
      )}
    >
      <div className={JoinClasses("flex items-center", styles.toolbar)}>
        <div className={JoinClasses("flex", styles["buttons-container"])}>
          <button type="button" onClick={back}>
            <span className="sr-only">back</span>

            <NavigateBeforeOutlinedIcon htmlColor="#778CA2" fontSize="medium" />
          </button>

          <button className="text-light-gray-4" type="button" onClick={today}>
            Today
          </button>

          <button type="button" onClick={next}>
            <span className="sr-only">next</span>

            <NavigateNextOutlinedIcon htmlColor="#778CA2" fontSize="medium" />
          </button>
        </div>

        <span className="font-semibold">{label}</span>

        <div className={JoinClasses("flex", styles["tab-list"])}>
          {views.map((v, index) => {
            return (
              <button
                className={JoinClasses(
                  "",
                  v.toLocaleLowerCase() === view ? styles["active-view"] : ""
                )}
                type="button"
                key={index}
                onClick={() => goToView(v.toLocaleLowerCase() as any)}
              >
                {v}
              </button>
            );
          })}
        </div>
      </div>

      <div
        className={JoinClasses(
          "flex justify-end",
          styles["add-appointment-container"]
        )}
      >
        <button
          className="flex items-center"
          type="button"
          onClick={() => setState(true)}
        >
          <div>
            <CalendarMonthIcon htmlColor="#778CA2" />
          </div>

          <span className="font-medium text-black">Add new appointment</span>
        </button>
      </div>
    </div>
  );
}

const data: any = [];
