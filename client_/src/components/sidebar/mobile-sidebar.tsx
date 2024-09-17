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

export const mobileSidebarState = atom(false);

export default function MobileSidebar() {
  const [state, setState] = useAtom(mobileSidebarState);

  return (
    <>
      <div className="flex justify-center lg:hidden">
        <Drawer
          open={state}
          onOpenChange={(modalOpened) => {
            if (modalOpened === false) {
              setState(false);
            }
          }}
        >
          <DrawerContent
            className={JoinClasses("", styles["drawer-content-container"])}
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
