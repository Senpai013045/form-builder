import { Question } from "../types";
import { findQuestion, filterQuestions } from "./index";

describe("findQuestion", () => {
    const mockQuestions: Question[] = [
        {
            name: "name",
            type: "text",
            title: "What is your name?",
        },
        {
            name: "age",
            type: "number",
            title: "What is your age?",
            conditions: [
                {
                    valueOfField: "name",
                    operation: "eq",
                    value: "John",
                },
            ]
        }
    ];
    it("should return the question if found", () => {
        const question = findQuestion(mockQuestions, "name");
        expect(question).toEqual(mockQuestions[0]);
    });

    it("should return undefined if not found", () => {
        const question = findQuestion(mockQuestions, "notFound");
        expect(question).toBeUndefined();
    });
});

describe("filterQuestions", () => {
    const mockQuestions: Question[] = [
        {
            name: "name",
            type: "text",
            title: "What is your name?",
        },
        {
            name: "age",
            type: "number",
            title: "What is your age?",
            conditions: [
                {
                    valueOfField: "name",
                    operation: "eq",
                    value: "John",
                },
            ]
        }
    ]
    it("should not return the question if the condition is not met", () => {
        const filteredQuestions = filterQuestions(mockQuestions, { name: "Jane" });
        expect(filteredQuestions).toEqual([mockQuestions[0]]);
    })
    it("should return the question if the condition is met", () => {
        const filteredQuestions = filterQuestions(mockQuestions, { name: "John" });
        expect(filteredQuestions).toEqual(mockQuestions);
    })
})