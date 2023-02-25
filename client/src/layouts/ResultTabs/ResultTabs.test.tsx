import { render, screen } from "@testing-library/react";
import { TestWrapper } from "@components";
import ResultTabs from ".";

describe("<ResultTabs/>", () => {
  const setup = () => {
    render(
      <TestWrapper>
        <ResultTabs />
      </TestWrapper>
    );
  };

  it("should be rendered without crashing", () => {
    setup();
    expect(screen.getByRole("tablist")).toBeInTheDocument();
  });
});
