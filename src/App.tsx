import { useForm, FormProvider } from "react-hook-form";
import { AnswerType } from "./types";
import { useState } from "react";
import { useQuestionData } from "./hooks";
import { QuestionRenderer } from "./renderers";

type FieldValues = Record<string, AnswerType>;

function App() {
  const { order } = useQuestionData();
  const [activeIndex, setActiveIndex] = useState(0);
  const form = useForm<FieldValues>();

  const renderQuestion = (index: number) => {
    const question = order[index];
    if (!question) {
      return null;
    }
    return <QuestionRenderer name={question.name} key={question.name} />;
  };

  return (
    <FormProvider {...form}>
      <form
        onSubmit={form.handleSubmit((values) => {
          console.log(values);
        })}
      >
        {renderQuestion(activeIndex)}
        <hr />
        <button
          type="button"
          onClick={() => {
            setActiveIndex((prev) => {
              if (prev === 0) {
                return 0;
              }
              return prev - 1;
            });
          }}
        >
          prev
        </button>
        <button
          type="button"
          onClick={() => {
            setActiveIndex((prev) => {
              if (prev === order.length - 1) {
                return order.length - 1;
              }
              return prev + 1;
            });
          }}
        >
          next
        </button>
      </form>
    </FormProvider>
  );
}

export default App;
