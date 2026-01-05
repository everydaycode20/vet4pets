import { render, screen } from "@testing-library/react";
import SubmitBtn from "./submit-btn";

describe("submit button", () => {
  it("renders button", () => {
    render(<SubmitBtn text="submit" />);

    expect(screen.getByRole("button")).toBeInTheDocument();
  });

  it("applies custom classes", () => {
    render(<SubmitBtn text="submit" classes="class-1 class-2" />);

    const button = screen.getByRole("button");
    expect(button).toHaveClass("class-1");
    expect(button).toHaveClass("class-2");
  });
});
