import { render, screen } from "@testing-library/react";
import Spinner from "./Spinner";

describe("spinner component", () => {
  it("renders the spinner", () => {
    const { container } = render(<Spinner state={true} />);

    expect(container.querySelector("[role='status']")).toBeInTheDocument();
  });

  it("is visible when state is true", () => {
    const { container } = render(<Spinner state={true} />);

    const spinner = container.querySelector('[role="status"]');
    expect(spinner).not.toHaveClass("hidden");
  });

  it("has hidden class when state is false", () => {
    const { container } = render(<Spinner state={false} />);

    const spinner = container.querySelector('[role="status"]');
    expect(spinner).toHaveClass("hidden");
  });

  it("shows loading text for screen readers when visible", () => {
    render(<Spinner state={true} />);

    expect(screen.getByText("loading")).toBeInTheDocument();
    expect(screen.getByText("loading")).toHaveClass("sr-only");
  });

  it("does not show loading text when hidden", () => {
    render(<Spinner state={false} />);

    expect(screen.queryByText("loading")).not.toBeInTheDocument();
  });

  it("has proper ARIA attributes", () => {
    const { container } = render(<Spinner state={true} />);

    const spinner = container.querySelector('[role="status"]');
    expect(spinner).toHaveAttribute("aria-live", "polite");
    expect(spinner).toHaveAttribute("aria-busy", "true");
  });
});
