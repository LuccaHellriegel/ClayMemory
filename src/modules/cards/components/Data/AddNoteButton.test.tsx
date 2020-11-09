import React from "react";
import { render, screen } from "../../../../shared/test-utils";
import { AddNoteButton } from "./AddNoteButton";

test("render about link", () => {
	render(<AddNoteButton />);
	expect(screen.getByText(/about/));
});
