import App from "./App";
import {render, screen} from "@testing-library/react";

describe("App", () => {
  it("should render without crashing", () => {
    render(<App />);
    expect(screen.getByTestId("app")).toBeInTheDocument();
  });
});
