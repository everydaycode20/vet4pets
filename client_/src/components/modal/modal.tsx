import { forwardRef, ReactNode, useState } from "react";
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

export default function Modal({ children }: { children?: ReactNode }) {
  const [open, setOpen] = useState(true);

  const handleClose = () => setOpen(false);

  return (
    <MuiModal
      className={JoinClasses("", styles.modal)}
      // aria-labelledby="unstyled-modal-title"
      // aria-describedby="unstyled-modal-description"
      open={open}
      onClose={handleClose}
      slots={{
        backdrop: BackdropSlot,
      }}
    >
      <div className={JoinClasses("", styles["modal-content"])}>
        <h2 id="unstyled-modal-title" className="modal-title">
          Text in a modal
        </h2>
        <p id="unstyled-modal-description" className="modal-description">
          Aliquid amet deserunt earum!
        </p>
      </div>
    </MuiModal>
  );
}
