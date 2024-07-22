// import React from "react";

import { atom, useAtom } from "jotai";

import {
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
} from "../../components/drawer/drawer";
import { SidebarContent } from "./sidebar";

import JoinClasses from "../../utils/join-classes";

import styles from "./mobile-sidebar.module.scss";

type StateType = [boolean, () => void, () => void, () => void] & {
  state: boolean;
  open: () => void;
  close: () => void;
  toggle: () => void;
};

export const mobileSidebarState = atom(false);

const useToggleState = () => {
  const [state, setState] = useAtom(mobileSidebarState);

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

export default function MobileSidebar() {
  const [editOpen, showEdit, closeEdit] = useToggleState();

  return (
    <>
      <div className="flex justify-center lg:hidden">
        <Drawer
          open={editOpen}
          onOpenChange={(modalOpened) => {
            if (!modalOpened) {
              closeEdit();
            }
          }}
        >
          <DrawerContent
            className={JoinClasses(
              "",
              styles["drawer-content-container"]
            )}
          >
            <DrawerHeader>
              <DrawerTitle className="justify-end"></DrawerTitle>

              <DrawerDescription className="mt-1 text-sm"></DrawerDescription>
            </DrawerHeader>

            <DrawerBody>
              <SidebarContent />
            </DrawerBody>
          </DrawerContent>
        </Drawer>
      </div>
    </>
  );
}
