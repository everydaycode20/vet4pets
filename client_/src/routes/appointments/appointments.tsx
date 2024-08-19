import { useState } from "react";

import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { object, string, number, date } from "zod";

import Modal from "../../components/modal/modal";
import CalendarExtended from "../../components/calendar/calendar";
import Select from "../../components/select/select";
import ComboBox from "../../components/combobox/combobox";

import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";

import JoinClasses from "../../utils/join-classes";

import styles from "./appointments.module.scss";

export default function Appointments() {
  const [open, setOpen] = useState(true);

  return (
    <section className="h-full">
      <CalendarExtended />

      <Modal open={open} setOpen={setOpen}>
        <div className={JoinClasses("bg-white", styles.container)}>
          <div
            className={JoinClasses(
              "flex items-center justify-between",
              styles.close
            )}
          >
            <h2 className="font-medium text-light-gray-4">
              Add a new appointment
            </h2>

            <button type="button" onClick={() => setOpen(false)}>
              <span className="sr-only">close</span>

              <CloseOutlinedIcon htmlColor="#778CA2" />
            </button>
          </div>

          <div>
            <Form />
          </div>
        </div>
      </Modal>
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
    },
  });

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={JoinClasses("flex justify-between")}>
          <Controller
            name="service"
            control={control}
            render={({ field: { onChange, value } }) => {
              return (
                <Select
                  data={[
                    { id: 1, name: "item 1" },
                    { id: 2, name: "item 2" },
                  ]}
                  value={value}
                  onChange={onChange}
                  placeholder="Add a service"
                  name="service"
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
        </div>

        <button type="submit">submit</button>
      </form>
    </div>
  );
}
