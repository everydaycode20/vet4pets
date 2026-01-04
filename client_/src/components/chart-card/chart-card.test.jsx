import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { ChartCard } from "./chart-card";

const mockData = [{ total: 100 }, { total: 150 }, { total: 130 }];

const defaultProps = {
  title: "test",
  quantity: 5820,
  fill: "red",
  stroke: "black",
};

describe("chart card component", () => {
  it("renders the card", () => {
    render(<ChartCard {...defaultProps} data={mockData} />);

    expect(screen.getByText("test")).toBeInTheDocument();
    expect(screen.getByText(5820)).toBeInTheDocument();
  });

  it("renders as an article element", () => {
    const { container } = render(<ChartCard {...defaultProps} />);

    const article = container.querySelector("article");
    expect(article).toBeInTheDocument();
    expect(article).toHaveClass("chart-card");
  });

  it("handles empty array", () => {
    const { container } = render(<ChartCard {...defaultProps} data={[]} />);

    const article = container.querySelector("article");
    expect(article).toBeInTheDocument();
  });
});

describe("loading state-skeleton", () => {
  it("renders skeleton when data is undefined", () => {
    const { container } = render(
      <ChartCard {...defaultProps} data={undefined} />
    );

    const skeletons = container.querySelectorAll(".skeleton");
    expect(skeletons).toHaveLength(2);
  });

  it("does not render skeleton when data is provided", () => {
    const { container } = render(
      <ChartCard {...defaultProps} data={mockData} />
    );

    const skeletons = container.querySelectorAll(".skeleton");
    expect(skeletons).toHaveLength(0);
  });
});

describe("area chart rendering", () => {
  it("renders area chart when data is provided", () => {
    const { container } = render(
      <ChartCard {...defaultProps} data={mockData} />
    );

    const chart = container.querySelector(".recharts-responsive-container");

    expect(chart).toBeInTheDocument();
  });
});
