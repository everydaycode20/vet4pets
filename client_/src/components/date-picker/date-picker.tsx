import { MouseEvent, TouchEvent, useEffect, useRef, useState } from "react";

import { Checkbox, useCheckboxStore, useStoreState } from "@ariakit/react";
import { DayPicker } from "react-day-picker";

import dayjs from "dayjs";

import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";

import NavigateBeforeOutlinedIcon from "@mui/icons-material/NavigateBeforeOutlined";
import NavigateNextOutlinedIcon from "@mui/icons-material/NavigateNextOutlined";

import JoinClasses from "../../utils/join-classes";
import formatTime from "../../utils/format-time";

import {
  addAppointmentState,
  options,
} from "../../routes/appointments/appointment-state";

import "react-day-picker/style.css";
import "./date-picker.scss";
import styles from "./date-picker.module.scss";
import { useAtom } from "jotai";
import { Noop } from "react-hook-form";

export default function DatePicker({
  value,
  onChange,
  error,
}: {
  value?: { start: Date; end: Date; selectedDate: Date };
  onChange?: (...event: any[]) => void;
  name?: string;
  label?: string;
  control?: any;
  ref?: any;
  error?: any;
  onBlur?: Noop;
}) {
  const [state, setState] = useAtom(addAppointmentState);

  const [calendarOptions, setCalendarOptions] = useAtom(options);

  function setDateSelection(date: Date) {
    setCalendarOptions({ ...calendarOptions, day: date });
  }

  useEffect(() => {
    const selectedDate = dayjs(calendarOptions.day);

    onChange!({
      start: calendarOptions.start,
      end: calendarOptions.end,
      selectedDate: calendarOptions.day,
    });
  }, [calendarOptions]);

  return (
    <div className={JoinClasses("", styles["day-picker-container"])}>
      <DayPicker
        className={JoinClasses(
          error && error.selectedDate && styles["day-picker-container-error"]
        )}
        mode="single"
        weekStartsOn={1}
        selected={dayjs(calendarOptions.day).toDate()}
        onSelect={(date) => setDateSelection(date!)}
        components={{
          Chevron: (props) => {
            if (props.orientation === "left") {
              return (
                <NavigateBeforeOutlinedIcon
                  htmlColor="#778CA2"
                  fontSize="small"
                />
              );
            }

            if (props.orientation === "right") {
              return (
                <NavigateNextOutlinedIcon
                  htmlColor="#778CA2"
                  fontSize="small"
                />
              );
            }

            return <></>;
          },
        }}
      />

      {error && error.selectedDate && (
        <span className="text-pink block">select a date</span>
      )}

      <div className="mt-[12px] flex flex-col md:flex-row gap-[12px]">
        <TimeRangeTime
          label="Start"
          selectedTime={calendarOptions.start?.toString()}
          selectedDate={calendarOptions.day?.toString()}
          classes={error && error.start && styles["time-select-error"]}
          error={error && error.start && error.start}
          onChange={(e) => {
            setCalendarOptions({
              ...calendarOptions,
              start: dayjs(e).toDate(),
            });
          }}
        />

        <TimeRangeTime
          label="End"
          selectedTime={calendarOptions.end?.toString()}
          selectedDate={calendarOptions.day?.toString()}
          classes={error && error.end && styles["time-select-error"]}
          error={error && error.end && error.end}
          onChange={(e) => {
            setCalendarOptions({ ...calendarOptions, end: dayjs(e).toDate() });
          }}
        />
      </div>
    </div>
  );
}

const timeArr = [
  { time: "8:00", hourTime24: "8:00" },
  { time: "8:30", hourTime24: "8:30" },
  { time: "9:00", hourTime24: "9:00" },
  { time: "9:30", hourTime24: "9:30" },
  { time: "10:00", hourTime24: "10:00" },
  { time: "10:30", hourTime24: "10:30" },
  { time: "11:00", hourTime24: "11:00" },
  { time: "11:30", hourTime24: "11:30" },
  { time: "12:00", hourTime24: "12:00" },
  { time: "12:30", hourTime24: "12:30" },
  { time: "1:00", hourTime24: "13:00" },
  { time: "1:30", hourTime24: "13:30" },
  { time: "2:00", hourTime24: "14:00" },
  { time: "2:30", hourTime24: "14:30" },
  { time: "3:00", hourTime24: "15:00" },
  { time: "3:30", hourTime24: "15:30" },
  { time: "4:00", hourTime24: "16:00" },
  { time: "4:30", hourTime24: "16:30" },
  { time: "5:00", hourTime24: "17:00" },
  { time: "5:30", hourTime24: "17:30" },
  { time: "6:30", hourTime24: "18:30" },
  { time: "7:00", hourTime24: "19:00" },
  { time: "8:30", hourTime24: "20:30" },
];

function TimeRangeTime({
  label,
  onChange,
  selectedTime,
  selectedDate,
  classes,
  error,
  ...props
}: {
  label: string;
  selectedTime?: string;
  selectedDate?: string;
  classes?: string;
  error?: any;
  onChange?: (val: string | undefined) => void;
  props?: any;
}) {
  const [open, setOpen] = useState(false);

  const [time, setTime] = useState(
    selectedTime ? dayjs(selectedTime).format("H:mm") : ""
  );

  const ref = useRef<any>(null);

  useEffect(() => {
    function handler(e: any) {
      const elm = ref.current;

      if (elm && !elm.contains(e.target)) {
        setOpen(false);
      }
    }

    document.addEventListener("mousedown", handler);
    document.addEventListener("touchstart", handler);

    return () => {
      document.removeEventListener("mousedown", handler);
      document.removeEventListener("touchstart", handler);
    };
  }, []);

  return (
    <div className="w-full relative" ref={ref}>
      {!onChange && (
        <input
          type="text"
          // name=""
          // id=""
          aria-hidden={true}
          className="sr-only"
          {...props}
        />
      )}

      <div
        className={JoinClasses(
          "flex items-center",
          styles["time-select"],
          classes
        )}
        aria-expanded={open}
      >
        <div className={JoinClasses("flex flex-col items-start")}>
          <button
            className="text-black dark:text-dark-text"
            type="button"
            onClick={() => setOpen(!open)}
            id={`${label}-btn`}
          >
            {label}
          </button>

          {time === "" && (
            <span className="text-light-gray-4  dark:text-dark-text">
              Select time
            </span>
          )}

          {time !== "" && (
            <span className="text-blue  dark:text-dark-text">{time}</span>
          )}
        </div>

        {time !== "" && (
          <button
            className={JoinClasses("", styles.remove)}
            type="button"
            onClick={() => {
              setTime("");

              onChange && onChange(undefined);

              document.getElementById(`${label}-btn`)?.focus();
            }}
          >
            <CloseOutlinedIcon fontSize="small" htmlColor="#778CA2" />

            <span className="sr-only">
              remove selected {label.toLowerCase()} time
            </span>
          </button>
        )}
      </div>

      <div
        // aria-role="listbox"
        className={JoinClasses(
          "absolute overflow-y-scroll cursor-pointer z-10 bg-white dark:bg-dark",
          styles["option-list"],
          open ? "block" : "hidden"
        )}
      >
        {timeArr.map((time, index) => {
          return (
            <div
              className={JoinClasses("", styles.option)}
              key={index}
              // aria-role="option"
              onClick={() => {
                setOpen(false);

                setTime(time.time);

                const [hours, minutes] = time.hourTime24.split(":").map(Number);

                onChange &&
                  onChange(
                    dayjs(selectedDate).hour(hours).minute(minutes).toString()
                  );

                document.getElementById(`${label}-btn`)?.focus();
              }}
            >
              {time.time}
            </div>
          );
        })}
      </div>

      {error && (
        <span className="text-pink block">
          select {label === "Start" ? "a start" : "an end"} time
        </span>
      )}
    </div>
  );
}
