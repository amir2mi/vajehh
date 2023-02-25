/* eslint-disable testing-library/no-node-access */
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { TestWrapper } from "@components";
import SearchPage from "@pages/search";

describe("Dictionary Picker functionality", () => {
  const setup = () => {
    const view = render(
      <TestWrapper>
        <SearchPage />
      </TestWrapper>
    );

    return view;
  };

  it("Motaradef dictionary and its tab should be disabled correctly", async () => {
    const { container } = setup();
    const motaradefCheckbox = container.querySelector(".dictionary-picker .checkbox-wrapper:nth-child(2)");
    const motaradefTabButton = screen.getAllByRole("tab")[2];

    if (motaradefCheckbox) {
      userEvent.click(motaradefCheckbox);
    }

    // Motaradef dictionary should be displayed by default
    expect(motaradefTabButton).toHaveTextContent("مترادف");

    // Motaradef dictionary should be disabled, Motaradef tab should be hidden after debounce
    waitFor(() => {
      expect(motaradefTabButton).not.toHaveTextContent("مترادف");
    });
  });
});
