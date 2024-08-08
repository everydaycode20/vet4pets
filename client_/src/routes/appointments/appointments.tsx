import Modal from "../../components/modal/modal";
import CalendarExtended from "../calendar/calendar";
import styles from "./appointments.module.scss";

export default function Appointments() {
  return (
    <section className="h-full">
      <CalendarExtended />

      <Modal />
    </section>
  );
}
