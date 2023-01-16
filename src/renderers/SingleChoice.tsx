import {Choice, Question} from "../types";
import {useFormContext} from "react-hook-form";

export const SingleChoiceQuestionRenderer = ({
  question,
}: {
  question: Question & {choices: Choice[]};
}) => {
  const {register} = useFormContext();
  return (
    <div>
      <label>{question.title}</label>
      {question.choices.map(choice => (
        <div key={choice.value}>
          {/* radio */}
          <input {...register(question.name)} type="radio" value={choice.value} />
          <label>{choice.label}</label>
        </div>
      ))}
    </div>
  );
};
