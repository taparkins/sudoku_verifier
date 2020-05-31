import { Position } from "../geometry";
import { Constraint } from "./constraint";
import { Board } from "../board";

/**
 * Represents a generic constraint that enforces the values inside
 * a specified region of the board sum to an expected quantity. The
 * specific region will be defined by the subclass by implementing
 * the getTestRegion function.
 */
export abstract class SumConstraint implements Constraint {
    protected expectedSum: number;
    constructor(expectedSum: number) {
        this.expectedSum = expectedSum;
    }

    /**
     * Returns a region of positions to test for the provided board.
     * An undefined value can be returned to indicate the region was
     * not able to be constructed due to the inputs of the board, so
     * the constraint test should return false.
     * 
     * @param board Board that constraints are being tested against.
     */
    public abstract getTestRegion(board: Board): Position[] | undefined;

    public test(board: Board): boolean {
        let testRegion = this.getTestRegion(board);
        if (testRegion === undefined) {
            return false;
        }

        let sum: number = board.getValuesForRegion(testRegion)
                               .reduce((a, b) => a + b, 0);
        return sum === this.expectedSum;
    }   
}