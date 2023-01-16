import {MultiChoiceQuestionRenderer} from "./MultiChoice";
import {render, screen} from "@testing-library/react";
import {MultipleChoiceQuestion} from "../types";
import {MockFormProvider} from "../test/mock-form-provider";

const question: MultipleChoiceQuestion = {
  name: "name",
  title: "What is your name?",
  type: "multipleChoice",
  choices: [
    {
      label: "John",
      value: "john",
    },
    {
      label: "Jane",
      value: "jane",
    },
  ],
};

describe("MultiChoiceQuestionRenderer", () => {
  it("should render some checkboxes with the question choices", () => {
    render(
      <MockFormProvider>
        <MultiChoiceQuestionRenderer question={question} />
      </MockFormProvider>
    );
    //expect an input with the question name
    const inputs = screen.getAllByRole("checkbox");
    expect(inputs).toHaveLength(question.choices.length);
    inputs.forEach((input, index) => {
      expect(input).toHaveAttribute("value", question.choices[index].value);
      expect(input).toHaveAttribute("name", question.name);
    });
  });
});
