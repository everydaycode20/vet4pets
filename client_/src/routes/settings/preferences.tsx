import { useEffect, useState } from "react";

import {
  Root,
  Trigger,
  Portal,
  Content,
  Item,
} from "@radix-ui/react-dropdown-menu";

import JoinClasses from "../../utils/join-classes";
import styles from "./preferences.module.scss";
import GenerateHours from "../../utils/generate-hours";
import dayjs from "dayjs";
import { Control, Controller, UseFormGetValues } from "react-hook-form";
import ISettings from "../../models/settings.interface";

const appointmentLength = [
  { name: "15 min", value: 15 },
  { name: "30 min", value: 30 },
  { name: "1 hr", value: 60 },
];

export default function Preferences({
  control,
  getValues,
}: {
  control: Control<ISettings, any>;
  getValues: UseFormGetValues<ISettings>;
}) {
  const [length, setLength] = useState(0);

  const [workingHours, setWorkingHours] = useState<{
    start: string | undefined;
    end: string | undefined;
    is12H?: boolean;
  }>({
    start: "",
    end: "",
  });

  const [hoursList, setHoursList] = useState<string[]>([]);

  useEffect(() => {
    if (length === 0) {
      getValues && setLength(getValues().appointmentLength!);
    }

    if (
      workingHours.start === "" &&
      workingHours.end === "" &&
      workingHours.is12H === undefined
    ) {
      setWorkingHours({
        start: getValues().workingHoursStart,
        end: getValues().workingHoursEnd,
        is12H: getValues().timeFormat === "12-hour" ? true : false,
      });

      setHoursList(
        GenerateHours(
          getValues().timeFormat === "12-hour" ? true : false,
          getValues().appointmentLength
        )
      );
    }
  }, [getValues()]);

  return (
    <section>
      <h2 className="">Preferences</h2>

      <div className="flex flex-col">
        <span className="mb-[12px] font-semibold">
          Default Appointment Length
        </span>

        <Controller
          name="appointmentLength"
          control={control}
          render={({ field }) => {
            return (
              <Root>
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
                          onSelect={() => {
                            setLength(length.value);

                            field.onChange(length.value);

                            field.onBlur();
                          }}
                        >
                          {length.name}
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

      <div className="mt-[12px]">
        <h3 className="mb-[12px]">Working hours</h3>

        <span className="sr-only">select start time first</span>

        <div className="flex items-center gap-x-[12px]">
          <Controller
            name="workingHoursStart"
            control={control}
            render={({ field }) => {
              return (
                <Root>
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
                            className={JoinClasses(
                              "dropdown-content-item",
                              hour === workingHours.start && "bg-light-gray-2 dark:bg-dark-4"
                            )}
                            key={hour}
                            onSelect={() => {
                              setWorkingHours((prev) => ({
                                ...prev,
                                start: hour,
                              }));

                              field.onChange(hour);

                              field.onBlur();
                            }}
                          >
                            {hour}
                          </Item>
                        );
                      })}
                    </Content>
                  </Portal>
                </Root>
              );
            }}
          />

          <span aria-hidden="true">-</span>

          <Controller
            name="workingHoursEnd"
            control={control}
            render={({ field }) => {
              return (
                <Root>
                  <Trigger
                    onBlur={() => {
                      field.onBlur();
                    }}
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

                        const startHour = dayjs(
                          `${today} ${workingHours.start}`
                        );

                        const endHour = dayjs(`${today} ${hour}`);

                        if (endHour.isAfter(startHour)) {
                          return (
                            <Item
                              className={JoinClasses(
                                "dropdown-content-item",
                                hour === workingHours.end && "bg-light-gray-2 dark:bg-dark-4"
                              )}
                              key={hour}
                              onSelect={() => {
                                setWorkingHours((prev) => ({
                                  ...prev,
                                  end: hour,
                                }));

                                field.onChange(hour);

                                field.onBlur();
                              }}
                            >
                              {hour}
                            </Item>
                          );
                        }
                      })}
                    </Content>
                  </Portal>
                </Root>
              );
            }}
          />
        </div>
      </div>
    </section>
  );
}
