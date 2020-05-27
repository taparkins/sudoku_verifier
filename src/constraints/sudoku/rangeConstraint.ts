import { Constraint } from "../constraint";
import { Board } from "../../board";

/**
 * Represents a constraint requiring every provided value in a board to fall within
 * a provided range.
 */
export class RangeConstraint implements Constraint {
    protected min: number;
    protected max: number;
    constructor(min: number, max: number) {
        this.min = min;
        this.max = max;
    }

    test(board: Board): boolean {
        let uniqueValues: number[] = [...new Set<number>(board.getAllValues())];
        let violatorCell = uniqueValues.find((value) => value < this.min || value > this.max);
        return violatorCell === undefined;
    }
}