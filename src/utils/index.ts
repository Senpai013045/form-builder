import { AnswerType, Operations, Order, Question, QuestionRelation } from "../types";


const questionCache = new Map<string, Question>();
export const findQuestion = (questions: Question[], name: string) => {
    if (questionCache.has(name)) {
        const cached = questionCache.get(name);
        if (cached) {
            return cached;
        }
    }
    const question = questions.find((q) => q.name === name);
    if (question) {
        questionCache.set(name, question);
        return question;
    }
};

const schemaCache = new Map<string, QuestionRelation>();
export const findSchema = (order: Order, name: string) => {
    if (schemaCache.has(name)) {
        const cached = schemaCache.get(name);
        if (cached) {
            return cached;
        }
    }
    const schema = order.find((q) => q.name === name);
    if (schema) {
        schemaCache.set(name, schema);
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