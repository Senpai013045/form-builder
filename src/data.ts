import { Order, Question } from "./types";

export const questions: Question[] = [
    {
        name: "name",
        type: "text",
        title: "What is your name?",
    },
    {
        name: "favoriteSport",
        type: "singleChoice",
        title: "What is your favorite sport?",
        choices: [
            {
                label: "Football",
                value: "football",
            },
            {
                label: "Basketball",
                value: "basketball",
            },
        ],
    },
    {
        name: "favoriteFootballPlayer",
        type: "text",
        title: "Who is your favorite football player?",
    },
    {
        name: "barcaOrReal",
        type: "singleChoice",
        title: "Which one would you prefer?",
        choices: [
            {
                label: "Barcelona",
                value: "barcelona",
            },
            {
                label: "Real Madrid",
                value: "realMadrid",
            },
        ],
    },
    {
        name: "favoriteBasketballPlayer",
        type: "text",
        title: "Who is your favorite basketball player?",
    },
];

export const order: Order = [
    {
        name: "name",
    },
    {
        name: "favoriteSport",
    },
    {
        name: "favoriteFootballPlayer",
        conditions: [
            {
                valueOfField: "favoriteSport",
                operation: "eq",
                value: "football",
            },
        ],
    },
    {
        name: "barcaOrReal",
        conditions: [
            {
                valueOfField: "favoriteFootballPlayer",
                operation: "in",
                value: ["messi", "ronaldo"],
            },
            {
                valueOfField: "favoriteSport",
                operation: "eq",
                value: "football",
            },
        ],
    },
    {
        name: "favoriteBasketballPlayer",
        conditions: [
            {
                valueOfField: "favoriteSport",
                operation: "eq",
                value: "basketball",
            },
        ],
    },
];