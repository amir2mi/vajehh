import {render, screen } from "@testing-library/react";
import { TestWrapper } from "@components";
import App from "./App";

test("renders learn react link", async () => {
  render(
    <TestWrapper>
      <App />
    </TestWrapper>
  );

  expect(screen.getByRole("heading", { level: 1 })).toHaveClass('title');
});
