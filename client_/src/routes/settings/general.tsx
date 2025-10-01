import { useEffect, useState } from "react";
import {
  Root,
  Trigger,
  Portal,
  Content,
  Item,
} from "@radix-ui/react-dropdown-menu";

import JoinClasses from "../../utils/join-classes";

import styles from "./general.module.scss";
import { Control, Controller, UseFormGetValues } from "react-hook-form";
import ISettings from "../../models/settings.interface";

const timeFormat = [
  { id: "12-hour", value: "12" },
  { id: "24-hour", value: "24" },
];

const dateFormat = [
  { id: "MM/DD/YYYY", value: "MM/DD/YYYY" },
  { id: "DD/MM/YYYY", value: "DD/MM/YYYY" },
];

const languages = [
  {
    id: 1,
    name: "English",
    isoCode: "en",
  },
  {
    id: 2,
    name: "Spanish",
    isoCode: "es",
  },
];

export default function GeneralSettings({
  control,
  getValues,
}: {
  control: Control<ISettings, any>;
  getValues: UseFormGetValues<ISettings>;
}) {
  const [language, setLanguage] = useState<string | undefined>(undefined);

  useEffect(() => {
    if (language === undefined) {
      getValues().language && setLanguage(getValues().language?.isoCode);
    }
  }, [getValues()]);

  return (
    <div className={styles.settings}>
      <section>
        <h2 className="">General Settings</h2>

        <fieldset className="">
          <legend className="font-medium mb-[12px]">Time Format</legend>

          <div className="flex gap-x-[12px]">
            {timeFormat.map((time) => {
              return (
                <div
                  key={time.id}
                  className={JoinClasses(
                    "flex items-center gap-x-[12px] p-[2px] px-[4px]",
                    styles["radio"]
                  )}
                >
                  <input
                    type="radio"
                    id={time.id}
                    value={time.id}
                    {...control.register("timeFormat")}
                  />

                  <label htmlFor={time.id}>{time.id}</label>
                </div>
              );
            })}
          </div>
        </fieldset>

        <fieldset className="mt-[12px]">
          <legend className="font-medium block mb-[12px]">Date Format</legend>

          <div className="flex gap-x-[12px]">
            {dateFormat.map((date) => {
              return (
                <div
                  key={date.id}
                  className={JoinClasses(
                    "flex items-center gap-x-[12px] p-[2px] px-[4px]",
                    styles["radio"]
                  )}
                >
                  <input
                    type="radio"
                    id={date.id}
                    value={date.value}
                    {...control.register("dateFormat")}
                  />

                  <label htmlFor={date.id}>{date.id}</label>
                </div>
              );
            })}
          </div>
        </fieldset>

        <div className="flex flex-col">
          <span className="my-[12px]">Language</span>

          <Controller
            name="language"
            control={control}
            render={({ field }) => {
              return (
                <Root
                  onOpenChange={(o) => {
                    console.log(o);
                  }}
                >
                  <Trigger
                    onBlur={() => {
                      field.onBlur();
                    }}
                    asChild
                    className={JoinClasses(
                      "dropdown-button",
                      styles["language-dropdown"]
                    )}
                  >
                    <button type="button">
                      {languages.find((l) => l.isoCode === language)?.name}
                    </button>
                  </Trigger>

                  <Portal>
                    <Content
                      className={JoinClasses(
                        "dropdown-content",
                        styles["language-dropdown-content"]
                      )}
                    >
                      {languages.map((language) => {
                        return (
                          <Item
                            className="dropdown-content-item"
                            key={language.id}
                            onSelect={() => {
                              setLanguage(language.isoCode);

                              field.onChange(language);

                              field.onBlur();
                            }}
                          >
                            {language.name}
                          </Item>
                        );
                      })}
                    </Content>
                  </Portal>
                </Root>
              );
            }}
          />
        </div>
      </section>
    </div>
  );
}
