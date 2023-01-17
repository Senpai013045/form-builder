import {Question} from "../types";
import {findQuestion, filterQuestions} from "./index";

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
      ],
    },
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
      name: "pizzaOrBurger",
      type: "singleChoice",
      title: "Do you prefer pizza or burger?",
      choices: [
        {
          label: "Pizza",
          value: "pizza",
        },
        {
          label: "Burger",
          value: "burger",
        },
      ],
    },
    {
      name: "pizzaToppings",
      type: "multipleChoice",
      title: "What toppings do you want on your pizza?",
      choices: [
        {
          label: "Pepperoni",
          value: "pepperoni",
        },
        {
          label: "Mushrooms",
          value: "mushrooms",
        },
        {
          label: "Onions",
          value: "onions",
        },
      ],
      conditions: [
        {
          valueOfField: "pizzaOrBurger",
          operation: "eq",
          value: "pizza",
        },
      ],
    },
    {
      name: "burgerToppings",
      type: "multipleChoice",
      title: "What toppings do you want on your burger?",
      choices: [
        {
          label: "Lettuce",
          value: "lettuce",
        },
        {
          label: "Tomato",
          value: "tomato",
        },
      ],
      conditions: [
        {
          valueOfField: "pizzaOrBurger",
          operation: "eq",
          value: "burger",
        },
      ],
    },
  ];

  it("should return the questions that match the conditions", () => {
    const filteredQuestions = filterQuestions(mockQuestions, {pizzaOrBurger: "pizza"});
    expect(filteredQuestions).toEqual([mockQuestions[0], mockQuestions[1]]);
  });
  it("should return the questions that match the conditions", () => {
    const filteredQuestions = filterQuestions(mockQuestions, {pizzaOrBurger: "burger"});
    expect(filteredQuestions).toEqual([mockQuestions[0], mockQuestions[2]]);
  });
});
