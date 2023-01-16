import {useForm, FormProvider, useFormContext} from "react-hook-form";
import {AnswerType} from "./types";
import {FC, PropsWithChildren, useEffect, useState} from "react";
import {useFilteredQuestions, useQuestionData} from "./hooks";
import {QuestionRenderer} from "./renderers";
import {VerticalAnimation} from "./animations/Vertical";

type FieldValues = Record<string, AnswerType>;

const FormWrapper: FC<PropsWithChildren> = ({children}) => {
  const form = useForm<FieldValues>();
  return (
    <FormProvider {...form}>
      <form
        onSubmit={form.handleSubmit(values => {
          console.log(values);
        })}
      >
        {children}
      </form>
    </FormProvider>
  );
};

function FormContent() {
  const [{activeIndex, direction}, setActive] = useState({
    activeIndex: 0,
    direction: 0,
  });
  const {setValue, getValues} = useFormContext();
  const filteredQuestions = useFilteredQuestions();
  const {questions} = useQuestionData();

  const question = questions[activeIndex];

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
          const value = !rawValue ? [] : typeof rawValue === "string" ? [rawValue] : rawValue;
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
    <div data-testid="app">
      <button
        type="button"
        onClick={() => {
          setActive(prev => {
            if (prev.activeIndex === 0) {
              return prev;
            }
            return {
              activeIndex: prev.activeIndex - 1,
              direction: -1,
            };
          });
        }}
      >
        prev
      </button>
      <button
        type="button"
        onClick={() => {
          setActive(prev => {
            if (prev.activeIndex === filteredQuestions.length - 1) {
              return prev;
            }
            return {
              activeIndex: prev.activeIndex + 1,
              direction: 1,
            };
          });
        }}
      >
        next
      </button>
      <hr />

      <div
        style={{
          height: 500,
          backgroundColor: "lightgray",
          margin: "auto",
          position: "relative",
        }}
      >
        <VerticalAnimation activeIndex={activeIndex} direction={direction}>
          <div style={{display: "flex"}}>
            <p style={{marginRight: 50}}>{activeIndex + 1}</p>
            <QuestionRenderer question={question} />
          </div>
        </VerticalAnimation>
      </div>
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
