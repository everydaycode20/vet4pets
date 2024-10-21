import { Dispatch, forwardRef, SetStateAction } from "react";
import { Modal as MuiModal } from "@mui/base/Modal";
import { prepareForSlot } from "@mui/base/utils";

import styles from "./modal.module.scss";
import JoinClasses from "../../utils/join-classes";

const Backdrop = forwardRef<
  HTMLDivElement,
  { open?: boolean; className: string }
>((props, ref) => {
  const { open, className, ...other } = props;

  return (
    <div
      className={JoinClasses(open ? "base-Backdrop-open" : "", styles.backdrop)}
      ref={ref}
      {...other}
    />
  );
});

const BackdropSlot = prepareForSlot(Backdrop);

export default function Modal({
  children,
  open,
  setOpen,
  backdrop = true,
  disablePortal = false,
  classes = "",
}: {
  children?: JSX.Element | JSX.Element[];
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  backdrop?: boolean;
  disablePortal?: boolean;
  classes: any;
}) {
  const handleClose = () => setOpen(false);

  return (
    <MuiModal
      disablePortal={disablePortal}
      className={JoinClasses("", styles.modal + " " + classes)}
      // aria-labelledby="unstyled-modal-title"
      // aria-describedby="unstyled-modal-description"
      open={open}
      onClose={handleClose}
      slots={{
        backdrop: backdrop ? BackdropSlot : undefined,
      }}
    >
      <>{children ? children : <></>}</>
    </MuiModal>
  );
}
