import { startTransition, useEffect, useMemo, useState } from "react";
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
import { Noop } from "react-hook-form";

export default function ComboBox({
  value,
  onChange,
  placeholder,
  data,
  name,
  label,
  error,
  onBlur,
  edit = false,
  required = true,
  testIdCombobox,
  testIdItem,
}: {
  value?: { id: number; name: string };
  onChange?: (...event: any[]) => void;
  placeholder: string;
  data?: { id: number; name: string }[] | any[];
  name?: string;
  label?: string;
  control?: any;
  ref?: any;
  error?: string;
  onBlur?: Noop;
  edit?: boolean;
  required: boolean;
  testIdCombobox?: string;
  testIdItem?: string;
}) {
  const [searchValue, setSearchValue] = useState("");

  const matches = useMemo(() => {
    return matchSorter(data ? data : [], searchValue, { keys: ["name"] });
  }, [searchValue, data]);

  const [open, isOpen] = useState(false);

  function handleSelect({ id, name }: { id: number; name: string }) {
    setSearchValue(name);

    onChange!({ id, name });
  }

  useEffect(() => {
    if (matches.length === 1 && !value) {
      onChange!(matches[0]);
    }
  }, [matches]);

  useEffect(() => {
    if (edit) {
      setSearchValue(value!.name);
    }
  }, [value]);

  return (
    <div className={JoinClasses("w-full", open ? "z-20" : "", "")}>
      <ComboboxProvider
        setValue={(value) => {
          startTransition(() => setSearchValue(value));
        }}
        setOpen={(e) => {
          isOpen(e);
        }}
      >
        <div className={JoinClasses("w-full")}>
          {label && (
            <ComboboxLabel className={JoinClasses("block", styles.label)}>
              {label}
            </ComboboxLabel>
          )}

          <div
            className={JoinClasses("relative w-full", styles["input-wrapper"])}
          >
            <Combobox
              data-testid={testIdCombobox}
              aria-required={required}
              aria-describedby={`${name}-desc`}
              name={name}
              onBlur={onBlur}
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              className={JoinClasses(
                "",
                styles["input-container"],
                error && styles["input-container-error"]
              )}
              placeholder={placeholder}
            />

            <ComboboxDisclosure className="" />
          </div>

          <ComboboxPopover
            gutter={8}
            sameWidth
            className={JoinClasses(
              "bg-white dark:bg-dark flex flex-col",
              styles.options
            )}
          >
            {matches.length ? (
              matches.map((value) => (
                <ComboboxItem
                  data-testid={testIdItem}
                  onClick={() => handleSelect(value)}
                  key={value.id}
                  value={value.name}
                  className={JoinClasses(
                    "data-[focus]:bg-blue-100 ",
                    styles.option
                  )}
                />
              ))
            ) : (
              <div className="no-results py-2 px-2">No results found</div>
            )}
          </ComboboxPopover>
        </div>
      </ComboboxProvider>

      {error && (
        <span id={`${name}-desc`} className="text-pink block">
          {error}
        </span>
      )}
    </div>
  );
}
