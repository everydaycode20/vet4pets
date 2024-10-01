import { startTransition, useMemo, useState } from "react";
import {
  ComboboxProvider,
  ComboboxLabel,
  Combobox,
  ComboboxDisclosure,
  ComboboxPopover,
  ComboboxItem,
} from "@ariakit/react";
import { matchSorter } from "match-sorter";

import styles from "./combobox.module.scss";
import JoinClasses from "../../utils/join-classes";

export default function ComboBox({
  value,
  onChange,
  placeholder,
  data,
  name,
  label,
}: {
  value?: { id: number; name: string };
  onChange?: (...event: any[]) => void;
  placeholder: string;
  data: { id: number; name: string }[];
  name?: string;
  label: string;
}) {
  const [searchValue, setSearchValue] = useState("");

  const matches = useMemo(
    () => matchSorter(data, searchValue, { keys: ["name"] }),
    [searchValue]
  );

  return (
    <ComboboxProvider
      setValue={(value) => {
        startTransition(() => setSearchValue(value));
      }}
    >
      <ComboboxLabel className={JoinClasses("block", styles.label)}>
        {label}
      </ComboboxLabel>

      <div className={JoinClasses("relative", styles["input-wrapper"])}>
        <Combobox
          placeholder={placeholder}
          className={styles["input-container"]}
        />

        {/* <ExpandMoreOutlinedIcon htmlColor="#252631" fontSize="small" /> */}

        <ComboboxDisclosure className="" />
      </div>

      <ComboboxPopover
        gutter={8}
        sameWidth
        className={JoinClasses("bg-white flex flex-col", styles.options)}
      >
        {matches.length ? (
          matches.map((value) => (
            <ComboboxItem
              key={value.id}
              value={value.name}
              className={JoinClasses(
                "data-[focus]:bg-blue-100 ",
                styles.option
              )}
            />
          ))
        ) : (
          <div className="no-results">No results found</div>
        )}
      </ComboboxPopover>
    </ComboboxProvider>
  );
}
