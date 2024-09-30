import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { date, object, string } from "zod";

import Input from "../input/input";
import JoinClasses from "../../utils/join-classes";

import styles from "./add-pet.module.scss";
import SubmitBtn from "../submit-btn/submit-btn";

import ComboBox from "../../components/combobox/combobox";

interface IFormInput {
  name: string;
  owner: { id: number; name: string };
  age: number | undefined;
  type: { id: number; name: string };
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

export default function AddPetContent() {
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
      name: "",
      owner: {},
      age: undefined,
      type: {},
      registerDate: new Date(),
    },
  });

  return (
    <div
      className={JoinClasses("w-full h-full", styles["add-owner-container"])}
    >
      <div className="h-full w-full flex flex-col">
        <div className={JoinClasses("w-full", styles.title)}>
          <span className="font-semibold text-black ">Add new Pet</span>
        </div>

        <div className={JoinClasses("", styles["form-container"])}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className={JoinClasses("flex", styles["form-container-row"])}>
              <Controller
                name="name"
                control={control}
                rules={{ required: true }}
                defaultValue=""
                render={({ field, fieldState }) => {
                  return (
                    <Input
                      id="name"
                      label="Pet Name"
                      placeholder="Pet Name"
                      field={field}
                      invalid={fieldState.invalid}
                      error={fieldState?.error?.message}
                    />
                  );
                }}
              />
            </div>

            <div className={JoinClasses("flex", styles["form-container-row"])}>
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

            <div>
              <Controller
                name="age"
                control={control}
                rules={{ required: true }}
                defaultValue={undefined}
                render={({ field, fieldState }) => {
                  return (
                    <Input
                      id="age"
                      label="Age"
                      placeholder="Age"
                      field={field}
                      invalid={fieldState.invalid}
                      error={fieldState?.error?.message}
                    />
                  );
                }}
              />
            </div>

            <div className={JoinClasses("flex", styles["form-container-row"])}>
              <Controller
                name="type"
                control={control}
                render={({ field: { onChange, value } }) => {
                  return (
                    <ComboBox
                      name="type"
                      value={value}
                      onChange={onChange}
                      placeholder="Search or Select a type"
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

            <div>
              <SubmitBtn text="Add Owner" classes="" />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
