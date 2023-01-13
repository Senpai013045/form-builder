import { Question } from "../types";
import { useFormContext } from "react-hook-form";

export const TextQuestionRenderer = ({ question }: { question: Question }) => {
  const { register } = useFormContext();
  return (
    <div>
      <label>{question.title}</label>
      <input {...register(question.name)} />
    </div>
  );
};
