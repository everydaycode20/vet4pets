import {
  Dispatch,
  SetStateAction,
  startTransition,
  useEffect,
  useMemo,
  useState,
} from "react";
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
  error,
}: {
  value?: { id: number; name: string };
  onChange?: (...event: any[]) => void;
  placeholder: string;
  data: { id: number; name: string }[];
  name?: string;
  label?: string;
  control?: any;
  field?: ControllerRenderProps<any, string>;
  ref?: any;
  error?: string;
}) {
  const [searchValue, setSearchValue] = useState("");

  const matches = useMemo(
    () => matchSorter(data, searchValue, { keys: ["name"] }),
    [searchValue]
  );

  const [open, isOpen] = useState(false);

  useEffect(() => {
    if (matches.length === 1) {
      field?.onChange(matches[0].id);
    } else {
      field?.onChange(-1);
    }
  }, [matches]);

  return (
    <div className={JoinClasses("w-full", open ? "z-20" : "")}>
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
              name={field?.name}
              onBlur={field?.onBlur}
              onChange={field?.onChange}
              className={JoinClasses("", styles["input-container"])}
              placeholder={placeholder}
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

      {error && <span className="text-pink block">{error}</span>}
    </div>
  );
}
