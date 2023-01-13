import {
  useForm,
  FormProvider,
  useWatch,
  useFormContext,
} from "react-hook-form";
import { AnswerType } from "./types";
import { FC, PropsWithChildren, useEffect, useMemo, useState } from "react";
import { useQuestionData } from "./hooks";
import { QuestionRenderer } from "./renderers";
import { filterOrder, findQuestion } from "./utils";

type FieldValues = Record<string, AnswerType>;

const useFilteredOrder = () => {
  const { order } = useQuestionData();
  const watch = useWatch();

  const orderFiltered = useMemo(() => {
    return filterOrder(order, watch);
  }, [order, watch]);

  return orderFiltered;
};

const FormWrapper: FC<PropsWithChildren> = ({ children }) => {
  const form = useForm<FieldValues>();
  return (
    <FormProvider {...form}>
      <form
        onSubmit={form.handleSubmit((values) => {
          console.log(values);
        })}
      >
        {children}
      </form>
    </FormProvider>
  );
};

function FormContent() {
  const [activeIndex, setActiveIndex] = useState(0);
  const { setValue, getValues } = useFormContext();
  const order = useFilteredOrder();
  const { questions } = useQuestionData();
  const schema = order[activeIndex];

  const question = useMemo(() => {
    return findQuestion(questions, schema.name);
  }, [questions, schema.name]);

  //keyboard interaction
  useEffect(() => {
    const listener = (e: KeyboardEvent) => {
      if (!question) return;
      const pressedKey = e.key;
      const pressedNumber = Number(pressedKey);
      if (question.type === "multipleChoice") {
        //if item with this index exists tick or untick it
        if (pressedNumber >= 1 && pressedNumber <= question.choices.length) {
          const choice = question.choices[pressedNumber - 1];
          const rawValue = getValues(question.name);
          const value = !rawValue
            ? []
            : typeof rawValue === "string"
            ? [rawValue]
            : rawValue;
          if (value.includes(choice.value)) {
            setValue(
              question.name,
              value.filter((item: string) => item !== choice.value)
            );
          } else {
            setValue(question.name, [...value, choice.value]);
          }
        }
      }
      if (question.type === "singleChoice") {
        //if item with this index exists tick or untick it
        if (pressedNumber >= 1 && pressedNumber <= question.choices.length) {
          const choice = question.choices[pressedNumber - 1];
          setValue(question.name, choice.value);
        }
      }
    };
    document.addEventListener("keyup", listener);
    return () => {
      document.removeEventListener("keyup", listener);
    };
  }, [question]);

  return (
    <div>
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
      <hr />
      {schema && <QuestionRenderer name={schema.name} key={schema.name} />}
    </div>
  );
}

function App() {
  return (
    <FormWrapper>
      <FormContent />
    </FormWrapper>
  );
}

export default App;
