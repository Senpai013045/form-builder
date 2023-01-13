import { useForm, FormProvider, useWatch } from "react-hook-form";
import { AnswerType } from "./types";
import { FC, PropsWithChildren, useMemo, useState } from "react";
import { useQuestionData } from "./hooks";
import { QuestionRenderer } from "./renderers";
import { filterOrder } from "./utils";

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
  const order = useFilteredOrder();

  const renderQuestion = (index: number) => {
    const schema = order[index];
    if (!schema) {
      return null;
    }
    return <QuestionRenderer name={schema.name} key={schema.name} />;
  };

  return (
    <div>
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
