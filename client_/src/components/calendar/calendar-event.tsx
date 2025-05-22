import { EventProps } from "react-big-calendar";
import dayjs from "dayjs";

export default function CalendarEvent({ event }: EventProps) {
  const startTime = dayjs(event.start).format("HH:mm A");
  const endTime = dayjs(event.end).format("HH:mm A");

  return (
    <div role="button" className="rbc-event" tabIndex={0}>
      <div className="rbc-event-label">
        {startTime}-{endTime}
      </div>
      <div className="rbc-event-content">{event.title}</div>
    </div>
  );
}
