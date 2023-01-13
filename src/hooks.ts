import { useEffect, useState } from "react";
import { questions, order } from "./data";
import { FieldComparision } from "./types";
import { useFormContext } from "react-hook-form";
import { handleOperation } from "./utils";

export const useQuestionData = () => {
    return {
        questions,
        order,
    };
};

export const useShouldRender = (conditions: FieldComparision[]) => {
    const { watch } = useFormContext();
    const [shouldRender, setShouldRender] = useState(false);
    useEffect(() => {
        if (conditions.length === 0) {
            setShouldRender(true);
            return;
        }
        const subscription = watch((value) => {
            const shouldRender = conditions.every((condition) => {
                const valueOfField = value[condition.valueOfField];
                return handleOperation({
                    valueOfField,
                    operation: condition.operation,
                    value: condition.value,
                });
            });
            setShouldRender(shouldRender);
        });
        return () => subscription.unsubscribe();
    }, [watch]);

    return shouldRender;
};

