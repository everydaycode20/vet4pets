import * as Ariakit from "@ariakit/react";
import { matchSorter } from "match-sorter";
import { startTransition, useMemo, useState } from "react";

import styles from "./combobox.module.scss";
import JoinClasses from "../../utils/join-classes";

import ExpandMoreOutlinedIcon from "@mui/icons-material/ExpandMoreOutlined";

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
    <Ariakit.ComboboxProvider
      setValue={(value) => {
        startTransition(() => setSearchValue(value));
      }}
    >
      <Ariakit.ComboboxLabel className={JoinClasses("block", styles.label)}>
        {label}
      </Ariakit.ComboboxLabel>

      <div className={JoinClasses("relative", styles["input-wrapper"])}>
        <Ariakit.Combobox
          placeholder={placeholder}
          className={styles["input-container"]}
        />

        {/* <ExpandMoreOutlinedIcon htmlColor="#252631" fontSize="small" /> */}

        <Ariakit.ComboboxDisclosure className="" />
      </div>

      <Ariakit.ComboboxPopover
        gutter={8}
        sameWidth
        className={JoinClasses("bg-white flex flex-col", styles.options)}
      >
        {matches.length ? (
          matches.map((value) => (
            <Ariakit.ComboboxItem
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
      </Ariakit.ComboboxPopover>
    </Ariakit.ComboboxProvider>
  );
}
