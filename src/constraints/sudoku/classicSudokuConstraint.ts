import { Board } from "../../board";
import { AndConstraint } from "../andConstraint";
import { getBoardColumnConstraint } from "./uniqueColumnConstraint";
import { getBoardRowConstraint } from "./uniqueRowConstraint";
import { getBoardBoxConstraint } from "./uniqueBoxConstraint";
import { RangeConstraint } from "./rangeConstraint";

/**
 * Returns a constraint matching classic sudoku rules -- that is, each row, column, and box
 * must have unique digits.
 * 
 * NOTE: This function allows you to specify non-square sudoku boxes, however it DOES require
 * the boxes to tile the entire board. To that end, ensure that `boxWidth` divides `board.width`,
 * and likewise that `boxHeight` divides `board.Height`.
 * 
 * @param board Board matching the size to be tested.
 * @param boxWidth Width of boxes for the sudoku board.
 * @param boxHeight Height of boxes for the sudoku board.
 * @param minValue Minimum value able to be provided for a cell.
 * @param maxValue Maximum value able to be provided for a cell.
 */
export function getSudokuConstraint(
    board: Board,
    boxWidth: number,
    boxHeight: number,
    minValue: number,
    maxValue: number) {
    return new AndConstraint([
        getBoardColumnConstraint(board.width),
        getBoardRowConstraint(board.height),
        getBoardBoxConstraint(board, boxWidth, boxHeight),
        new RangeConstraint(minValue, maxValue),
    ]);
}

/**
 * Returns a constraint matching a standard 9x9 Sudoku board.
 */
export function getStandard9SudokuConstraint() {
    return getSudokuConstraint(new Board(9), 3, 3, 1, 9);
}