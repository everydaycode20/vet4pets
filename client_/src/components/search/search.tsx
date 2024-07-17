import { Fragment, useEffect, useState } from "react";
import {
  Combobox,
  Transition,
  ComboboxInput,
  ComboboxOptions,
  ComboboxOption,
} from "@headlessui/react";

const people = [
  { id: 1, name: "Wade Cooper" },
  { id: 2, name: "Arlene Mccoy" },
  { id: 3, name: "Devon Webb" },
  { id: 4, name: "Tom Cook" },
  { id: 5, name: "Tanya Fox" },
  { id: 6, name: "Hellen Schmidt" },
];

export default function Example() {
  const [selected, setSelected] =
    useState<{ id: number; name: string }[]>(people);

  const [query, setQuery] = useState("");

  const [people1, setPeople1] = useState([]);

  let filteredPeople: { id: number; name: string }[] = [];

  function A() {
    if (query !== "") {
      setTimeout(() => {
        filteredPeople = people.filter((person) =>
          person.name
            .toLowerCase()
            .replace(/\s+/g, "")
            .includes(query.toLowerCase().replace(/\s+/g, ""))
        );
      }, 2000);
    }
  }

  //   if (query !== "") {
  //     T().then((val) => {
  //       console.log(val);

  //       setPeople1(val);
  //     });
  //   }

  function T() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const p = people.filter((person) =>
          person.name
            .toLowerCase()
            .replace(/\s+/g, "")
            .includes(query.toLowerCase().replace(/\s+/g, ""))
        );

        resolve(p);
      }, 2000);
    });
  }

  useEffect(() => {
    if (query !== "") {
      T().then((val) => {
        console.log(val);

        setPeople1(val);
      });
    }
  }, [query]);

  //   console.log(filteredPeople);

  //   const filteredPeople =
  //     query === ""
  //       ? people
  //       : people.filter((person) =>
  //           person.name
  //             .toLowerCase()
  //             .replace(/\s+/g, "")
  //             .includes(query.toLowerCase().replace(/\s+/g, ""))
  //         );

  return (
    <div className="">
      <Combobox value={selected} onChange={(value) => setSelected(value!)}>
        {({ open }) => (
          <>
            <ComboboxInput
              onChange={(event) => setQuery(event.target.value)}
              displayValue={(person: any) => person && person.name}
            />
            {open && (
              <div>
                <ComboboxOptions static>
                  {people1.map((person) => (
                    <ComboboxOption key={person.id} value={person}>
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
