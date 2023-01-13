import { Choice, Question } from "../types";
import { useFormContext } from "react-hook-form";

export const MultiChoiceQuestionRenderer = ({
  question,
}: {
  question: Question & { choices: Choice[] };
}) => {
  const { register } = useFormContext();
  return (
    <div>
      <label>{question.title}</label>
      {question.choices.map((choice) => (
        <div key={choice.value}>
          {/* checkbox */}
          <input
            {...register(question.name)}
            type="checkbox"
            value={choice.value}
          />
          <label>{choice.label}</label>
        </div>
      ))}
    </div>
  );
};
