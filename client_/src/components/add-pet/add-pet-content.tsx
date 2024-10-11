import { startTransition, useEffect, useMemo, useState } from "react";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { DevTool } from "@hookform/devtools";
import { zodResolver } from "@hookform/resolvers/zod";
import { date, number, object, string } from "zod";

import JoinClasses from "../../utils/join-classes";
import Input from "../input/input";
import SubmitBtn from "../submit-btn/submit-btn";
import PetOwnerTable from "./pet-owner-table";
import ComboBox from "../../components/combobox/combobox";
import Modal from "../modal/modal";

import styles from "./add-pet.module.scss";

import MockDataPerson from "../../assets/mock_data-person.json";

interface IFormInput {
  // name: string;
  owner: { id: number; name: string };
  // age: number | undefined | string;
  // type: { id: number; name: string };
  // registerDate: Date;
}

const schema = object({
  // name: string(),
  owner: object({
    id: number(),
    name: string(),
  }),
  // age: number().or(string()),
  // type: object({
  //   id: number(),
  //   name: string(),
  // }),
  // registerDate: date(),
});

import { Person } from "../../models/person.interface";

const defaultData: Person[] = MockDataPerson;

export default function AddPetContent() {
  const [open, setOpen] = useState(false);

  const onSubmit: SubmitHandler<IFormInput> = (data) => {
    console.log(data);
  };

  const {
    control,
    handleSubmit,
    register,
    setValue,
    formState,
    watch,
    getValues,
  } = useForm<IFormInput>({
    resolver: zodResolver(schema),
    defaultValues: {
      // name: "",
      owner: {},
      // age: undefined,
      // type: {},
      // registerDate: new Date(),
    },
  });

  console.log(formState);

  // console.log(watch());

  useEffect(() => {
    setValue(
      "owner",
      { name: "test", id: 1 },
      { shouldDirty: true, shouldTouch: true, shouldValidate: true }
    );
  }, []);

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
              {/* <Controller
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
              /> */}
            </div>

            <div className={JoinClasses("flex", styles["form-container-row"])}>
              {/* <Controller
                name="owner"
                control={control}
                render={({ field }) => {
                  return (
                    <ComboBox
                      field={field}
                      control={control}
                      // ref={field.ref}
                      name="owner"
                      // value={value}
                      // onChange={onChange}
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
              /> */}
              <button type="button" onClick={() => setOpen(true)}>
                Select an owner
              </button>
            </div>

            <DevTool control={control} />

            <div>
              {/* <Controller
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
              /> */}
            </div>

            <div className={JoinClasses("flex", styles["form-container-row"])}>
              {/* <Controller
                name="type"
                control={control}
                render={({ field: { onChange, value } }) => {
                  console.log(value, "CB VALUE");

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
              /> */}
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
              <PetOwnerTable
                setValue={setValue}
                setOpen={setOpen}
                register={register}
                data={defaultData}
                pagesSize={25}
              />
            </Modal>
          </form>
        </div>
      </div>
    </div>
  );
}
