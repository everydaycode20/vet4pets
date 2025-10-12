import {
  useMemo,
  useState,
  useCallback,
  Dispatch,
  SetStateAction,
} from "react";
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

import { IAppointments } from "../../models/appointments.interface";
import CalendarEvent from "./calendar-event";

dayjs.Ls.en.weekStart = 1;
const localizer = dayjsLocalizer(dayjs);

export default function CalendarExtended({
  calendarDate,
  setCalendarDate,
  data,
}: {
  calendarDate: { start: dayjs.Dayjs; end: dayjs.Dayjs };
  setCalendarDate: Dispatch<
    SetStateAction<{
      start: dayjs.Dayjs;
      end: dayjs.Dayjs;
    }>
  >;
  data?: IAppointments[];
}) {
  const minDate = useMemo(() => new Date(1972, 0, 1, 8, 0, 0, 0), []);
  const maxDate = useMemo(() => new Date(1972, 0, 1, 18, 0, 0, 0), []);

  const [view, setView] = useState<
    "month" | "week" | "work_week" | "day" | "agenda"
  >("month");

  const onView = useCallback((newView: any) => setView(newView), [setView]);

  const [_, setState] = useAtom(addAppointmentState);

  const [calendarOptions, setCalendarOptions] = useAtom(options);

  const [selectedEvent, setSelectedEvent] = useState<string | number>(0);

  const [currentDate, setCurrentDate] = useState<Date>();

  const handleSelectSlot = useCallback((slotInfo: SlotInfo) => {
    setCalendarOptions({
      mode: "calendar",
      start: slotInfo.start,
      end: slotInfo.end,
      day: slotInfo.start,
    });

    setState(true);
  }, []);

  // const { refetch } = useQuery({
  //   queryKey: ["calendar", calendarDate],
  //   queryFn: (): Promise<IAppointments[]> =>
  //     GetAppointments(
  //       calendarDate.start.format("YYYY-MM-DD"),
  //       calendarDate.end.format("YYYY-MM-DD")
  //     ),
  //   enabled: false,
  // });

  const formattedData = data?.map((a) => {
    return {
      id: a.id,
      title: a.type.name,
      start: dayjs(a.date).toDate(),
      end: dayjs(a.endDate).toDate(),
      color: a.type.color,
    };
  });

  return (
    <div
      className={JoinClasses(
        "h-full bg-white dark:bg-dark-3",
        styles.container
      )}
    >
      <Calendar
        localizer={localizer}
        events={
          calendarOptions.end &&
          calendarOptions.start &&
          formattedData &&
          !calendarOptions.edit
            ? [
                ...formattedData,
                {
                  id: "temp-selection",
                  start: calendarOptions.start,
                  end: calendarOptions.end,
                  color: "",
                  title: "",
                },
              ]
            : formattedData
        }
        startAccessor="start"
        endAccessor="end"
        views={["month", "week", "day"]}
        max={maxDate}
        min={minDate}
        components={{
          toolbar: ({ onNavigate, label, onView, view }) => (
            <Toolbar
              label={label}
              onNavigate={onNavigate}
              onView={onView}
              view={view}
              setCalendarDate={setCalendarDate}
              currentDate={currentDate}
            />
          ),
          event: (props) =>
            data && (
              <CalendarEvent
                {...props}
                view={view}
                data={data}
                selectedId={selectedEvent}
                setSelectedEvent={setSelectedEvent}
                calendarDate={calendarDate}
              />
            ),
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
        onSelectEvent={(e, event) => {
          if (
            !document
              .getElementById("event-popover")
              ?.parentElement?.contains(event.target as Node)
          ) {
            setSelectedEvent(e.id);
          }
        }}
        onNavigate={(e) => {
          setCurrentDate(e);

          if (view === "month") {
            console.log("A");

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
  setCalendarDate,
  currentDate,
}: {
  onNavigate: (action: "PREV" | "TODAY" | "NEXT") => void;
  onView: (view: "month" | "week" | "work_week" | "day" | "agenda") => void;
  label: string;
  view: string;
  setCalendarDate: Dispatch<
    SetStateAction<{
      start: dayjs.Dayjs;
      end: dayjs.Dayjs;
    }>
  >;
  currentDate?: Date;
}) {
  const views = ["Month", "Week", "Day"];

  const [_, setState] = useAtom(addAppointmentState);

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
    if (view === "month") {
      setCalendarDate({
        start: dayjs(currentDate).startOf("month"),
        end: dayjs(currentDate).endOf("month"),
      });
    }

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

          <button
            className="text-light-gray-4 dark:text-dark-text"
            type="button"
            onClick={today}
          >
            Today
          </button>

          <button type="button" onClick={next}>
            <span className="sr-only">next</span>

            <NavigateNextOutlinedIcon htmlColor="#778CA2" fontSize="medium" />
          </button>
        </div>

        <span className="font-semibold dark:text-dark-text">{label}</span>

        <div className={JoinClasses("flex", styles["tab-list"])}>
          {views.map((v, index) => {
            return (
              <button
                className={JoinClasses(
                  "dark:text-dark-text",
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
          "flex justify-end bg-white dark:bg-dark-3",
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

          <span className="font-medium text-black dark:text-dark-text">
            Add new appointment
          </span>
        </button>
      </div>
    </div>
  );
}
