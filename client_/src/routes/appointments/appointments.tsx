import { useState } from "react";
import { atom, useAtom } from "jotai";

import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { object, string, number, date } from "zod";

import {
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
} from "../../components/drawer/drawer";

import Modal from "../../components/modal/modal";
import CalendarExtended from "../../components/calendar/calendar";
import Select from "../../components/select/select";
import ComboBox from "../../components/combobox/combobox";
import DatePicker from "../../components/date-picker/date-picker";

import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";

import JoinClasses from "../../utils/join-classes";

import styles from "./appointments.module.scss";

export const addAppointmentState = atom(false);

export default function Appointments() {
  const [state, setState] = useAtom(addAppointmentState);

  return (
    <section className="h-full">
      <CalendarExtended />

      <Drawer
        open={state}
        onOpenChange={(modalOpened) => {
          if (modalOpened === false) {
            setState(false);
          }
        }}
      >
        <DrawerContent
          overflow={true}
          className={JoinClasses(
            "",
            styles["add-appointments-content-container"]
          )}
        >
          <DrawerBody>
            <Form />
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </section>
  );
}

const schema = object({
  service: object({
    id: number(),
    name: string(),
  }),
  owner: object({
    id: number(),
    name: string(),
  }),
  pet: object({
    id: number(),
    name: string(),
  }),
  // date: object({
  //   start: date(),
  //   end: date(),
  // }),
});

interface IFormAppointment {
  service: {
    id: number;
    name: string;
  };
  owner: {
    id: number;
    name: string;
  };
  pet: {
    id: number;
    name: string;
  };
  // date: {
  //   start: Date;
  //   end: Date;
  // };
}

function Form() {
  const onSubmit: SubmitHandler<IFormAppointment> = (data) => {
    console.log(data);
  };

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormAppointment>({
    resolver: zodResolver(schema),
    defaultValues: {
      service: {},
      owner: {},
      pet: {},
    },
  });

  return (
    <div className={JoinClasses("", styles["form-container"])}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Controller
          name="service"
          control={control}
          render={({ field: { onChange, value } }) => {
            return (
              <ComboBox
                label="Select an appointment type"
                name="owner"
                value={value}
                onChange={onChange}
                placeholder="Search or Select an appointment"
                data={[
                  { id: 1, name: "Durward Reynolds" },
                  { id: 2, name: "Kenton Towne" },
                  { id: 3, name: "Therese Wunsch" },
                  { id: 4, name: "Benedict Kessler" },
                  { id: 5, name: "Katelyn Rohan" },
                ]}
              />
            );
          }}
        />

        <Controller
          name="owner"
          control={control}
          render={({ field: { onChange, value } }) => {
            return (
              <ComboBox
                label="Select an owner"
                name="owner"
                value={value}
                onChange={onChange}
                placeholder="Search or Select an owner"
                data={[
                  { id: 1, name: "Durward Reynolds" },
                  { id: 2, name: "Kenton Towne" },
                  { id: 3, name: "Therese Wunsch" },
                  { id: 4, name: "Benedict Kessler" },
                  { id: 5, name: "Katelyn Rohan" },
                ]}
              />
            );
          }}
        />

        <Controller
          name="pet"
          control={control}
          render={({ field: { onChange, value } }) => {
            return (
              <ComboBox
                label="Select a pet"
                name="pet"
                value={value}
                onChange={onChange}
                placeholder="Search or Select a pet"
                data={[
                  { id: 1, name: "Durward Reynolds" },
                  { id: 2, name: "Kenton Towne" },
                  { id: 3, name: "Therese Wunsch" },
                  { id: 4, name: "Benedict Kessler" },
                  { id: 5, name: "Katelyn Rohan" },
                ]}
              />
            );
          }}
        />

        <div>
          <div>
            <label htmlFor="">Add date and time</label>
          </div>

          <DatePicker />
        </div>

        <div
          className={JoinClasses("flex justify-center", styles["submit-btn"])}
        >
          <button className="blue-btn" type="submit">
            submit
          </button>
        </div>
      </form>
    </div>
  );
}
