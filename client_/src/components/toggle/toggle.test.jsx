import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import ToggleComponent from "./toggle";

describe("toggle component", () => {
  it("renders label", () => {
    render(<ToggleComponent label="toggle" />);

    expect(screen.getByText("toggle")).toBeInTheDocument();
    expect(screen.getByRole("switch")).toBeInTheDocument();
  });

  it("can be toggled", async () => {
    const user = userEvent.setup();

    render(<ToggleComponent label="toggle" />);

    const toggle = screen.getByRole("switch");
    expect(toggle).not.toBeChecked();

    await user.click(toggle);
    expect(toggle).toBeChecked();
  });

  it("calls onChange when toggled", async () => {
    const user = userEvent.setup();
    const handleChange = jest.fn();

    render(<ToggleComponent label="toggle" onChange={handleChange} />);

    await user.click(screen.getByRole("switch"));
    expect(handleChange).toHaveBeenCalled();
  });

  it("can be disabled", async () => {
    const user = userEvent.setup();
    render(<ToggleComponent label="toggle" disabled />);

    const toggle = screen.getByRole("switch");
    expect(toggle).toBeDisabled();

    await user.click(toggle);
    expect(toggle).not.toBeChecked();
  });
});
