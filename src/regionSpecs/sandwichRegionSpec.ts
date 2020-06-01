import { Position } from "../geometry";
import { OrderedRegionSpec } from "./regionSpec";
import { Board } from "../board";

/**
 * A SandwichRegionSpec searches a parent Ordered Region for cells falling between
 * two "crust values" for a Sandwich constraint. That is, given a string of positions
 * in a grid, this region spec will return the subregion between the two positions
 * that point to the crust values.
 * 
 * Traditionally the crusts are the maximum and minimum values of a puzzle (e.g. 1
 * and 9 for a 9x9 sudoku), but this is not required for more generic puzzles.
 * 
 * For a Sandwich Region to be well defined, each crust value must appear EXACTLY
 * once in the parent region. If either crust value is missing, or appears multiple
 * times, this will return undefined when requested for the subregion.
 */
export class SandwichRegionSpec extends OrderedRegionSpec {
    private parentRegionSpec: OrderedRegionSpec;
    private crustValues: [number, number];
    constructor(parentRegionSpec: OrderedRegionSpec, crustValues: [number, number]) {
        super();
        this.parentRegionSpec = parentRegionSpec;
        this.crustValues = crustValues;
    }

    public getOrderedRegion(board: Board): Position[] | undefined {
        let baseRegion = this.parentRegionSpec.getOrderedRegion(board);
        if (baseRegion === undefined) {
            return undefined;
        }

        let cellValues = board.getValuesForRegion(baseRegion);
        let crustIndices = this.getCrustIndices(cellValues);
        if (crustIndices === undefined) {
            return undefined;
        }

        return baseRegion.slice(crustIndices[0] + 1, crustIndices[1]);
    }

    /**
     * Helper function to find the "crusts" of a sandwich. These are identified
     * by specific values, defined on construction of the constraint. Returns
     * undefined if a crust value is missing, or repeated in the list.
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