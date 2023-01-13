import { AnswerType, Operations, Order, Question, QuestionRelation } from "../types";


export const findQuestion = (questions: Question[], name: string) => {
    const question = questions.find((q) => q.name === name);
    if (question) {
        return question;
    }
};

export const findSchema = (order: Order, name: string) => {
    const schema = order.find((q) => q.name === name);
    if (schema) {
        return schema;
    }
};

export const handleOperation = ({
    valueOfField,
    operation,
    value,
}: {
    valueOfField: AnswerType;
    operation: Operations;
    value: AnswerType;
}) => {
    switch (operation) {
        case "eq":
            return valueOfField === value;
        case "neq":
            return valueOfField !== value;
        case "gt":
            return valueOfField > value;
        case "gte":
            return valueOfField >= value;
        case "lt":
            return valueOfField < value;
        case "lte":
            return valueOfField <= value;
        case "in":
            return (value as string[]).includes(valueOfField as string);
        case "nin":
            return !(value as string[]).includes(valueOfField as string);
        case "contains":
            return (valueOfField as string[]).includes(value as string);
        case "ncontains":
            return !(valueOfField as string[]).includes(value as string);
        default:
            //this will make exhaustive checking
            const _never: never = operation;
    }
};

export const filterOrder = (order: Order, formValues: Record<string, AnswerType>) => {
    return order.filter((question) => {
        if (!question.conditions) {
            return true;
        }
        return question.conditions.every((condition) => {
            const valueOfField = formValues[condition.valueOfField];
            return handleOperation({
                valueOfField,
                operation: condition.operation,
                value: condition.value,
            });
        });
    });
}