import { atom, useAtom } from "jotai";

import { Drawer, DrawerBody, DrawerContent } from "../drawer/drawer";

import AddPetContent from "./add-pet-content";

import JoinClasses from "../../utils/join-classes";

import styles from "./add-pet.module.scss";

import { useForm } from "react-hook-form";

import { date, number, object, string } from "zod";

import { zodResolver } from "@hookform/resolvers/zod";

export const addPetState = atom(false);
interface IFormInput {
  name: string;
  owner: { id: number; name: string };
  age: number | undefined;
  type: { id: number; name: string };
  registerDate: Date;
}

const schema = object({
  name: string(),
  owner: object({
    id: number(),
    name: string(),
  }),
  age: number(),
  type: object({
    id: number(),
    name: string(),
  }),
  registerDate: date(),
});

export default function AddPet() {
  const [state, setState] = useAtom(addPetState);

  const {} = useForm<IFormInput>({
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

              {/* <Example
                placeholder="Owner"
                label="Select an owner"
                data={[
                  { id: 1, name: "Durward Reynolds" },
                  { id: 2, name: "Kenton Towne" },
                  { id: 3, name: "Therese Wunsch" },
                  { id: 4, name: "Benedict Kessler" },
                  { id: 5, name: "Katelyn Rohan" },
                ]}
              /> */}

              <AddPetContent />
            </DrawerBody>
          </DrawerContent>
        </Drawer>
      </div>
    </>
  );
}
