/**
 * Represents a specific position in a grid.
 */
export type Position = [number, number];

/**
 * Represents a movement from one position to another in a grid.
 */
export type Movement = [number, number];

/**
 * Constant movements of one square on a grid
 */
export enum Direction {
    Up = 1,
    Down = 2,
    Left = 4,
    Right = 8,
    UpLeft = 5,
    UpRight = 9,
    DownLeft = 6,
    DownRight = 10,
}

/**
 * Converts a Direction enum value into a Movement vector.
 * 
 * @param direction Direction enum value to convert.
 */
export function DirectionToMovement(direction: Direction): Movement {
    let dirValue: number = direction.valueOf();
    let x: number = 0;
    let y: number = 0;

    if ((dirValue & 1) == 1) {
        y = -1;
    }
    dirValue >>= 1;

    if ((dirValue & 1) == 1) {
        y = 1;
    }
    dirValue >>= 1;

    if ((dirValue & 1) == 1) {
        x = -1;
    }
    dirValue >>= 1;

    if ((dirValue & 1) == 1) {
        x = 1;
    }

    return [x, y];
}

/**
 * Moves from a starting position one grid unit in the specified direction.
 * 
 * @param startPosition Position before movement is applied.
 * @param direction Direction of movement.
 */
export function MoveInDirection(startPosition: Position, direction: Direction): Position {
    return ApplyMovement(startPosition, DirectionToMovement(direction));
}

/**
 * Moves from a starting position by a given vector to a new position.
 * 
 * @param startPosition Position before movement is applied.
 * @param movement Vector representation of movement.
 */
export function ApplyMovement(startPosition: Position, movement: Movement): Position {
    return [startPosition[0] + movement[0], startPosition[1] + movement[1]];
}