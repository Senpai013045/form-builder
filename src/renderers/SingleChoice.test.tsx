import {render, screen} from "@testing-library/react";
import {MockFormProvider} from "../test/mock-form-provider";
import {SingleChoiceQuestion} from "../types";
import {SingleChoiceQuestionRenderer} from "./SingleChoice";

const question: SingleChoiceQuestion = {
  name: "name",
  title: "What is your name?",
  type: "singleChoice",
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

describe("SingleChoiceQuestionRenderer", () => {
  it("should render some radio buttons with the question choices", () => {
    render(
      <MockFormProvider>
        <SingleChoiceQuestionRenderer question={question} />
      </MockFormProvider>
    );
    //expect an input with the question name
    const inputs = screen.getAllByRole("radio");
    expect(inputs).toHaveLength(question.choices.length);
    inputs.forEach((input, index) => {
      expect(input).toHaveAttribute("value", question.choices[index].value);
      expect(input).toHaveAttribute("name", question.name);
    });
  });
});
