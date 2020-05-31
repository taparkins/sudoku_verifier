import { Orientation, Position } from "../../geometry";
import { SumConstraint } from "../sumConstraint";
import { Board } from "../../board";

/**
 * Represents a "Sandwich" Constraint.
 * 
 * Sandwiches are a kind of SumConstraint, where the summed region is found
 * by finding cells falling between two specified "crust values". So, for
 * example, if 1 and 9 are the crust values, the following row would give a
 * clue sum of 20:
 * 
 *   2 1 3 4 5 8 9 6 7        // Starting row
 *   2 <1> 3 4 5 8 <9> 6 7    // Crusts at indices 1 and 6
 *   3 + 4 + 5 + 8 = 20       // Sum values between the found indices
 * 
 * Traditionally, the crust values are the smallest and largest values
 * possible in the puzzle (so 1 and 9 for the case of a classic sudoku).
 * However, this is not strictly necessary. As long as the expected values
 * appear exactly once within the region, 
 */
export class SandwichConstraint extends SumConstraint {
    private orientation: Orientation;
    private crustValues: [number, number];
    private index: number;

    constructor(
            orientation: Orientation,
            crustValues: [number, number],
            index: number,
            expectedSum: number) {
        super(expectedSum);
        this.orientation = orientation;
        this.crustValues = crustValues;
        this.index = index;
    }
    
    public getTestRegion(board: Board): Position[] {
        let region: Position[] = this.getRegionForOrientation(board);
        let cellValues = board.getValuesForRegion(region);
        let crustIndices = this.getCrustIndices(cellValues);
        if (crustIndices === undefined) {
            return undefined;
        }
        return region.slice(crustIndices[0] + 1, crustIndices[1]);
    }

    private getRegionForOrientation(board: Board) {
        switch (this.orientation) {
            case Orientation.Horizontal:
                return board.getRow(this.index);
            case Orientation.Vertical:
                return board.getColumn(this.index);
            default:
                throw new Error(`Unknown orientation provided for Sandwich Constraint: ${this.orientation}`);
        }
    }

    /**
     * Helper function to find the "crusts" of a sandwich. These are identified
     * by specific values, defined on construction of the constraint.
     * 
     * In order to be well defined, the crust values must each appear EXACTLY
     * once. However, in a generic puzzle there may not be another constraint
     * that requires this to happen. So, to compensate, this function may return
     * undefined, which indicates that there was either a missing crust, or one
     * of the crusts was not unique.
     * 
     * @param regionValues Cell values to scan for sandwich crusts. Required to
     * be in the proper order to identify which values lie between the crusts.
     */
    private getCrustIndices(regionValues: number[]): [number, number] | undefined {
        let indices: [number, number] = [-1, -1];
        for (let i = 0; i < regionValues.length; i++) {
            let curValue = regionValues[i];
            
            if (curValue === this.crustValues[0]) {
                if (indices[0] === -1) {
                    indices[0] = i;
                } else {
                    return undefined;
                }
            }

            if (curValue === this.crustValues[1]) {
                if (indices[1] === -1) {
                    indices[1] = i;
                } else {
                    return undefined;
                }
            }
        }

        if (indices[0] === -1 || indices[1] === -1) {
            return undefined;
        }

        return [
            Math.min(indices[0], indices[1]),
            Math.max(indices[0], indices[1]),
        ];
    }
}