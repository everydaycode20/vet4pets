import { atom, useAtom } from "jotai";

import {
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
} from "../../components/drawer/drawer";

import AddOwnerContent from "./add-owner-content";

import JoinClasses from "../../utils/join-classes";

import styles from "./add-owner.module.scss";

type StateType = [boolean, () => void, () => void, () => void] & {
  state: boolean;
  open: () => void;
  close: () => void;
  toggle: () => void;
};

export const addOwnerState = atom(false);

const useToggleState = () => {
  const [state, setState] = useAtom(addOwnerState);

  const close = () => {
    setState(false);
  };

  const open = () => {
    setState(true);
  };

  const toggle = () => {
    setState((state) => !state);
  };

  const hookData = [state, open, close, toggle] as StateType;
  hookData.state = state;
  hookData.open = open;
  hookData.close = close;
  hookData.toggle = toggle;
  return hookData;
};

export default function AddOwner() {
  const [editOpen, closeEdit] = useToggleState();

  return (
    <>
      <div>
        <Drawer
          open={true}
          onOpenChange={(modalOpened) => {
            if (!modalOpened) {
              closeEdit();
            }
          }}
        >
          <DrawerContent
            className={JoinClasses("", styles["add-owner-content-container"])}
          >
            <DrawerHeader>
              <DrawerTitle className="justify-end"></DrawerTitle>

              <DrawerDescription className="mt-1 text-sm"></DrawerDescription>
            </DrawerHeader>

            <DrawerBody>
              <AddOwnerContent />
            </DrawerBody>
          </DrawerContent>
        </Drawer>
      </div>
    </>
  );
}
