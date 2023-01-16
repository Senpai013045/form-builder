import {Choice, Question} from "../types";
import {MultiChoiceQuestionRenderer} from "./MultiChoice";
import {SingleChoiceQuestionRenderer} from "./SingleChoice";
import {TextQuestionRenderer} from "./Text";

export const QuestionRenderer = ({question}: {question: Question}) => {
  switch (question.type) {
    case "text":
      return <TextQuestionRenderer question={question} />;
    case "singleChoice":
      return <SingleChoiceQuestionRenderer question={question as Question & {choices: Choice[]}} />;
    case "multipleChoice":
      return <MultiChoiceQuestionRenderer question={question as Question & {choices: Choice[]}} />;
    default:
      return (
        <p>
          {question.title} - {question.type} - no renderer
        </p>
      );
  }
};
