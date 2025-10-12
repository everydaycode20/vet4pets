import { useState } from "react";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { number, object, string } from "zod";

import JoinClasses from "../../utils/join-classes";
import Input from "../input/input";
import SubmitBtn from "../submit-btn/submit-btn";
import PetOwnerTable from "./pet-owner-table";
import ComboBox from "../../components/combobox/combobox";
import Modal from "../modal/modal";

import styles from "./add-pet.module.scss";

export interface IFormInput {
  name: string;
  owner: number;
  age: string | null | number | undefined;
  type: number;
  // registerDate: Date;
}

export const schema = object({
  name: string().min(1, { message: "Enter a name" }),
  owner: number().positive({ message: "Must select an owner" }),
  age: number({ message: "Enter an age" }).positive({
    message: "Enter an age",
  }),
  type: number().positive({ message: "Select a type" }),
});

const defaultData: any = [];

export default function AddPetContent() {
  const [open, setOpen] = useState(false);

  const onSubmit: SubmitHandler<IFormInput> = (data) => {
    console.log(data);
  };

  const {
    control,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm<IFormInput>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: "",
      owner: -1,
      age: 0,
      type: -1,
    },
  });

  console.log(errors);

  return (
    <div
      className={JoinClasses("w-full h-full", styles["add-owner-container"])}
    >
      <div className="h-full w-full flex flex-col">
        <div className={JoinClasses("w-full", styles.title)}>
          <span className="font-semibold text-black dark:text-dark-text">
            Add new Pet
          </span>
        </div>

        <div className={JoinClasses("", styles["form-container"])}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className={JoinClasses("flex", styles["form-container-row"])}>
              <Controller
                name="name"
                control={control}
                rules={{ required: true }}
                defaultValue={undefined}
                render={({ field, fieldState }) => {
                  return (
                    <Input
                      id="name"
                      label="Pet name"
                      placeholder="Pet name"
                      field={field}
                      invalid={fieldState.invalid}
                      error={fieldState?.error?.message}
                    />
                  );
                }}
              />

              <div className="w-full relative">
                <span
                  className="block mb-[12px] text-[12px] text-black cursor-default"
                  onClick={() => {
                    document.getElementById("select-owner-btn")?.focus();
                  }}
                >
                  Select an owner
                </span>

                <button
                  id="select-owner-btn"
                  type="button"
                  className={JoinClasses(
                    "default-button text-[14px]",
                    open ? "default-button-open" : "",
                    styles["select-owner-btn"]
                  )}
                  onClick={() => {
                    setOpen(true);

                    document.getElementById("select-owner-btn")?.blur();
                  }}
                >
                  {getValues().owner >= 0
                    ? `${defaultData[getValues().owner].firstName} ${
                        defaultData[getValues().owner].lastName
                      }`
                    : "Select an owner"}

                  {getValues().owner >= 0 && (
                    <span className="sr-only">selected</span>
                  )}
                </button>

                {errors.owner && (
                  <span className="text-pink mt-[5px] block">
                    {errors.owner.message}
                  </span>
                )}
              </div>
            </div>

            {/* <DevTool control={control} />  */}

            <div className={JoinClasses("flex", styles["form-container-row"])}>
              <Controller
                name="age"
                control={control}
                render={({ field, fieldState }) => {
                  return (
                    <Input
                      type="number"
                      id="age"
                      label="Age"
                      placeholder="Type an age"
                      field={field}
                      invalid={fieldState.invalid}
                      error={fieldState?.error?.message}
                    />
                  );
                }}
              />

              <Controller
                name="type"
                control={control}
                render={({ fieldState }) => {
                  return (
                    <ComboBox
                      label="Select a type"
                      name="type"
                      placeholder="Search or Select a type"
                      error={fieldState?.error?.message}
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

            <Modal
              open={open}
              setOpen={setOpen}
              backdrop={false}
              disablePortal={true}
              classes={styles["modal-container"]}
            >
              <Controller
                name="owner"
                control={control}
                render={({ field }) => {
                  return (
                    <PetOwnerTable
                      onChange={field.onChange}
                      setOpen={setOpen}
                      data={defaultData}
                      pagesSize={25}
                    />
                  );
                }}
              />
            </Modal>
          </form>
        </div>
      </div>
    </div>
  );
}
