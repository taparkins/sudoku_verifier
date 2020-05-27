import { Board, Position } from "../../board";
import { UniqueValueConstraint } from "../uniqueValueConstraint";
import { AndConstraint } from "../andConstraint";
import { Constraint } from "../constraint";

/**
 * Represents a constraint enforcing a specified column in the board
 * must have unique values.
 */
export class UniqueColumnConstraint extends UniqueValueConstraint {
    private x: number;

    constructor(x: number) {
       super();
       this.x = x;
    }

    public getTestRegion(board: Board): Position[] {
        return board.getColumn(this.x);
    }
}

/**
 * Builds a unified constraint handling uniqueness for each column in a board.
 * 
 * @param width Number of columns in the board to be tested.
 */
export function getBoardColumnConstraint(width: number): Constraint {
    let result: AndConstraint = new AndConstraint();
    for (let x = 0; x < width; x++) {
        result.addConstraint(new UniqueColumnConstraint(x));
    }
    return result;
}