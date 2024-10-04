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
import { ControllerRenderProps } from "react-hook-form";

export default function ComboBox({
  value,
  onChange,
  placeholder,
  data,
  name,
  label,
  control,
  field,
  ref,
}: {
  value?: { id: number; name: string };
  onChange?: (...event: any[]) => void;
  placeholder: string;
  data: { id: number; name: string }[];
  name?: string;
  label?: string;
  control?: any;
  field: ControllerRenderProps<any, string>;
  ref?: any;
}) {
  const [searchValue, setSearchValue] = useState("");

  const [selectedValue, setSelectedValue] = useState<{
    id: number;
    name: string;
  }>();

  const matches = useMemo(
    () => matchSorter(data, searchValue, { keys: ["name"] }),
    [searchValue]
  );

  const itemsMap = useMemo(
    () => new Map(data.map((val) => [val.name, val])),
    []
  );

  console.log(matches);

  // console.log(value, "VALUE");

  return (
    <ComboboxProvider
      setValue={(value) => {
        startTransition(() => setSearchValue(value));
      }}
    >
      {/* <input type="hidden" {...field} value={field.value.name} /> */}
      <ComboboxLabel className={JoinClasses("block", styles.label)}>
        {label}
      </ComboboxLabel>

      <div className={JoinClasses("relative", styles["input-wrapper"])}>
        <Combobox
          // {...field}
          name={field.name}
          onBlur={field.onBlur}
          value={field.value?.name}
          className={styles["input-container"]}
        />

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
              selectValueOnClick={(e) => {
                console.log(matches);

                // const selectedItem = itemsMap.get(value.name);

                matches.length === 1 && field.onChange(matches[0]);

                return true;
              }}
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
