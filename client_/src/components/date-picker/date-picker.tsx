import { MouseEvent, TouchEvent, useEffect, useRef, useState } from "react";

import { Checkbox, useCheckboxStore, useStoreState } from "@ariakit/react";
import { DayPicker } from "react-day-picker";

import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";

import NavigateBeforeOutlinedIcon from "@mui/icons-material/NavigateBeforeOutlined";
import NavigateNextOutlinedIcon from "@mui/icons-material/NavigateNextOutlined";

import JoinClasses from "../../utils/join-classes";
import formatTime from "../../utils/format-time";

import "react-day-picker/style.css";
import "./date-picker.scss";
import styles from "./date-picker.module.scss";

export default function DatePicker() {
  const [selected, setSelected] = useState<Date>();

  // console.log(selected);

  return (
    <div className={JoinClasses("", styles["day-picker-container"])}>
      <DayPicker
        mode="single"
        weekStartsOn={1}
        selected={selected}
        onSelect={setSelected}
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

      <div className="mt-[12px] flex flex-col md:flex-row gap-[12px]">
        <TimeRangeTime
          label="Start"
          onChange={(e) => {
            console.log(e);
          }}
        />

        <TimeRangeTime
          label="End"
          onChange={(e) => {
            console.log(e);
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
];

function TimeRangeTime({
  label,
  onChange,
  ...props
}: {
  label: string;
  onChange?: (val: string) => void;
  props?: any;
}) {
  const [open, setOpen] = useState(false);

  const [time, setTime] = useState("");

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
        className={JoinClasses("flex items-center", styles["time-select"])}
        aria-expanded={open}
      >
        <div className={JoinClasses("flex flex-col items-start")}>
          <button
            className="text-black"
            type="submit"
            onClick={() => setOpen(!open)}
            id={`${label}-btn`}
          >
            {label}
          </button>

          {time === "" && (
            <span className="text-light-gray-4">Select time</span>
          )}

          {time !== "" && <span className="text-blue">{time}</span>}
        </div>

        {time !== "" && (
          <button
            className={JoinClasses("", styles.remove)}
            type="submit"
            onClick={() => {
              setTime("");

              onChange && onChange("");

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
        aria-role="listbox"
        className={JoinClasses(
          "absolute overflow-y-scroll cursor-pointer bg-white z-10",
          styles["option-list"],
          open ? "block" : "hidden"
        )}
      >
        {timeArr.map((time, index) => {
          return (
            <div
              className={JoinClasses("", styles.option)}
              key={index}
              aria-role="option"
              onClick={() => {
                setOpen(false);

                setTime(time.time);

                onChange && onChange(time.time);

                document.getElementById(`${label}-btn`)?.focus();
              }}
            >
              {time.time}
            </div>
          );
        })}
      </div>
    </div>
  );
}
