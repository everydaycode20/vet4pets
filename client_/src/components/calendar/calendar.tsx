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
import { useQuery } from "@tanstack/react-query";
import { apiUrl } from "../../constants/apiUrl";
import { IAppointments } from "../../models/appointments.interface";
import CalendarEvent from "./calendar-event";

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

  console.log(calendarOptions, "<//////////////////////////////");

  const [tempCalendarSelection, setTempCalendarSelection] = useState([]);

  const handleSelectSlot = useCallback((slotInfo: SlotInfo) => {
    console.log(slotInfo, "<*********************************");

    setCalendarOptions({
      mode: "calendar",
      start: slotInfo.start,
      end: slotInfo.end,
    });

    setState(true);
  }, []);

  const data = useQuery({
    queryKey: ["calendar", calendarDate],
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

  const data2 = data.data?.map((a) => ({
    id: a.id,
    title: a.type.name,
    start: dayjs(a.date).toDate(),
    end: dayjs(a.endDate).toDate(),
    color: a.type.color,
  }));

  return (
    <div className={JoinClasses("h-full bg-white", styles.container)}>
      <Calendar
        localizer={localizer}
        events={
          calendarOptions.start && calendarOptions.end
            ? [
                ...data2!,
                {
                  id: "temp-selection",
                  start: calendarOptions.start,
                  end: calendarOptions.end,
                  color: "",
                },
              ]
            : data2
        }
        startAccessor="start"
        endAccessor="end"
        views={["month", "week", "day"]}
        max={maxDate}
        min={minDate}
        components={{
          toolbar: Toolbar,
          event: (props) => <CalendarEvent {...props} view={view} />,
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
          if (view === "month") {
            setCalendarDate({
              start: dayjs(e).startOf("month"),
              end: dayjs(e).endOf("month"),
            });
          } else if (view === "week") {
            setCalendarDate({
              start: dayjs(e).startOf("week"),
              end: dayjs(e).endOf("week"),
            });
          } else if (view === "day") {
            setCalendarDate({
              start: dayjs(e),
              end: dayjs(e),
            });
          }
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
