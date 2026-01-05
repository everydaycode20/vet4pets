import { render, screen } from "@testing-library/react";

import TopAppointments from "./top-appointments";

jest.mock("react-i18next", () => ({
  useTranslation: () => ({
    t: (key) => key,
  }),
}));

const mockData = [
  { id: 1, name: "Checkup", total: 25 },
  { id: 2, name: "Vaccination", total: 18 },
  { id: 3, name: "Surgery", total: 12 },
];

describe("top appointments components", () => {
  it("renders the component", () => {
    render(<TopAppointments data={mockData} />);

    expect(screen.getByRole("heading")).toBeInTheDocument();
  });

  it("renders all appointments", () => {
    render(<TopAppointments data={mockData} />);

    expect(screen.getAllByRole("listitem")).toHaveLength(3);
    expect(screen.getByText("checkup")).toBeInTheDocument();
    expect(screen.getByText("vaccination")).toBeInTheDocument();
    expect(screen.getByText("surgery")).toBeInTheDocument();
  });

  it("handles empty data", () => {
    render(<TopAppointments data={[]} />);

    expect(screen.getByRole("heading")).toBeInTheDocument();
    expect(screen.queryAllByRole("listitem")).toHaveLength(0);
  });

  it("handles undefined data", () => {
    render(<TopAppointments data={undefined} />);

    expect(screen.getByRole("heading")).toBeInTheDocument();
    expect(screen.queryAllByRole("listitem")).toHaveLength(0);
  });
});
