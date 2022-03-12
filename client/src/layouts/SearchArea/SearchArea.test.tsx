import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { TestWrapper } from "../../components";
import config from "../../config.json";
import { SearchContext } from "../../contexts/search";
import SearchArea from ".";
import React from "react";

describe("<SearchArea/>", () => {
  const setup = (children?: React.ReactNode) =>
    render(
      <TestWrapper>
        <SearchArea />
        {children}
      </TestWrapper>
    );

  it("should be rendered without crashing", () => {
    setup();
    expect(screen.getByRole("form")).toBeInTheDocument();
  });

  it("should change the input value on type", async () => {
    setup();
    const input = screen.getByRole("textbox");
    userEvent.type(input, "test");
    expect(input).toHaveValue("test");
  });

  it("should change context value automatically after delay", async () => {
    setup(<SearchContext.Consumer>{(value) => <p>search this value: {value?.searchValue}</p>}</SearchContext.Consumer>);
    const input = screen.getByRole("textbox");
    userEvent.type(input, "test");

    await waitFor(() => {
      expect(screen.getByText("search this value: test")).toBeInTheDocument();
    });
  });
});
