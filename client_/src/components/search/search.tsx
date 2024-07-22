import { useEffect, useState } from "react";
import {
  Combobox,
  ComboboxInput,
  ComboboxOptions,
  ComboboxOption,
} from "@headlessui/react";

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
  const [selected, setSelected] =
    useState<{ id: number; name: string }[]>(people);

  const [query, setQuery] = useState("");

  const [people1, setPeople1] = useState<any>([]);

  function T() {
    return new Promise((resolve, _) => {
      setTimeout(() => {
        const p = people.filter((person) =>
          person.name
            .toLowerCase()
            .replace(/\s+/g, "")
            .includes(query.toLowerCase().replace(/\s+/g, ""))
        );

        resolve(p);
      }, 300);
    });
  }

  useEffect(() => {
    if (query !== "") {
      T().then((val) => {
        setPeople1(val);
      });
    }
  }, [query]);

  return (
    <div className={JoinClasses("", styles["search-container"])}>
      <Combobox
        // virtual={{ options: people1 }}
        value={selected}
        onChange={(value) => setSelected(value!)}
        onClose={() => setQuery("")}
      >
        {({ open }) => (
          <>
            <div className="relative flex items-center w-full">
              <SearchOutlinedIcon htmlColor="#778CA2" className="absolute" />

              <ComboboxInput
                onChange={(event) => setQuery(event.target.value)}
                displayValue={(person: any) => person && person.name}
                placeholder="Search for owners, pets..."
                className="bg-transparent relative w-full"
              />
            </div>

            {open && (
              <div className={JoinClasses("relative")}>
                <ComboboxOptions
                  static
                  anchor="bottom"
                  className={JoinClasses("", styles.options)}
                >
                  {people1.map((person: any) => (
                    <ComboboxOption
                      className={JoinClasses("cursor-default", styles.option)}
                      key={person.id}
                      value={person}
                    >
                      {person.name}
                    </ComboboxOption>
                  ))}
                </ComboboxOptions>
              </div>
            )}
          </>
        )}
      </Combobox>
    </div>
  );
}
