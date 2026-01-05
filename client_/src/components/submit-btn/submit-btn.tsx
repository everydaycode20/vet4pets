import JoinClasses from "../../utils/join-classes";

export default function SubmitBtn({
  text,
  classes,
  testId,
}: {
  text: string;
  classes: string;
  testId: string;
}) {
  return (
    <button data-testid={testId} className={JoinClasses("blue-btn submit-btn", classes)}>
      {text}
    </button>
  );
}
