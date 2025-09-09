import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useAtom } from "jotai";

import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { object, string, number, date } from "zod";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";

dayjs.extend(utc);

import {
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
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
  useMutation,
  useQuery,
} from "@tanstack/react-query";
import { apiUrl } from "../../constants/apiUrl";
import {
  IAppointments,
  IAppointmentsType,
} from "../../models/appointments.interface";
import OwnerModal from "./owner-modal";
import { IPet } from "../../models/pet.interface";
import GetAppointments from "../../components/calendar/appointments-fetch";
import IFormAppointment from "../../models/form-appointment.interface";
import MakeJsonPatchRequest from "../../utils/json-patch-req";

export default function Appointments() {
  const [state, setState] = useAtom(addAppointmentState);

  const [_, setCalendarOptions] = useAtom(options);

  const [calendarDate, setCalendarDate] = useState({
    start: dayjs().startOf("month"),
    end: dayjs().endOf("month"),
  });

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

  const data = useQuery({
    queryKey: ["calendar", calendarDate],
    queryFn: (): Promise<IAppointments[]> =>
      GetAppointments(
        calendarDate.start.format("YYYY-MM-DD"),
        calendarDate.end.format("YYYY-MM-DD")
      ),
  });

  return (
    <section className="h-full">
      <CalendarExtended
        calendarDate={calendarDate}
        setCalendarDate={setCalendarDate}
        data={data.data}
      />

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

          <DrawerTitle className="sr-only">add appointment</DrawerTitle>

          <DrawerDescription className="sr-only">
            add a new appointment by selecting type, owner, pet and date
          </DrawerDescription>

          <DrawerBody>
            <Form appointmentType={dataAppTypes.data} refetch={data.refetch} />
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </section>
  );
}

const schema = object({
  type: object({
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

function Form({
  appointmentType,
  refetch,
}: {
  appointmentType?: IAppointmentsType[];
  refetch: (
    options?: RefetchOptions | undefined
  ) => Promise<QueryObserverResult<IAppointments[], Error>>;
}) {
  const [_, setState] = useAtom(addAppointmentState);

  const [calendarOptions, setCalendarOptions] = useAtom(options);

  const [owner, setOwner] = useState<{ id?: number; name?: string }>({});

  const addAppointment = useMutation({
    mutationFn: async (data: IFormAppointment) => {
      const res = await fetch(`${apiUrl}/appointments`, {
        body: JSON.stringify({
          date: dayjs(data.date.start).format("YYYY-MM-DD HH:mm"),
          endDate: dayjs(data.date.end).format("YYYY-MM-DD HH:mm"),
          ownerId: data.owner.id,
          petId: data.pet.id,
          typeId: data.type.id,
        }),
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      return res.json();
    },
    onSuccess: () => {
      refetch().then(() => {
        setCalendarOptions({
          color: undefined,
          day: undefined,
          end: undefined,
          mode: undefined,
          start: undefined,
        });

        setState(false);
      });
    },
    onError: (error) => {
      console.log(error);
    },
  });

  const dataOwnerPets = useQuery({
    queryKey: ["owner-pets", owner.id !== undefined],
    queryFn: async (): Promise<{ pets: IPet[] }> => {
      const res = await fetch(`${apiUrl}/pets/owner?ownerId=${owner.id}`, {
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        method: "GET",
      });

      return await res.json();
    },
    enabled: owner.id !== undefined,
  });

  const onSubmit: SubmitHandler<IFormAppointment> = (data) => {
    if (calendarOptions.edit) {
      updateAppointmentById.mutate(data);
    } else {
      addAppointment.mutate(data);
    }
  };

  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<IFormAppointment>({
    resolver: zodResolver(schema),
    defaultValues: {
      type: {},
      owner: {},
      pet: {},
    },
  });

  const updateAppointmentById = useMutation({
    mutationFn: async (data: IFormAppointment) => {
      const res = await fetch(
        `${apiUrl}/appointments/${calendarOptions.appointment?.id}`,
        {
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          method: "PATCH",
          body: JSON.stringify(MakeJsonPatchRequest(data)),
        }
      );

      return await res.json();
    },
    onSuccess: () => {
      refetch();

      setState(false);
    },
    onError: (e) => {
      console.log("error", e);
    },
  });

  useEffect(() => {
    if (calendarOptions.edit) {
      setValue("pet.name", calendarOptions.appointment!.pet.name);
      setValue("pet.id", calendarOptions.appointment!.pet.id);
      setValue("owner.id", calendarOptions.appointment!.owner.id);
      setValue("owner.name", calendarOptions.appointment!.owner.name);
      setValue("type.id", calendarOptions.appointment!.type.id);
      setValue("type.name", calendarOptions.appointment!.type.name);
      setValue("date.start", dayjs(calendarOptions.start!).toDate());
      setValue("date.end", dayjs(calendarOptions.end!).toDate());
      setValue("date.selectedDate", dayjs(calendarOptions.day!).toDate());

      setOwner({
        id: calendarOptions.appointment?.owner.id,
        name: calendarOptions.appointment?.owner.name,
      });
    }
  }, [calendarOptions.edit]);

  return (
    <div className={JoinClasses("", styles["form-container"])}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Controller
          name="type"
          control={control}
          render={({ field: { onChange, value, onBlur } }) => {
            return (
              <ComboBox
                label="Select an appointment type"
                name="type"
                value={value}
                onChange={onChange}
                onBlur={onBlur}
                error={errors.type && "select a service"}
                placeholder="Search or Select an appointment"
                data={appointmentType}
                edit={calendarOptions.edit}
              />
            );
          }}
        />

        <div className="flex flex-col">
          <Controller
            name="owner"
            control={control}
            render={({ field: { onChange, value } }) => {
              if (value.id && value.name && calendarOptions.edit) {
                setTimeout(() => {
                  setOwner(value); //TODO: fix
                });
              }

              return (
                <OwnerModal
                  onChange={(e) => {
                    if (e.id && e.name) {
                      setOwner({ id: e.id, name: e.name });
                    }

                    onChange(e);
                  }}
                  value={value}
                  button={
                    <button
                      disabled={calendarOptions.edit}
                      type="button"
                      className={JoinClasses(
                        "",
                        styles["select-owner-btn"],
                        errors.owner && styles["select-owner-btn-error"],
                        calendarOptions.edit && "cursor-not-allowed"
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
                data={dataOwnerPets.data && dataOwnerPets.data.pets}
                edit={calendarOptions.edit}
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
