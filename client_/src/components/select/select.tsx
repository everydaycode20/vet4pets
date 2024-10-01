import {
  SelectProvider,
  SelectLabel,
  Select as SelectBtn,
  SelectPopover,
  SelectItem,
} from "@ariakit/react";

import ExpandMoreOutlinedIcon from "@mui/icons-material/ExpandMoreOutlined";

import JoinClasses from "../../utils/join-classes";

import styles from "./select.module.scss";

export default function Select({
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
  return (
    <SelectProvider>
      {/* <SelectLabel >
          <span>{value.name || placeholder}</span>
        </SelectLabel> */}

      <SelectBtn className="button" />

      <SelectPopover gutter={4} sameWidth className="popover">
        {data.map((item) => {
          return (
            <SelectItem
              key={item.id}
              className={JoinClasses(
                "data-[focus]:bg-blue-100 ",
                styles.option
              )}
              value={item.name}
            />
          );
        })}
      </SelectPopover>
    </SelectProvider>

    // <Listbox name={name} value={value} onChange={onChange}>
    //   <ListboxButton
    //     className={JoinClasses(
    //       "text-black font-medium flex items-center justify-between",
    //       styles.button
    //     )}
    //   >
    //     <span>{value.name || placeholder}</span>

    //     <ExpandMoreOutlinedIcon htmlColor="#252631" fontSize="small" />
    //   </ListboxButton>

    //   <ListboxOptions
    //     anchor="bottom"
    //     className={JoinClasses(
    //       "z-[1600] bg-white flex flex-col",
    //       styles.options
    //     )}
    //   >
    //     {data.map((item) => (
    //       <ListboxOption
    //         key={item.id}
    //         value={item}
    //         className={JoinClasses("data-[focus]:bg-blue-100 ", styles.option)}
    //       >
    //         {item.name}
    //       </ListboxOption>
    //     ))}
    //   </ListboxOptions>
    // </Listbox>
  );
}
