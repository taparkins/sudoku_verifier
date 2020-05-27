import { Board, Position } from "../../board";
import { UniqueValueConstraint } from "../uniqueValueConstraint";
import { Constraint } from "../constraint";
import { AndConstraint } from "../andConstraint";

/**
 * Represents a constraint enforcing a specified row in the board
 * must have unique values.
 */
export class UniqueRowConstraint extends UniqueValueConstraint {
    private y: number;

    constructor(y: number) {
       super();
       this.y = y;
    }

    public getTestRegion(board: Board): Position[] {
        return board.getRow(this.y);
    }
}

/**
 * Builds a unified constraint handling uniqueness for each column in a board.
 * 
 * @param height Number of columns in the board to be tested.
 */
export function getBoardRowConstraint(height: number): Constraint {
    let result: AndConstraint = new AndConstraint();
    for (let y = 0; y < height; y++) {
        result.addConstraint(new UniqueRowConstraint(y));
    }
    return result;
}