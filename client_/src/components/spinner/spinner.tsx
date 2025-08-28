import JoinClasses from "../../utils/join-classes";

import styles from "./spinner.module.scss";

export default function Spinner({ state }: { state: boolean }) {
  console.log(state);

  return (
    <div
      aria-live="polite"
      role="status"
      className={JoinClasses(state === false ? "hidden" : "")}
      aria-busy="true"
    >
      {state && <span className="sr-only">loading</span>}

      <div className={styles.loader}></div>
    </div>
  );
}
