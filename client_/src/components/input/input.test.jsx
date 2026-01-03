import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Input from "./input";

const defaultProps = {
  id: "test-input",
  placeholder: "input placeholder",
  required: true,
};

const field = {
  onChange: jest.fn(),
  onBur: jest.fn(),
  value: "",
  name: "test name",
  ref: jest.fn(),
};

describe("Input component", () => {
  it("renders with label", () => {
    render(<Input {...defaultProps} label="input label" />);

    expect(screen.getByLabelText("input label")).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText(defaultProps.placeholder)
    ).toBeInTheDocument();
  });

  it("renders without label", () => {
    render(<Input {...defaultProps} />);

    expect(screen.queryByRole("label")).not.toBeInTheDocument();
    expect(
      screen.getByPlaceholderText(defaultProps.placeholder)
    ).toBeInTheDocument();
  });

  it("shows error message when invalid", () => {
    render(
      <Input
        {...defaultProps}
        label="input label"
        invalid={true}
        error="this is an error"
      />
    );

    expect(screen.getByText("this is an error")).toBeInTheDocument();
    expect(screen.getByText("this is an error")).toHaveClass("text-pink");
  });

  it("handles field prop", () => {
    render(<Input {...defaultProps} label="input label" {...field} />);

    const input = screen.getByLabelText("input label");

    expect(input).toHaveAttribute("id", "test-input");
    expect(input).toHaveAttribute("placeholder", "input placeholder");
  });
});

describe("password input", () => {
  const passProps = {
    ...defaultProps,
    type: "password",
    label: "password",
  };

  it("renders password input with toggle", () => {
    render(<Input {...passProps} />);

    expect(screen.getByLabelText("password")).toHaveAttribute(
      "type",
      "password"
    );
    expect(
      screen.getByRole("button", { name: /toggle password visibility/i })
    ).toBeInTheDocument();
  });

  it("toggles password visibility when button is clicked", async () => {
    const user = userEvent.setup();

    render(<Input {...passProps} />);

    const input = screen.getByLabelText("password");
    const toggleButton = screen.getByRole("button", {
      name: /toggle password visibility/i,
    });

    expect(input).toHaveAttribute("type", "password");

    await user.click(toggleButton);
    expect(input).toHaveAttribute("type", "text");

    await user.click(toggleButton);
    expect(input).toHaveAttribute("type", "password");
  });

  it("updates aria-label after first toggle", async () => {
    const user = userEvent.setup();

    render(<Input {...passProps} />);

    const toggleButton = screen.getByRole("button", {
      name: /toggle password visibility/i,
    });

    await user.click(toggleButton);
    expect(
      screen.getByRole("button", { name: /show password/i })
    ).toBeInTheDocument();

    await user.click(toggleButton);
    expect(
      screen.getByRole("button", { name: /hide password/i })
    ).toBeInTheDocument();
  });

  it("displays error message for password input", () => {
    render(
      <Input
        {...passProps}
        {...field}
        invalid={true}
        error="password is required"
      />
    );

    expect(screen.getByText("password is required")).toBeInTheDocument();
  });

  it("has ARIA attributes", () => {
    render(<Input {...passProps} />);

    const input = screen.getByLabelText("password");

    expect(input).toHaveAttribute(
      "aria-describedby",
      `${defaultProps.id}-desc`
    );
  });
});

describe("number input", () => {
  const numberProps = {
    ...defaultProps,
    type: "number",
    label: "number input",
    field: {
      onChange: jest.fn(),
      ref: jest.fn(),
    },
    value: 5,
  };

  it("renders number input with with increment and decrement buttons", () => {
    render(<Input {...numberProps} />);

    expect(screen.getByLabelText("number input")).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "increase" })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "decrease" })
    ).toBeInTheDocument();
  });

  it("calls onChange when increment button is clicked", async () => {
    const user = userEvent.setup();
    const mockOnChange = jest.fn();

    render(
      <Input
        {...numberProps}
        field={{ ...numberProps.field, onChange: mockOnChange }}
      />
    );

    const incrementButton = screen.getByRole("button", { name: "increase" });

    await user.click(incrementButton);
    expect(mockOnChange).toHaveBeenCalled();
  });

  it("calls onChange when decrement button is clicked", async () => {
    const user = userEvent.setup();
    const mockOnChange = jest.fn();

    render(
      <Input
        {...numberProps}
        field={{ ...numberProps.field, onChange: mockOnChange }}
      />
    );

    const incrementButton = screen.getByRole("button", { name: "decrease" });

    await user.click(incrementButton);
    expect(mockOnChange).toHaveBeenCalled();
  });

  it("displays error message for number input", () => {
    render(
      <Input
        {...numberProps}
        invalid={true}
        error="must be between 1 and 100"
      />
    );

    expect(screen.getByText("must be between 1 and 100")).toBeInTheDocument();
  });
});
