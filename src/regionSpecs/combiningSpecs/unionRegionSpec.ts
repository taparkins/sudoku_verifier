import { Position } from "../../geometry";
import { RegionSpec } from "../regionSpec";
import { Board } from "../../board";

/**
 * A UnionRegionSpec combines a collection of RegionSpecs to obtain the region
 * spanning their shared area.
 */
export class UnionRegionSpec implements RegionSpec {
    private baseSpecs: RegionSpec[];
    constructor(baseSpecs: RegionSpec[]) {
        this.baseSpecs = baseSpecs;
    }

    public addBaseSpec(baseSpec: RegionSpec) {
        this.baseSpecs.push(baseSpec);
    }

    getRegion(board: Board): Position[] {
        let baseRegions = this.baseSpecs.map((baseSpec) => baseSpec.getRegion(board));
        if (baseRegions.indexOf(undefined) >= 0) {
            return undefined;
        }

        let stringifiedRegion: Set<string> = new Set<string>();
        baseRegions
            .reduce((accumulator, curRegion) => accumulator.concat(curRegion), [])
            .map(UnionRegionSpec.stringifyPosition)
            .forEach(stringifiedRegion.add.bind(stringifiedRegion));

        return Array.from(stringifiedRegion)
            .map(UnionRegionSpec.parseStringifiedPosition);
    }

    /**
     * Because Set doesn't properly filter for uniqueness of tuples, we will
     * first serialize our positions into strings. This function does that step.
     * 
     * @param position Position to serialize.
     */
    private static stringifyPosition(position: Position): string {
        return `${position[0]},${position[1]}`;
    }

    /**
     * Because Set doesn't properly filter for uniqueness of tuples, we instead
     * filter serialized forms. This function deserializes after filtering is done.
     * 
     * It's worth noting that this function does not handle any parsing errors. It's
     * assumed to be safe, because it is private and only used in parity with the
     * serialization partner. If this changes, please be sure to add error handling.
     * 
     * @param stringifiedPosition Serialized position to deserialize.
     */
    private static parseStringifiedPosition(stringifiedPosition: string): Position {
        let positionParts = stringifiedPosition.split(',');
        return [ parseInt(positionParts[0]), parseInt(positionParts[1]) ];
    }
}