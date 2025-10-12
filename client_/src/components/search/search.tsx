import { startTransition, useMemo, useState } from "react";
import {
  ComboboxProvider,
  Combobox,
  ComboboxPopover,
  ComboboxItem,
} from "@ariakit/react";

import { matchSorter } from "match-sorter";

import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";

import JoinClasses from "../../utils/join-classes";

import styles from "./search.module.scss";

const people = [
  { id: 1, name: "Wade Cooper" },
  { id: 2, name: "Arlene Mccoy" },
  { id: 3, name: "Devon Webb" },
  { id: 4, name: "Tom Cook" },
  { id: 5, name: "Tanya Fox" },
  { id: 6, name: "Hellen Schmidt" },
];

export default function Search() {
  const [searchValue, setSearchValue] = useState("");

  const matches = useMemo(
    () => matchSorter(people, searchValue, { keys: ["name"] }),

    [searchValue]
  );

  console.log(searchValue);

  return (
    <div className={JoinClasses("", styles["search-container"])}>
      <ComboboxProvider
        setValue={(value) => {
          startTransition(() => setSearchValue(value));
        }}
      >
        <div className={JoinClasses("relative flex items-center w-full")}>
          <SearchOutlinedIcon htmlColor="#778CA2" className="absolute" />

          <Combobox
            showOnKeyPress={searchValue ? true : false}
            showOnClick={searchValue ? true : false}
            placeholder={"Search for owners, pets..."}
            className="bg-transparent relative w-full"
          />
        </div>

        <ComboboxPopover
          gutter={8}
          className={JoinClasses("bg-white flex flex-col", styles.options)}
        >
          {matches.length ? (
            matches.map((value) => (
              <ComboboxItem
                key={value.id}
                value={value.name}
                className={JoinClasses("cursor-default", styles.option)}
              />
            ))
          ) : (
            <div className="no-results">No results found</div>
          )}
        </ComboboxPopover>
      </ComboboxProvider>
    </div>
  );
}
