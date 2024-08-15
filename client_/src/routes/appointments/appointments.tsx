import { forwardRef, useState } from "react";
import { Select, SelectProps, SelectRootSlotProps } from "@mui/base/Select";
import { Option } from "@mui/base/Option";
import { styled } from "@mui/system";

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
  service: string(),
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
          name="service"
          control={control}
          // rules={{ required: true }}
          render={({ field: { onChange, ...rest } }) => {
            

            return (
              <BaseSelect
                {...rest}
                onChange={onChange}
                // value={value}
                placeholder="text select"
                onListboxOpenChange={(e) => {
                  console.log(e);
                }}
              >
                <BaseOption value={10}>Ten</BaseOption>
                <BaseOption value={20}>Twenty</BaseOption>
                <BaseOption value={30}>Thirty</BaseOption>
              </BaseSelect>
            );
          }}
        />

        <button type="submit">submit</button>
      </form>
    </div>
  );
}

const BaseSelect = forwardRef(function CustomSelect<
  TValue extends {},
  Multiple extends boolean
>(
  props: SelectProps<TValue, Multiple>,
  ref: React.ForwardedRef<HTMLButtonElement>
) {
  const slots: SelectProps<TValue, Multiple>["slots"] = {
    root: Button,
    listbox: Listbox,
    popup: Popup,
    ...props.slots,
  };

  // console.log(ref);

  return <Select {...props} ref={ref} slots={slots} />;
}) as <TValue extends {}, Multiple extends boolean>(
  props: SelectProps<TValue, Multiple> & React.RefAttributes<HTMLButtonElement>
) => JSX.Element;

const Button = forwardRef(function Button<
  TValue extends {},
  Multiple extends boolean
>(
  props: SelectRootSlotProps<TValue, Multiple>,
  ref: React.ForwardedRef<HTMLButtonElement>
) {
  const { ownerState, ...other } = props;
  // console.log(props);

  return (
    <button type="button" {...other} ref={ref}>
      {other.children}
    </button>
  );
});

const Popup = styled("div")`
  z-index: 1600;
`;

const Listbox = styled("ul")(
  ({ theme }) => `
  font-family: 'IBM Plex Sans', sans-serif;
  font-size: 0.875rem;
  box-sizing: border-box;
  padding: 6px;
  margin: 12px 0;
  min-width: 320px;
  border-radius: 12px;
  overflow: auto;
  outline: 0px;
  background: ${theme.palette.mode === "dark" ? "black" : "#fff"};
  border: 1px solid ${theme.palette.mode === "dark" ? "black" : "grey"};
  color: ${theme.palette.mode === "dark" ? "black" : "grey"};
  box-shadow: 0px 2px 6px ${
    theme.palette.mode === "dark" ? "rgba(0,0,0, 0.50)" : "rgba(0,0,0, 0.05)"
  };
  `
);

const BaseOption = styled(Option)(
  ({ theme }) => `
  list-style: none;
  padding: 8px;
  border-radius: 8px;
  cursor: default;

  &:last-of-type {
    border-bottom: none;
  }
  `
);
