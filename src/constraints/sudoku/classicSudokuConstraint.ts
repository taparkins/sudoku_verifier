import { Board } from "../../board";
import { Constraint } from "../constraint";
import { AndConstraint } from "../andConstraint";
import { RangeConstraint } from "./rangeConstraint";
import { UniqueValueConstraint } from "../uniqueValueConstraint";
import { ColumnRegionSpec, RowRegionSpec } from "../../regionSpecs/linearRegionSpecs";
import { BoxDimensions, BoxRegionSpec } from "../../regionSpecs/boxRegionSpec";

/**
 * Builds a unified constraint handling uniqueness for each column in a board.
 * 
 * @param width Number of columns in the board to be tested.
 */
export function getBoardColumnConstraint(width: number): Constraint {
    let result: AndConstraint = new AndConstraint();
    for (let x = 0; x < width; x++) {
        let regionSpec = new ColumnRegionSpec(x);
        result.addConstraint(new UniqueValueConstraint(regionSpec));
    }
    return result;
}

/**
 * Builds a unified constraint handling uniqueness for each row in a board.
 * 
 * @param height Number of rows in the board to be tested.
 */
export function getBoardRowConstraint(height: number): Constraint {
    let result: AndConstraint = new AndConstraint();
    for (let y = 0; y < height; y++) {
        let regionSpec = new RowRegionSpec(y);
        result.addConstraint(new UniqueValueConstraint(regionSpec));
    }
    return result;
}

/**
 * Builds a unified constraint handling uniqueness for each box of the provided dimensions
 * that fit within the provided board.
 * 
 * NOTE: This function expects the regions to cover the entire board. If the width and height
 * are not chosen such that the board is evenly tiled by boxes, the test will always fail. To
 * prevent this, this function will throw an error if `boxWidth` does not divide `board.width`
 * and likewise if `boxHeight` does not divide `board.height`.
 * 
 * @param board Board matching the size to be tested by the constraint.
 * @param boxWidth Width of the individual boxes.
 * @param boxHeight Height of the individual boxes.
 */
export function getBoardBoxConstraint(board: Board, boxWidth: number, boxHeight: number): Constraint {
    if (board.width % boxWidth != 0) {
        throw new Error(`Invalid boxWidth; must divide board.width. Provided board width: ${board.width}; Provided boxWidth: ${boxWidth}`);
    }
    if (board.height % boxHeight != 0) {
        throw new Error(`Invalid boxHeight; must divide board.height. Provided board height: ${board.height}; Provided boxHeight: ${boxHeight}`);
    }

    let result = new AndConstraint();
    for (let startX = 0; startX < board.width; startX += boxWidth) {
        for (let startY = 0; startY < board.height; startY += boxHeight) {
            let dim: BoxDimensions = new BoxDimensions(startX, startY, boxWidth, boxHeight);
            let regionSpec = new BoxRegionSpec(dim);
            result.addConstraint(new UniqueValueConstraint(regionSpec));
        }
    }

    return result;
}

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