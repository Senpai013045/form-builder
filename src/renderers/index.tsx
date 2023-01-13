import { useQuestionData, useShouldRender } from "../hooks";
import { Choice, Question } from "../types";
import { findQuestion, findSchema } from "../utils";
import { MultiChoiceQuestionRenderer } from "./MultiChoice";
import { SingleChoiceQuestionRenderer } from "./SingleChoice";
import { TextQuestionRenderer } from "./Text";

export const QuestionRenderer = ({ name }: { name: string }) => {
  const { order, questions } = useQuestionData();
  const question = findQuestion(questions, name);
  const schema = findSchema(order, name);

  const shouldRender = useShouldRender(schema?.conditions ?? []);
  if (!shouldRender) {
    return null;
  }

  if (!question) {
    return null;
  }

  //check if it has subquestions
  switch (question.type) {
    case "text":
      return <TextQuestionRenderer question={question} />;
    case "singleChoice":
      return (
        <SingleChoiceQuestionRenderer
          question={question as Question & { choices: Choice[] }}
        />
      );
    case "multipleChoice":
      return (
        <MultiChoiceQuestionRenderer
          question={question as Question & { choices: Choice[] }}
        />
      );
    default:
      return (
        <p>
          {question.title} - {question.type} - no renderer
        </p>
      );
  }
};
