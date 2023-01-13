//define answer types
export type AnswerType = string | number | string[];

//define question types
export interface BaseQuestion {
    name: string;
    type: string;
    title: string;
}

export interface TextQuestion extends BaseQuestion {
    type: "text";
}

export interface NumberQuestion extends BaseQuestion {
    type: "number";
}

export interface Choice {
    value: string;
    label: string;
}

export interface SingleChoiceQuestion extends BaseQuestion {
    type: "singleChoice";
    choices: Choice[];
}

export interface MultipleChoiceQuestion extends BaseQuestion {
    type: "multipleChoice";
    choices: Choice[];
}

export type Question = TextQuestion | NumberQuestion | SingleChoiceQuestion | MultipleChoiceQuestion;

//operations
export type PrimitiveOperations = "eq" | "neq" | "gt" | "gte" | "lt" | "lte";
export type ArrayOperations = "contains" | "ncontains" | "in" | "nin";
export type Operations = PrimitiveOperations | ArrayOperations;

export type FieldComparision = {
    valueOfField: string;
    operation: Operations;
    value: AnswerType;
}

//define relations between question and conditions
export interface QuestionRelation {
    name: string;
    conditions?: FieldComparision[];
}

export type Order = QuestionRelation[];