import {TextQuestionRenderer} from "./Text";
import {render, screen} from "@testing-library/react";
import {TextQuestion} from "../types";
import {MockFormProvider} from "../test/mock-form-provider";

const question: TextQuestion = {
  name: "name",
  title: "What is your name?",
  type: "text",
};

describe("TextQuestionRenderer", () => {
  it("should render a text input", () => {
    render(
      <MockFormProvider>
        <TextQuestionRenderer question={question} />
      </MockFormProvider>
    );
    //expect an input with the question name
    const input = screen.getByRole("textbox");
    expect(input).toBeInTheDocument();
  });
});
