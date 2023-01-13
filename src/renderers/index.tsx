import { useMemo } from "react";
import { useQuestionData } from "../hooks";
import { Choice, Question } from "../types";
import { findQuestion } from "../utils";
import { MultiChoiceQuestionRenderer } from "./MultiChoice";
import { SingleChoiceQuestionRenderer } from "./SingleChoice";
import { TextQuestionRenderer } from "./Text";

export const QuestionRenderer = ({ name }: { name: string }) => {
  const { questions } = useQuestionData();
  const question = useMemo(
    () => findQuestion(questions, name),
    [questions, name]
  );

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
