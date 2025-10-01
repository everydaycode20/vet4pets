import { forwardRef, Ref } from "react";
import JoinClasses from "../../utils/join-classes";

import styles from "./toggle.module.scss";

function ToggleComponent(
  { label, ...props }: { label: string },
  ref: Ref<HTMLInputElement>
) {
  return (
    <label className={styles.toggle}>
      <span className={JoinClasses("font-semibold", styles.label)}>
        {label}
      </span>

      <input id="toggle" type="checkbox" role="switch" {...props} ref={ref} />

      <span className={styles.state}>
        <span className={styles["state-container"]}>
          <span className={styles["state-position"]}></span>
        </span>
      </span>
    </label>
  );
}

const Toggle = forwardRef<HTMLInputElement, { label: string }>(ToggleComponent);

export default Toggle;
