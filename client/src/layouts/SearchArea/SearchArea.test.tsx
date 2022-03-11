import { render, screen } from "@testing-library/react";
import {TestWrapper} from "../../components";
import SearchArea from ".";

describe("Search area", () => {
  it("should be rendered without crashing", () => {
    render(
      <TestWrapper>
        <SearchArea />
      </TestWrapper>
    );

    expect(screen.getByRole("form")).toBeInTheDocument();
  });
});
