import { Control, UseFormGetValues } from "react-hook-form";
import Toggle from "../../components/toggle/toggle";

import JoinClasses from "../../utils/join-classes";

import styles from "./appearance.module.scss";
import ISettings from "../../models/settings.interface";

const themes = [
  {
    id: "Light",
    name: "Light",
  },
  {
    id: "dark",
    name: "Dark",
  },
  {
    id: "auto",
    name: "Auto (match system)",
  },
];

export default function Appearance({
  control,
}: {
  control: Control<ISettings, any>;
  getValues?: UseFormGetValues<ISettings>;
}) {
  return (
    <section>
      <h2 className="">Appearance</h2>

      <fieldset className="">
        <legend className="font-medium mb-[12px]">Theme</legend>

        <div className="flex gap-x-[12px]">
          {themes.map((theme) => {
            return (
              <div
                key={theme.id}
                className={JoinClasses(
                  "flex items-center gap-x-[12px] p-[2px] px-[4px]",
                  styles["radio"]
                )}
              >
                <input
                  type="radio"
                  id={theme.id}
                  value={theme.name}
                  {...control.register("appearance.name")}
                />

                <label htmlFor={theme.id}>{theme.name}</label>
              </div>
            );
          })}
        </div>
      </fieldset>

      <div>
        <Toggle label="Reduced Motion" {...control.register("reduceMotion")} />
      </div>
    </section>
  );
}
