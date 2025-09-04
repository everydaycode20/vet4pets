import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { atom, useAtom } from "jotai";

import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { object, string, number, date } from "zod";

import {
  Drawer,
  DrawerBody,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
} from "../../components/drawer/drawer";

import CalendarExtended from "../../components/calendar/calendar";
import ComboBox from "../../components/combobox/combobox";
import DatePicker from "../../components/date-picker/date-picker";

import JoinClasses from "../../utils/join-classes";

import styles from "./appointments.module.scss";

import { addAppointmentState, options } from "./appointment-state";
import {
  QueryObserverResult,
  RefetchOptions,
  useQuery,
} from "@tanstack/react-query";
import { apiUrl } from "../../constants/apiUrl";
import { IAppointmentsType } from "../../models/appointments.interface";
import OwnerModal from "./owner-modal";

export default function Appointments() {
  const [state, setState] = useAtom(addAppointmentState);

  const [owner, setOwner] = useState<{ id?: number; name?: string }>({});

  const [_, setCalendarOptions] = useAtom(options);

  const dataAppTypes = useQuery({
    queryKey: ["appointment-types"],
    queryFn: async (): Promise<IAppointmentsType[]> => {
      const res = await fetch(`${apiUrl}/appointmentType`, {
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        method: "GET",
      });

      return await res.json();
    },
  });

  const dataOwnerPets = useQuery({
    queryKey: ["owner-pets", owner.id !== undefined],
    queryFn: async (): Promise<IAppointmentsType[]> => {
      const res = await fetch(`${apiUrl}/pets/owner?ownerId=${owner.id}`, {
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        method: "GET",
      });

      return await res.json();
    },
    enabled: false,
  });

  useEffect(() => {
    if (owner.id && owner.name) {
      dataOwnerPets.refetch();
    }
  }, [owner]);

  return (
    <section className="h-full">
      <CalendarExtended />

      <Drawer
        open={state}
        onOpenChange={(modalOpened) => {
          if (modalOpened === false) {
            setCalendarOptions({});
          }

          setState(modalOpened);
        }}
      >
        <DrawerContent
          overflow={true}
          className={JoinClasses(
            "",
            styles["add-appointments-content-container"]
          )}
        >
          <DrawerHeader />

          <DrawerBody>
            <Form appointmentType={dataAppTypes.data} setOwner={setOwner} />
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
  date: object({
    start: date().refine((val) => val instanceof Date && !isNaN(val.getTime())),
    end: date().refine((val) => val instanceof Date && !isNaN(val.getTime())),
    selectedDate: date().refine(
      (val) => val instanceof Date && !isNaN(val.getTime())
    ),
  }),
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
  date: {
    start: Date;
    end: Date;
    selectedDate: Date;
  };
}

function Form({
  appointmentType,
  setOwner,
}: {
  appointmentType?: IAppointmentsType[];
  setOwner: Dispatch<
    SetStateAction<{
      id?: number;
      name?: string;
    }>
  >;
}) {
  const [_, setState] = useAtom(addAppointmentState);

  const onSubmit: SubmitHandler<IFormAppointment> = (data) => {
    console.log(data);

    setTimeout(() => {
      setState(false);
    }, 1000);
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

  console.log(errors, ">///////////////////////////////////////");

  return (
    <div className={JoinClasses("", styles["form-container"])}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Controller
          name="service"
          control={control}
          render={({ field: { onChange, value, onBlur } }) => {
            return (
              <ComboBox
                label="Select an appointment type"
                name="service"
                value={value}
                onChange={onChange}
                onBlur={onBlur}
                error={errors.service && "select a service"}
                placeholder="Search or Select an appointment"
                data={appointmentType}
              />
            );
          }}
        />

        <div className="flex flex-col">
          <Controller
            name="owner"
            control={control}
            render={({ field: { onChange, value } }) => {
              if (value.id && value.name) {
                setOwner(value);
              }

              return (
                <OwnerModal
                  onChange={onChange}
                  value={value}
                  button={
                    <button
                      type="button"
                      className={JoinClasses(
                        "",
                        styles["select-owner-btn"],
                        errors.owner && styles["select-owner-btn-error"]
                      )}
                    >
                      {value.id ? `Change ${value.name}` : "Select an owner "}

                      <span className="sr-only">opens a dialog</span>
                    </button>
                  }
                />
              );
            }}
          />

          {errors.owner && (
            <span className="text-pink block">select an owner</span>
          )}
        </div>

        <Controller
          name="pet"
          control={control}
          render={({ field: { onChange, value, onBlur } }) => {
            return (
              <ComboBox
                label="Select a pet"
                name="pet"
                value={value}
                onChange={onChange}
                onBlur={onBlur}
                error={errors.pet && "select a pet"}
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

          <Controller
            name="date"
            control={control}
            render={({ field: { onChange, value } }) => {
              return (
                <DatePicker
                  onChange={onChange}
                  value={value}
                  error={errors.date}
                />
              );
            }}
          />
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
