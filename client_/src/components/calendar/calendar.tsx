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

import { addAppointmentState } from "../../routes/appointments/appointments";

dayjs.Ls.en.weekStart = 1;
const localizer = dayjsLocalizer(dayjs);

export default function CalendarExtended() {
  const minDate = useMemo(() => new Date(1972, 0, 1, 8, 0, 0, 0), []);
  const maxDate = useMemo(() => new Date(1972, 0, 1, 18, 0, 0, 0), []);

  const [view, setView] = useState<
    "month" | "week" | "work_week" | "day" | "agenda"
  >("month");

  const onView = useCallback((newView: any) => setView(newView), [setView]);

  const handleSelectSlot = useCallback((slotInfo: SlotInfo) => {
    console.log(slotInfo);
  }, []);

  return (
    <div className={JoinClasses("h-full bg-white", styles.container)}>
      <Calendar
        localizer={localizer}
        events={data}
        startAccessor="start"
        endAccessor="end"
        views={["month", "week", "day"]}
        max={maxDate}
        min={minDate}
        components={{
          toolbar: Toolbar,
          // event: (event) => {
          //   console.log(event);

          //   return <div></div>;
          // },
        }}
        onView={onView}
        view={view}
        culture="es"
        // eventPropGetter={(event) => {
        //   console.log(event);

        //   const backgroundColor = event.allday ? "yellow" : "blue";

        //   return { style: { backgroundColor } };
        // }}
        selectable
        onSelectSlot={handleSelectSlot}
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
    <div className={JoinClasses("flex justify-between items-center", styles["toolbar-container"])}>
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

const now = new Date();

const data = [
  {
    id: 0,
    title: "All Day Event very long title",
    allDay: true,
    start: new Date(2024, 3, 0),
    end: new Date(2024, 3, 1),
    color: "red",
  },
  {
    id: 1,
    title: "Long Event",
    start: new Date(2024, 3, 7),
    end: new Date(2024, 3, 10),
  },

  {
    id: 2,
    title: "DTS STARTS",
    start: new Date(2016, 2, 13, 0, 0, 0),
    end: new Date(2016, 2, 20, 0, 0, 0),
  },

  {
    id: 3,
    title: "DTS ENDS",
    start: new Date(2016, 10, 6, 0, 0, 0),
    end: new Date(2016, 10, 13, 0, 0, 0),
  },

  {
    id: 4,
    title: "Some Event",
    start: new Date(2024, 3, 9, 0, 0, 0),
    end: new Date(2024, 3, 9, 0, 0, 0),
    allDay: true,
  },

  {
    id: 92,
    title: "Some Other Event",
    start: new Date(2024, 3, 9, 8, 0, 0),
    end: new Date(2024, 3, 10, 11, 30, 0),
  },
  {
    id: 5,
    title: "Conference",
    start: new Date(2024, 3, 11),
    end: new Date(2024, 3, 13),
    desc: "Big conference for important people",
  },
  {
    id: 6,
    title: "Meeting",
    start: new Date(2024, 3, 12, 10, 30, 0, 0),
    end: new Date(2024, 3, 12, 12, 30, 0, 0),
    desc: "Pre-meeting meeting, to prepare for the meeting",
  },
  {
    id: 7,
    title: "Lunch",
    start: new Date(2024, 3, 12, 12, 0, 0, 0),
    end: new Date(2024, 3, 12, 13, 0, 0, 0),
    desc: "Power lunch",
  },
  {
    id: 8,
    title: "Meeting",
    start: new Date(2024, 3, 12, 14, 0, 0, 0),
    end: new Date(2024, 3, 12, 15, 0, 0, 0),
  },
  {
    id: 9,
    title: "Happy Hour",
    start: new Date(2024, 3, 12, 17, 0, 0, 0),
    end: new Date(2024, 3, 12, 17, 30, 0, 0),
    desc: "Most important meal of the day",
  },
  {
    id: 10,
    title: "Dinner",
    start: new Date(2024, 3, 12, 20, 0, 0, 0),
    end: new Date(2024, 3, 12, 21, 0, 0, 0),
  },
  {
    id: 11,
    title: "Planning Meeting with Paige",
    start: new Date(2024, 3, 13, 8, 0, 0),
    end: new Date(2024, 3, 13, 10, 30, 0),
  },
  {
    id: 11.1,
    title: "Inconvenient Conference Call",
    start: new Date(2024, 3, 13, 9, 30, 0),
    end: new Date(2024, 3, 13, 12, 0, 0),
  },
  {
    id: 11.2,
    title: "Project Kickoff - Lou's Shoes",
    start: new Date(2024, 3, 13, 11, 30, 0),
    end: new Date(2024, 3, 13, 14, 0, 0),
  },
  {
    id: 11.3,
    title: "Quote Follow-up - Tea by Tina",
    start: new Date(2024, 3, 13, 15, 30, 0),
    end: new Date(2024, 3, 13, 16, 0, 0),
  },
  {
    id: 12,
    title: "Late Night Event",
    start: new Date(2024, 3, 17, 19, 30, 0),
    end: new Date(2024, 3, 18, 2, 0, 0),
  },
  {
    id: 12.5,
    title: "Late Same Night Event",
    start: new Date(2024, 3, 17, 19, 30, 0),
    end: new Date(2024, 3, 17, 23, 30, 0),
  },
  {
    id: 13,
    title: "Multi-day Event",
    start: new Date(2024, 3, 20, 19, 30, 0),
    end: new Date(2024, 3, 22, 2, 0, 0),
  },
  {
    id: 14,
    title: "Today",
    start: new Date(new Date().setHours(new Date().getHours() - 3)),
    end: new Date(new Date().setHours(new Date().getHours() + 3)),
  },
  {
    id: 15,
    title: "Point in Time Event",
    start: now,
    end: now,
  },
  {
    id: 16,
    title: "Video Record",
    start: new Date(2024, 3, 14, 15, 30, 0),
    end: new Date(2024, 3, 14, 19, 0, 0),
  },
  {
    id: 17,
    title: "Dutch Song Producing",
    start: new Date(2024, 3, 14, 16, 30, 0),
    end: new Date(2024, 3, 14, 20, 0, 0),
  },
  {
    id: 18,
    title: "Itaewon Meeting",
    start: new Date(2024, 3, 14, 16, 30, 0),
    end: new Date(2024, 3, 14, 17, 30, 0),
  },
  {
    id: 19,
    title: "Online Coding Test",
    start: new Date(2024, 3, 14, 17, 30, 0),
    end: new Date(2024, 3, 14, 20, 30, 0),
  },
  {
    id: 20,
    title: "An overlapped Event",
    start: new Date(2024, 3, 14, 17, 0, 0),
    end: new Date(2024, 3, 14, 18, 30, 0),
  },
  {
    id: 21,
    title: "Phone Interview",
    start: new Date(2024, 3, 14, 17, 0, 0),
    end: new Date(2024, 3, 14, 18, 30, 0),
  },
  {
    id: 22,
    title: "Cooking Class",
    start: new Date(2024, 3, 14, 17, 30, 0),
    end: new Date(2024, 3, 14, 19, 0, 0),
  },
  {
    id: 23,
    title: "Go to the gym",
    start: new Date(2024, 3, 14, 18, 30, 0),
    end: new Date(2024, 3, 14, 20, 0, 0),
  },
  {
    id: 24,
    title: "DST ends on this day (Europe)",
    start: new Date(2024, 9, 30, 0, 0, 0),
    end: new Date(2024, 9, 30, 4, 30, 0),
  },
  {
    id: 25,
    title: "DST ends on this day (America)",
    start: new Date(2024, 10, 6, 0, 0, 0),
    end: new Date(2024, 10, 6, 4, 30, 0),
  },
  {
    id: 26,
    title: "DST starts on this day (America)",
    start: new Date(2024, 2, 12, 0, 0, 0),
    end: new Date(2024, 2, 12, 4, 30, 0),
  },
  {
    id: 27,
    title: "DST starts on this day (Europe)",
    start: new Date(2024, 2, 26, 0, 0, 0),
    end: new Date(2024, 2, 26, 4, 30, 0),
  },
];
