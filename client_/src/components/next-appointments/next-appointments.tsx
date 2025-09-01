import { useLayoutEffect, useState, useRef, useEffect } from "react";

import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";

import NavigateNextOutlinedIcon from "@mui/icons-material/NavigateNextOutlined";

import JoinClasses from "../../utils/join-classes";

import styles from "./next-appointments.module.scss";
import { IAppointments } from "../../models/appointments.interface";
import { useQuery } from "@tanstack/react-query";
import { apiUrl } from "../../constants/apiUrl";
import { useDebounce } from "../../utils/debounce";

dayjs.extend(customParseFormat);

export default function NextAppointments({ data }: { data?: IAppointments[] }) {
  const currentDateTime = dayjs();

  const [date, setDate] = useState(currentDateTime);

  const [isToday, setIsToday] = useState(true);

  const [isClicking, setIsClicking] = useState(0);

  const [loading, setLoading] = useState(false);

  const debouncedClick = useDebounce(isClicking);

  const containerRef = useRef(null);

  const newDayData = useQuery({
    queryKey: ["dashboard-week", isClicking !== 0],
    queryFn: async (): Promise<{ appointments: IAppointments[] }> => {
      const res = await fetch(
        `${apiUrl}/Appointments/all?type=day&date=${date.format(
          "YYYY-MM-DD HH:mm"
        )}`,
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
    enabled: false,
  });

  function Prev() {
    const newDate = date.subtract(1, "day");

    setIsToday(false);

    setDate(newDate);

    setIsClicking(isClicking - 1);

    setLoading(true);
  }

  function Next() {
    const newDate = date.add(1, "day");

    setIsToday(false);

    setDate(newDate);

    setIsClicking(isClicking + 1);

    setLoading(true);
  }

  useEffect(() => {
    if (debouncedClick) {
      newDayData.refetch().then(() => {
        setLoading(false);
      });
    }
  }, [debouncedClick]);

  useLayoutEffect(() => {
    const containerHeight = (
      containerRef.current as unknown as HTMLDivElement
    ).getBoundingClientRect().height;

    const controlsHeight = (containerRef.current as unknown as HTMLDivElement)
      .querySelector("#controls")
      ?.getBoundingClientRect().height;

    (
      (containerRef.current as unknown as HTMLDivElement).querySelector(
        "#appointments-list"
      ) as HTMLDivElement
    ).style.height =
      containerHeight -
      (controlsHeight !== undefined ? controlsHeight : 0) +
      "px";
  }, []);

  return (
    <div
      className={JoinClasses("h-full", styles.container)}
      aria-roledescription="next appointments"
      ref={containerRef}
    >
      <div id="controls">
        <h2 className="text-light-gray-4">Next appointments</h2>

        <div
          className={JoinClasses(
            "flex items-center justify-between",
            styles.controls
          )}
          aria-live="polite"
        >
          <button type="button" onClick={Prev}>
            <span className="sr-only">previous date</span>

            <NavigateNextOutlinedIcon htmlColor="#778CA2" />
          </button>

          <div
            className={JoinClasses(
              "flex items-center justify-center w-full",
              styles.date
            )}
          >
            <span className="font-medium">
              {date.format("dddd, MMMM DD YYYY").toString()}
            </span>
          </div>

          <button type="button" onClick={Next}>
            <span className="sr-only">next date</span>

            <NavigateNextOutlinedIcon htmlColor="#778CA2" />
          </button>

          {/* <span
            className="sr-only"
            // aria-hidden={hidden}
            // tabIndex={0}
            // onFocus={() => setHidden(true)}
            // aria-hidden="true"
          >{`${app.length} appointments`}</span> */}
        </div>
      </div>

      <div
        className={JoinClasses(
          "bg-white overflow-y-auto",
          styles["container-appointment-list"]
        )}
        id="appointments-list"
      >
        {(data === undefined ||
          (data.length === 0 && newDayData.data === undefined) ||
          newDayData.data?.appointments.length === 0) &&
          loading === false && <span>no appointments today</span>}

        <ul className={JoinClasses(loading ? "flex flex-col gap-1" : "")}>
          {!loading && (
            <AppointmentsList
              data={newDayData.data?.appointments || data}
              currentDateTime={currentDateTime}
              isToday={isToday}
            />
          )}

          {loading && (
            <>
              <li className="skeleton h-[71px]"></li>
              <li className="skeleton h-[71px]"></li>
              <li className="skeleton h-[71px]"></li>
              <li className="skeleton h-[71px]"></li>
            </>
          )}
        </ul>
      </div>
    </div>
  );
}

function AppointmentsList({
  data,
  currentDateTime,
  isToday,
}: {
  data?: IAppointments[];
  currentDateTime: dayjs.Dayjs;
  isToday: boolean;
}) {
  return (
    data &&
    data.map((val, i) => {
      const appointmentDate = dayjs(val.date, "YYYY-MM-DD HH:mm");

      if (appointmentDate.isAfter(currentDateTime)) {
        return (
          <li key={i}>
            <div>
              <span className="font-medium text-black">{val.type.name}</span>{" "}
              <span className="text-light-gray-4">
                {dayjs(val.date).format("HH:mm a")}
              </span>
            </div>

            <span className="text-light-gray-4">{val.owner.name}</span>
          </li>
        );
      }

      if (!isToday) {
        return (
          <li key={i}>
            <div>
              <span className="font-medium text-black">{val.type.name}</span>{" "}
              <span className="text-light-gray-4">
                {dayjs(val.date).format("HH:mm a")}
              </span>
            </div>

            <span className="text-light-gray-4">{val.owner.name}</span>
          </li>
        );
      }

      return (
        <li key={i}>
          <div>
            <span className="font-medium text-black">{val.type.name}</span>{" "}
            <span className="text-light-gray-4">
              {dayjs(val.date).format("HH:mm a")}
            </span>
          </div>

          <span className="text-light-gray-4">{val.owner.name}</span>
        </li>
      );
    })
  );
}
