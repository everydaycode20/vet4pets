import { useState } from "react";
import { Select } from "@mui/base/Select";
import { Option } from "@mui/base/Option";

import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { object, string, number, date } from "zod";

import Modal from "../../components/modal/modal";
import CalendarExtended from "../calendar/calendar";

import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";

import JoinClasses from "../../utils/join-classes";

import styles from "./appointments.module.scss";

export default function Appointments() {
  const [open, setOpen] = useState(true);

  return (
    <section className="h-full">
      <CalendarExtended />

      <Modal open={open} setOpen={setOpen}>
        <div className={JoinClasses("", styles.close)}>
          <button type="button" onClick={() => setOpen(false)}>
            <span className="sr-only">close</span>

            <CloseOutlinedIcon htmlColor="#778CA2" />
          </button>
        </div>

        <div>
          <Form />
        </div>
      </Modal>
    </section>
  );
}

const schema = object({
  service: string().min(1),
  // owner: number().min(1),
  // date: object({
  //   start: date(),
  //   end: date(),
  // }),
});

interface IFormAppointment {
  service: string;
  // owner: number;
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
    register,
    formState: { errors },
  } = useForm<IFormAppointment>({
    resolver: zodResolver(schema),
    defaultValues: {
      service: "",
    },
  });

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Controller
          rules={{ required: true }}
          render={({
            field: { onChange, ref, onBlur, value, name, ...rest },
          }) => {
            console.log(rest);

            return (
              <Select
                id="service"
                name={name}
                placeholder="test placeholder"
                onChange={(e, v) => {
                  console.log(v);

                  onChange(v);
                }}
                value={value || ""}
                ref={ref}
                onBlur={onBlur}
              >
                <Option value={"10"}>Ten</Option>

                <Option value={"20"}>Twenty</Option>
              </Select>
            );
          }}
          control={control}
          name="service"
          defaultValue=""
        />

        <button type="submit">submit</button>
      </form>
    </div>
  );
}

function BaseSelect({ id, field }: any) {
  return (
    <div>
      <Select placeholder="test select" {...field}>
        <Option value={"10"}>Ten</Option>
        <Option value={"20"}>Twenty</Option>
        <Option value={"30"}>Thirty</Option>
      </Select>
    </div>
  );
}
