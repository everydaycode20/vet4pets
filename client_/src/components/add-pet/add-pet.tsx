import { atom, useAtom } from "jotai";

import { Drawer, DrawerBody, DrawerContent } from "../drawer/drawer";

import AddPetContent from "./add-pet-content";

import JoinClasses from "../../utils/join-classes";

import styles from "./add-pet.module.scss";

import { useForm, Controller, SubmitHandler } from "react-hook-form";

import ComboBox from "../../components/combobox/combobox";
import { date, object, string } from "zod";

import { zodResolver } from "@hookform/resolvers/zod";
import Example from "../combobox/combobox";

export const addPetState = atom(false);
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

export default function AddPet() {
  const [state, setState] = useAtom(addPetState);

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
    <>
      <div>
        <Drawer
          open={state}
          onOpenChange={(modalOpened) => {
            if (modalOpened === false) {
              setState(false);
            }
          }}
        >
          <DrawerContent
            className={JoinClasses("", styles["add-owner-content-container"])}
          >
            <DrawerBody>
              {/* <Controller
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
              /> */}

              <Example
                placeholder="Owner"
                label="Select an owner"
                data={[
                  { id: 1, name: "Durward Reynolds" },
                  { id: 2, name: "Kenton Towne" },
                  { id: 3, name: "Therese Wunsch" },
                  { id: 4, name: "Benedict Kessler" },
                  { id: 5, name: "Katelyn Rohan" },
                ]}
              />

              {/* <AddPetContent /> */}
            </DrawerBody>
          </DrawerContent>
        </Drawer>
      </div>
    </>
  );
}
