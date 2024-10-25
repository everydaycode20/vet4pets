import { useState } from "react";

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

      <TimeRange />

      {selected && (
        <ul
          className={JoinClasses(
            "flex flex-wrap justify-between",
            styles["checkbox-container"]
          )}
        >
          {timeArr.map((time, index) => {
            return (
              <li key={index}>
                <TimeCheckbox key={index} time={time} />
              </li>
            );
          })}
        </ul>
      )}
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

function TimeRange() {
  const [open, setOpen] = useState(false);

  return (
    <div>
      <div>
        <input
          type="text"
          name=""
          id=""
          aria-hidden={true}
          className="sr-only"
        />

        <div
          className={JoinClasses("flex", styles["time-select"])}
          aria-expanded={open}
        >
          <div className={JoinClasses("flex flex-col", )}>
            <button type="submit" onClick={() => setOpen(!open)}>
              Start
            </button>

            <span>--:--</span>
          </div>

          <button type="submit">
            <CloseOutlinedIcon fontSize="small" />
          </button>
        </div>

        <div
          aria-role="listbox"
          className={JoinClasses(
            "absolute overflow-y-scroll cursor-pointer bg-white",
            styles["option-list"],
            open ? "block" : "hidden"
          )}
        >
          {timeArr.map((time, index) => {
            return (
              <div key={index} aria-role="option">
                {time.time}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function TimeCheckbox({
  time,
}: {
  time: { time: string; hourTime24: string };
}) {
  // const [enabled, setEnabled] = useState(false);

  const checkbox = useCheckboxStore();

  return (
    <Checkbox
      store={checkbox}
      className={JoinClasses("checkbox", styles.checkbox)}
      render={<button />}
    >
      <time dateTime={new Date(0, 0, 0, 8, 0).toLocaleTimeString()}>
        {formatTime(time.hourTime24)}
      </time>
    </Checkbox>
  );
}
