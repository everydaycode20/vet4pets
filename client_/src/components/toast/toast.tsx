import { Dispatch, SetStateAction } from "react";
import {
  Provider,
  Root,
  Title,
  Description,
  Close,
  Viewport,
} from "@radix-ui/react-toast";

import CloseIcon from "@mui/icons-material/Close";

import styles from "./toast.module.scss";
import JoinClasses from "../../utils/join-classes";

interface IToast {
  type: "success" | "warning" | "error";
  description: string;
  title: string;
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}

export default function Toast({
  description,
  title,
  type,
  open,
  setOpen,
}: IToast) {
  return (
    <Provider swipeDirection="right" duration={10_000}>
      <Root
        className={JoinClasses("", styles.Root, styles[type])}
        open={open}
        onOpenChange={setOpen}
      >
        <Close asChild className={styles.close}>
          <button aria-label="close">
            <CloseIcon htmlColor="#6b7280" />
          </button>
        </Close>

        <Title className={styles.Title}>
          <p>{title}</p>
        </Title>

        <Description asChild className={styles.Description}>
          <p>{description}</p>
        </Description>
      </Root>

      <Viewport className={styles.Viewport} />
    </Provider>
  );
}
