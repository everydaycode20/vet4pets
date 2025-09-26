import JoinClasses from "../../utils/join-classes";

import styles from "./toggle.module.scss";

export default function Toggle({ label, ...props }: { label: string }) {
  return (
    <label className={styles.toggle}>
      <span className={JoinClasses("font-semibold", styles.label)}>
        {label}
      </span>

      <input id="toggle" type="checkbox" role="switch" {...props} />

      <span className={styles.state}>
        <span className={styles["state-container"]}>
          <span className={styles["state-position"]}></span>
        </span>
      </span>
    </label>
  );
}
