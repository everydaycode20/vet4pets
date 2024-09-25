import { atom, useAtom } from "jotai";

import {
  Drawer,
  DrawerBody,
  DrawerContent,
} from "../drawer/drawer";

import AddOwnerContent from "./add-pet-content";

import JoinClasses from "../../utils/join-classes";

import styles from "./add-pet.module.scss";

export const addPetState = atom(false);

export default function AddPet() {
  const [state, setState] = useAtom(addPetState);

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
              <AddOwnerContent />
            </DrawerBody>
          </DrawerContent>
        </Drawer>
      </div>
    </>
  );
}
