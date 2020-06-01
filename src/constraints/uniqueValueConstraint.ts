import { Constraint } from "./constraint";
import { Board } from "../board";
import { RegionSpec } from "../regionSpecs/regionSpec";

/**
 * Represents a generic constraint that confirms the values of every cell
 * inside a region of the board are unique. The region will be obtained
 * via a RegionSpec run against the tested board.
 */
export class UniqueValueConstraint implements Constraint {
    private regionSpec: RegionSpec;
    constructor(regionSpec: RegionSpec) {
        this.regionSpec = regionSpec;
    }

    public test(board: Board): boolean {
        let testRegion = this.regionSpec.getRegion(board);
        if (testRegion === undefined) {
            return false;
        }

        let cellValues: number[] = board.getValuesForRegion(testRegion);
        let uniqueValues: Set<number> = new Set<number>(cellValues);
        return cellValues.length === uniqueValues.size;
    }
}