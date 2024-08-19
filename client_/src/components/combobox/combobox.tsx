import { useState } from "react";
import {
  Combobox,
  ComboboxInput,
  ComboboxOption,
  ComboboxOptions,
  ComboboxButton,
} from "@headlessui/react";

import ExpandMoreOutlinedIcon from "@mui/icons-material/ExpandMoreOutlined";

import styles from "./combobox.module.scss";
import JoinClasses from "../../utils/join-classes";

export default function ComboBox({
  value,
  onChange,
  placeholder,
  data,
  name,
}: {
  value: { id: number; name: string };
  onChange: (...event: any[]) => void;
  placeholder: string;
  data: { id: number; name: string }[];
  name: string;
}) {
  const [selected, setSelected] = useState<
    | {
        id: number;
        name: string;
      }[]
  >(data);

  const [query, setQuery] = useState("");

  const filteredPeople =
    query === ""
      ? data
      : data.filter((value) => {
          return value.name.toLowerCase().includes(query.toLowerCase());
        });

  return (
    <Combobox name={name} value={selected} onChange={onChange}>
      <div className={JoinClasses("relative", styles["input-container"])}>
        <ComboboxInput
          className={JoinClasses("text-black font-medium", styles.input)}
          aria-label={placeholder}
          displayValue={() => (value ? value.name : "")}
          onChange={(event) => {
            setQuery(event.target.value);
          }}
          placeholder={placeholder}
        />

        <ComboboxButton className="absolute inset-y-0 right-0 px-2.5">
          <ExpandMoreOutlinedIcon htmlColor="#252631" fontSize="small" />
        </ComboboxButton>
      </div>

      <ComboboxOptions
        anchor="bottom"
        className={JoinClasses(
          "z-[1600] bg-white flex flex-col",
          styles.options
        )}
      >
        {filteredPeople.map((person) => (
          <ComboboxOption
            key={person.id}
            value={person}
            className={JoinClasses("data-[focus]:bg-blue-100 ", styles.option)}
          >
            {person.name}
          </ComboboxOption>
        ))}
      </ComboboxOptions>
    </Combobox>
  );
}
