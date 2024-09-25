import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { date, object, string } from "zod";

import Input from "../input/input";
import JoinClasses from "../../utils/join-classes";

import styles from "./add-pet.module.scss";
import SubmitBtn from "../submit-btn/submit-btn";

interface IFormInput {
  firstName: string;
  lastName: string;
  phone: string;
  address: string;
  registerDate: Date;
}

const schema = object({
  firstName: string().min(1, { message: "Enter a name" }),
  lastName: string().min(1, { message: "Enter a last name" }),
  phone: string()
    .min(1, { message: "Enter a phone" })
    .regex(/^\d+$/, { message: "Invalid phone. Numbers only" }),
  address: string().min(1, { message: "Enter an address" }),
  registerDate: date(),
});

export default function AddOwnerContent() {
  const onSubmit: SubmitHandler<IFormInput> = (data) => {
    console.log(data);
  };

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>({
    resolver: zodResolver(schema),
    defaultValues: {
      firstName: "",
      lastName: "",
      phone: "",
      address: "",
      registerDate: new Date(),
    },
  });

  return (
    <div
      className={JoinClasses("w-full h-full", styles["add-owner-container"])}
    >
      <div className="h-full w-full flex flex-col">
        <div className={JoinClasses("w-full", styles.title)}>
          <span className="font-semibold text-black ">Add new Owner</span>
        </div>

        <div className={JoinClasses("", styles["form-container"])}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className={JoinClasses("flex", styles["form-container-row"])}>
              <Controller
                name="firstName"
                control={control}
                rules={{ required: true }}
                defaultValue=""
                render={({ field, fieldState }) => {
                  return (
                    <Input
                      id="firstName"
                      label="First Name"
                      placeholder="Owner Name"
                      field={field}
                      invalid={fieldState.invalid}
                      error={fieldState?.error?.message}
                    />
                  );
                }}
              />

              <Controller
                name="lastName"
                control={control}
                rules={{ required: true }}
                defaultValue=""
                render={({ field, fieldState }) => {
                  return (
                    <Input
                      id="lastName"
                      label="Last Name"
                      placeholder="Owner Last Name"
                      field={field}
                      invalid={fieldState.invalid}
                      error={fieldState?.error?.message}
                    />
                  );
                }}
              />
            </div>

            <div>
              <Controller
                name="phone"
                control={control}
                rules={{ required: true }}
                defaultValue=""
                render={({ field, fieldState }) => {
                  return (
                    <Input
                      id="phone"
                      label="Phone"
                      placeholder="Phone"
                      field={field}
                      invalid={fieldState.invalid}
                      error={fieldState?.error?.message}
                    />
                  );
                }}
              />
            </div>

            <div>
              <Controller
                name="address"
                control={control}
                rules={{ required: true }}
                defaultValue=""
                render={({ field, fieldState }) => {
                  return (
                    <Input
                      id="address"
                      label="Address"
                      placeholder="Address  "
                      field={field}
                      invalid={fieldState.invalid}
                      error={fieldState?.error?.message}
                    />
                  );
                }}
              />
            </div>

            <div>
              <SubmitBtn text="Add Owner" classes="" />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
