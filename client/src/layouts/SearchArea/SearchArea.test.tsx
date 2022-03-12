import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { TestWrapper } from "../../components";
import { SearchContext } from "../../contexts/search";
import SearchArea from ".";

describe("<SearchArea/>", () => {
  const setup = (children?: React.ReactNode) =>
    // disableSuggestion: do not make API call to get suggestions
    render(
      <TestWrapper>
        <SearchArea disableSuggestion />
        {children}
      </TestWrapper>
    );

  describe("search input", () => {
    it("should be rendered without crashing", () => {
      setup();
      expect(screen.getByRole("form")).toBeInTheDocument();
    });

    it("should change the input value on type", () => {
      setup();
      const input = screen.getByRole("textbox");
      userEvent.type(input, "test");
      expect(input).toHaveValue("test");
    });

    it("should change the search context value automatically after delay", async () => {
      setup(
        <SearchContext.Consumer>{(value) => <p>search this value: {value?.searchValue}</p>}</SearchContext.Consumer>
      );
      const input = screen.getByRole("textbox");

      // type "test"
      userEvent.type(input, "test");

      // wait for debounce
      await waitFor(() => {
        expect(screen.getByText("search this value: test")).toBeInTheDocument();
      });
    });

    it("should change the search context value when the search button is clicked", () => {
      setup(
        <SearchContext.Consumer>{(value) => <p>search this value: {value?.searchValue}</p>}</SearchContext.Consumer>
      );
      const input = screen.getByRole("textbox");
      const searchButton = screen.getByLabelText("جستجو کن");

      // type "test" then click search button
      userEvent.type(input, "test");
      userEvent.click(searchButton);

      // context value immediately should be changed to "test"
      expect(screen.getByText("search this value: test")).toBeInTheDocument();
    });
  });
});
