import { Constraint } from "../constraint";
import { Board } from "../../board";
import { Position, MoveInDirection, Direction } from "../../geometry";

/**
 * Represents a "Thermometer" constraint.
 * 
 * Thermometers begin with a bulb at a specified location on the grid, then
 * trace a path across kings-move adjacent cells. Values along the thermometer
 * must STRICTLY increase.
 */
export class ThermoConstraint implements Constraint {
    private thermoPath: Position[];
    
    /**
     * Constructs a new ThermoConstraint with a bulb at the specified location,
     * and tracing a path by traveling stepwise in the specified Directions.
     * 
     * NOTE: The path must be non-empty, and must never cross the same grid
     * cell twice. If either of these cases happen, an Error is thrown.
     * 
     * Furthermore, the entire thermometer must lie within the board to be
     * tested. If the path passes outside the board, an Error will be thrown
     * during the test.
     * 
     * @param bulbPosition Starting position of the thermometer.
     * @param thermoPath Direction steps to trace the path of the thermometer.
     *                   Must be non-empty.
     */
    constructor(bulbPosition: Position, thermoPath: Direction[]) {
        if (thermoPath.length === 0) {
            throw new Error(`Thermometer constructed with an empty path at position ${bulbPosition[0]};${bulbPosition[1]}`);
        }

        this.thermoPath = buildPath(bulbPosition, thermoPath);
        assertPathDoesNotRepeatSquare(this.thermoPath);
    }

    test(board: Board): boolean {
        let thermoValues: number[] = board.getValuesForRegion(this.thermoPath);
        let curValue = thermoValues[0];
        for (let i = 1; i < thermoValues.length; i++) {
            let nextValue = thermoValues[i];
            if (curValue >= nextValue) {
                return false;
            }
            curValue = nextValue;
        }
        return true;
    }
    
}

function buildPath(startingPosition: Position, path: Direction[]): Position[] {
    let resultPath: Position[] = [ startingPosition ];
    let currentPosition = startingPosition;
    path.forEach((direction) => {
        currentPosition = MoveInDirection(currentPosition, direction);
        resultPath.push(currentPosition);
    });
    return resultPath;
}

/**
 * Confirm a provided thermometer path does not repeat the same space.
 * 
 * Motiviation: While it is very possible for two separate thermometers to cross at a shared grid
 * point, it is not well-defined for a single thermometer to reuse a position along its path. It
 * is worth noting, however, that this is NOT the same as preventing a path from self-intersecting.
 * For example, we would like to permit the following path, which forms a kind of "alpha" shape:
 *   [
 *     [3, 3],
 *     [2, 4],
 *     [2, 3],
 *     [3, 4], // segment connecting first two points is crossed with this movement
 *   ]
 * 
 * @param path Thermometer path to test.
 */
function assertPathDoesNotRepeatSquare(path: Position[]): void {
    let pathStringParts = path.map((position) => `${position[0]};${position[1]}`);

    // Use pathStringParts instead of path directly because Set doesn't handle Tuples as we want
    let pathSet = new Set(pathStringParts);
    if (path.length !== pathSet.size) {
        let pathString = pathStringParts.join(' -> ');
        throw new Error(`Path self intersects: ${pathString}`);
    }
}