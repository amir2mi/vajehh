import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { TestWrapper } from "../../components";
import config from "../../config.json";
import SearchArea from ".";
import { debug } from "console";

describe("<SearchArea/>", () => {
  const setup = () =>
    render(
      <TestWrapper>
        <SearchArea />
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
    setup();
    const input = screen.getByRole("textbox");
    userEvent.type(input, "test");

    // expect().toHaveTextContent("test");
  });
});
