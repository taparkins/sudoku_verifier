import { Position } from "../geometry";
import { Constraint } from "./constraint";
import { Board } from "../board";
import { RegionSpec } from "../regionSpecs/regionSpec";

/**
 * Represents a generic constraint that enforces the values inside
 * a region of the board sum to an expected quantity. The region will
 * be obtained via a RegionSpec object run against the tested board.
 */
export class SumConstraint implements Constraint {
    private regionSpec: RegionSpec;
    private expectedSum: number;
    constructor(regionSpec: RegionSpec, expectedSum: number) {
        this.regionSpec = regionSpec;
        this.expectedSum = expectedSum;
    }

    public test(board: Board): boolean {
        let testRegion = this.regionSpec.getRegion(board);
        if (testRegion === undefined) {
            return false;
        }

        let sum: number = board.getValuesForRegion(testRegion)
                               .reduce((a, b) => a + b, 0);
        return sum === this.expectedSum;
    }   
}