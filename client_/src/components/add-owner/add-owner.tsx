import { atom, useAtom } from "jotai";

import {
  Drawer,
  DrawerBody,
  DrawerClose,
  DrawerContent,
} from "../../components/drawer/drawer";

import AddOwnerContent from "./add-owner-content";

import JoinClasses from "../../utils/join-classes";

import styles from "./add-owner.module.scss";

export const addOwnerState = atom(false);

export default function AddOwner() {
  const [state, setState] = useAtom(addOwnerState);

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
          <DrawerClose />
          
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
