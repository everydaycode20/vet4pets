import dayjs from "dayjs";

export default function CalendarEvent({
  event,
  view,
}: {
  event: {
    id: number | string;
    title?: string;
    start: Date;
    end: Date;
    color?: string;
  };
  view: string;
}) {
  const startTime = dayjs(event.start).format("HH:mm a");
  const endTime = dayjs(event.end).format("HH:mm a");

  const rgb = {
    r: parseInt(event.color!.substring(1, 3), 16),
    g: parseInt(event.color!.substring(3, 5), 16),
    b: parseInt(event.color!.substring(5, 7), 16),
  };

  const rgba = `rgba(${rgb.r},${rgb.g},${rgb.b},0.15)`;

  return (
    <>
      <div
        className="rbc-event-custom relative"
        style={{ backgroundColor: event.color }}
      >
        <div
          className="absolute rbc-event-border"
          style={{ backgroundColor: event.color }}
        ></div>

        {(view === "week" || view === "day") && (
          <div className="rbc-event-label-custom">
            <span className="font-semibold">
              {startTime}-{endTime}
            </span>
          </div>
        )}

        <div className="rbc-event-content-custom">
          <span className="font-semibold">{event.title}</span>
        </div>
      </div>
    </>
  );
}
