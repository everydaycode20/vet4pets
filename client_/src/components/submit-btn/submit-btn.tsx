import JoinClasses from "../../utils/join-classes";

export default function SubmitBtn({
  text,
  classes,
}: {
  text: string;
  classes: string;
}) {
  return (
    <button className={JoinClasses("blue-btn submit-btn", classes)}>
      {text}
    </button>
  );
}
