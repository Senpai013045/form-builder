import { useMemo } from "react";
import { useWatch } from "react-hook-form";
import { questions } from "./data";
import { filterQuestions } from "./utils";

export const useQuestionData = () => {
  return {
    questions,
  };
};

export const useFilteredQuestions = () => {
  const { questions } = useQuestionData();
  const watch = useWatch();

  const filteredQuestions = useMemo(() => {
    return filterQuestions(questions, watch);
  }, [questions, watch]);

  return filteredQuestions;
};
