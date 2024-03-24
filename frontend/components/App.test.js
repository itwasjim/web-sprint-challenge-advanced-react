import React from "react";
import AppFunctional from "./AppFunctional";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";

describe("MVP 2 Testing for AppFunctional", () => {
  describe("info", () => {
    test("coordinates render initial state", () => {
      render(<AppFunctional />);
      expect(screen.getByText("Coordinates (2, 2)")).toBeInTheDocument();
    });
    test("steps render initial state", () => {
      render(<AppFunctional />);
      expect(screen.getByText("You moved 0 times")).toBeInTheDocument();
    });
  });
  describe("Grid buttons render", () => {
    test("left button renders", () => {
      render(<AppFunctional />);
      const leftButton = screen.getByText(/left/i);
      expect(leftButton).toBeInTheDocument();
    });
    test("up button renders", () => {
      render(<AppFunctional />);
      const upButton = screen.getByText(/up/i);
      expect(upButton).toBeInTheDocument();
    });
    test("right button renders", () => {
      render(<AppFunctional />);
      const rightButton = screen.getByText(/right/i);
      expect(rightButton).toBeInTheDocument();
    });
    test("down button renders", () => {
      render(<AppFunctional />);
      const downButton = screen.getByText(/down/i);
      expect(downButton).toBeInTheDocument();
    });
    test("reset button renders", () => {
      render(<AppFunctional />);
      const downButton = screen.getByText(/reset/i);
      expect(downButton).toBeInTheDocument();
    });
  });
  describe("form", () => {
    test("input value updates on change", async () => {
      const user = userEvent.setup();
      render(<AppFunctional />);
      const input = screen.getByPlaceholderText(/email/i);
      expect(input).toHaveValue("");
      await user.type(input, "hello");
      expect(input).toHaveValue("hello");
      await user.keyboard("[BACKSPACE][BACKSPACE][BACKSPACE][BACKSPACE]");
      await user.type(input, "i");
      expect(input).toHaveValue("hi");
    });
  });
});