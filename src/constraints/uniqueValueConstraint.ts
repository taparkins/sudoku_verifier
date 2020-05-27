import { Constraint } from "./constraint";
import { Board, Position } from "../board";

/**
 * Represents a generic constraint that confirms the values of every cell
 * inside a specified region of the board are unique. The specific region
 * is to be defined by the subclass via the getTestRegion function.
 */
export abstract class UniqueValueConstraint implements Constraint {
    /**
     * Returns a region of positions to test for the provided board.
     * 
     * @param board Board that constraints are being tested against.
     */
    public abstract getTestRegion(board: Board): Position[];

    test(board: Board): boolean {
        let testRegion: Position[] = this.getTestRegion(board);
        let cellValues: number[] = board.getValuesForRegion(testRegion);
        let uniqueValues: Set<number> = new Set<number>(cellValues);
        return cellValues.length === uniqueValues.size;
    }
}