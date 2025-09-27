import {
  Root,
  Trigger,
  Portal,
  Content,
  Item,
} from "@radix-ui/react-dropdown-menu";

import JoinClasses from "../../utils/join-classes";

import styles from "./general.module.scss";
import { useState } from "react";
import Toggle from "../../components/toggle/toggle";
import GenerateHours from "../../utils/generate-hours";
import dayjs from "dayjs";

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
    id: "en",
    value: "English",
  },
  {
    id: "es",
    value: "Spanish",
  },
];

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

const appointmentLength = [
  { name: "15 min", value: 15 },
  { name: "30 min", value: 30 },
  { name: "1 hr", value: 60 },
];

export default function GeneralSettings() {
  const [language, setLanguage] = useState("en");

  const [length, setLength] = useState(30);

  console.log(GenerateHours(false, 15));

  const [hoursList, setHoursList] = useState(GenerateHours(false, 30));

  const [workingHours, setWorkingHours] = useState({
    start: "",
    end: "",
    is12H: false,
  });

  return (
    <div className={styles.settings}>
      <form className="flex flex-col gap-y-[12px]">
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
                      name="time-format"
                      id={time.id}
                      value={time.value}
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
                      name="date-format"
                      id={date.id}
                      value={date.value}
                    />

                    <label htmlFor={date.id}>{date.id}</label>
                  </div>
                );
              })}
            </div>
          </fieldset>

          <div className="flex flex-col">
            <span className="my-[12px]">Language</span>

            <Root>
              <Trigger
                asChild
                className={JoinClasses(
                  "dropdown-button",
                  styles["language-dropdown"]
                )}
              >
                <button type="button">
                  {languages.find((l) => l.id === language)?.value}
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
                        onSelect={() => setLanguage(language.id)}
                      >
                        {language.value}
                      </Item>
                    );
                  })}
                </Content>
              </Portal>
            </Root>
          </div>
        </section>

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
                      name="appearance"
                      id={theme.id}
                      value={theme.id}
                    />

                    <label htmlFor={theme.id}>{theme.name}</label>
                  </div>
                );
              })}
            </div>
          </fieldset>

          <div>
            <Toggle label="Reduced Motion" />
          </div>
        </section>

        <section>
          <h2 className="">Preferences</h2>

          <div className="flex flex-col">
            <span className="mb-[12px] font-semibold">
              Default Appointment Length
            </span>

            <Root>
              <Trigger
                asChild
                className={JoinClasses(
                  "dropdown-button",
                  styles["language-dropdown"]
                )}
              >
                <button type="button">
                  {appointmentLength.find((l) => l.value === length)?.name}
                </button>
              </Trigger>

              <Portal>
                <Content
                  className={JoinClasses(
                    "dropdown-content",
                    styles["language-dropdown-content"]
                  )}
                >
                  {appointmentLength.map((length) => {
                    return (
                      <Item
                        className="dropdown-content-item"
                        key={length.value}
                        onSelect={() => setLength(length.value)}
                      >
                        {length.name}
                      </Item>
                    );
                  })}
                </Content>
              </Portal>
            </Root>
          </div>

          <div className="mt-[12px]">
            <h3 className="mb-[12px]">Working hours</h3>

            <span className="sr-only">select start time first</span>

            <div className="flex items-center gap-x-[12px]">
              <Root>
                <Trigger
                  asChild
                  className={JoinClasses(
                    "dropdown-button",
                    styles["language-dropdown"]
                  )}
                >
                  <button type="button">
                    {workingHours.start
                      ? workingHours.start
                      : "Select start time"}
                  </button>
                </Trigger>

                <Portal>
                  <Content
                    className={JoinClasses(
                      "dropdown-content h-[300px] overflow-y-auto",
                      styles["language-dropdown-content"]
                    )}
                  >
                    {hoursList.map((hour) => {
                      return (
                        <Item
                          className="dropdown-content-item"
                          key={hour}
                          onSelect={() =>
                            setWorkingHours((prev) => ({
                              ...prev,
                              start: hour,
                            }))
                          }
                        >
                          {hour}
                        </Item>
                      );
                    })}
                  </Content>
                </Portal>
              </Root>

              <span aria-hidden="true">-</span>

              <Root>
                <Trigger
                  disabled={workingHours.start === ""}
                  asChild
                  className={JoinClasses(
                    "dropdown-button",
                    styles["language-dropdown"],
                    workingHours.start === "" && "cursor-not-allowed"
                  )}
                >
                  <button type="button">
                    {workingHours.end ? workingHours.end : "Select end time"}
                  </button>
                </Trigger>

                <Portal>
                  <Content
                    className={JoinClasses(
                      "dropdown-content h-[300px] overflow-y-auto",
                      styles["language-dropdown-content"]
                    )}
                  >
                    {hoursList.map((hour) => {
                      const today = dayjs().format("YYYY-MM-DD");

                      const startHour = dayjs(`${today} ${workingHours.start}`);

                      const endHour = dayjs(`${today} ${hour}`);

                      if (endHour.isAfter(startHour)) {
                        return (
                          <Item
                            className="dropdown-content-item"
                            key={hour}
                            onSelect={() =>
                              setWorkingHours((prev) => ({
                                ...prev,
                                end: hour,
                              }))
                            }
                          >
                            {hour}
                          </Item>
                        );
                      }
                    })}
                  </Content>
                </Portal>
              </Root>
            </div>
          </div>
        </section>

        <section>
          <h2 className=""></h2>
        </section>
      </form>
    </div>
  );
}
