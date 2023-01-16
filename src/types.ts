//define answer types
export type AnswerType = string | number | string[];

export type FieldComparision = {
    valueOfField: string;
    operation: Operations;
    value: AnswerType;
}


//define question types
export interface BaseQuestion {
    name: string;
    type: string;
    title: string;
    conditions?: FieldComparision[];
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

