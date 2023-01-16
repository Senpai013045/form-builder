import {cleanup} from "@testing-library/react";
import {afterEach} from "vitest";
import "@testing-library/jest-dom";
import "@testing-library/user-event";

afterEach(() => {
  cleanup();
});
