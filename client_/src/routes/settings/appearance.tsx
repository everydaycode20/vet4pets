import { Control, UseFormGetValues } from "react-hook-form";
import Toggle from "../../components/toggle/toggle";

import JoinClasses from "../../utils/join-classes";

import styles from "./appearance.module.scss";
import ISettings from "../../models/settings.interface";
import { useTranslation } from "react-i18next";

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
  const { t } = useTranslation("settings");

  return (
    <section>
      <h2 className="">{t("appearance")}</h2>

      <fieldset className="">
        <legend className="font-medium mb-[12px]">{t("theme")}</legend>

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

                <label htmlFor={theme.id}>{t(theme.name.toLowerCase())}</label>
              </div>
            );
          })}
        </div>
      </fieldset>

      <div>
        <Toggle
          label={t("reduced_motion")}
          {...control.register("reduceMotion")}
        />
      </div>
    </section>
  );
}
