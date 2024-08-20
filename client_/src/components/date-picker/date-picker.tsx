import { useState } from "react";

import { DayPicker, NavProps } from "react-day-picker";

import NavigateBeforeOutlinedIcon from "@mui/icons-material/NavigateBeforeOutlined";
import NavigateNextOutlinedIcon from "@mui/icons-material/NavigateNextOutlined";

import "react-day-picker/style.css";
import "./date-picker.scss";

export default function DatePicker() {
  const [selected, setSelected] = useState<Date>();

  return (
    <DayPicker
      mode="single"
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
              <NavigateNextOutlinedIcon htmlColor="#778CA2" fontSize="small" />
            );
          }

          return <></>;
        },
      }}
    />
  );
}
