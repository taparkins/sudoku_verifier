
import { UniqueValueConstraint } from "../uniqueValueConstraint";
import { Board, Position } from "../../board";
import { AndConstraint } from "../andConstraint";
import { Constraint } from "../constraint";

/**
 * Static type used to represent dimensions of a box used by the BoxConstraint.
 */
export class BoxDimensions {
    public startX: number;
    public startY: number;
    public width: number;
    public height: number;

    public constructor(startX: number, startY: number, width: number, height: number) {
        this.startX = startX;
        this.startY = startY;
        this.width = width;
        this.height = height;
    }

    public endX(): number {
        return this.startX + this.width;
    }

    public endY(): number {
        return this.startY + this.height;
    }
}

/**
 * Represents a constraint that requires each cell within a rectangular box region
 * has a unique value.
 * 
 * NOTE: If the provided box dimensions do not fall within the tested board, an
 * Error will be thrown.
 */
export class UniqueBoxConstraint extends UniqueValueConstraint {
    protected dim: BoxDimensions;
    public constructor(dim: BoxDimensions) {
        super();
        this.dim = dim;
    }

    public getTestRegion(board: Board): Position[] {
        let result: Position[] = [];

        for (let x = this.dim.startX; x < this.dim.endX(); x++) {
            for (let y = this.dim.startY; y < this.dim.endY(); y++) {
                result.push([x, y]);
            }
        }

        return result;
    }
}

/**
 * Builds a unified constraint handling uniqueness for each box of the provided dimensions
 * that fit within the provided board.
 * 
 * NOTE: This function expects the regions to cover the entire board. If the width and height
 * are not chosen such that the board is evenly tiled by boxes, an Error will be thrown. To
 * prevent this, ensure that `boxWidth` divides `board.width` and likewise `boxHeight` divides
 * `board.height`.
 * 
 * @param board Board matching the size to be tested by the constraint.
 * @param boxWidth Width of the individual boxes.
 * @param boxHeight Height of the individual boxes.
 */
export function getBoardBoxConstraint(board: Board, boxWidth: number, boxHeight: number): Constraint {
    if (board.width % boxWidth != 0) {
        throw new Error(`Invalid boxWidth; must divide board.width. Provided board width: ${board.width}; Provided boxWidth: ${boxWidth}`);
    }
    if (board.height % boxHeight != 0) {
        throw new Error(`Invalid boxHeight; must divide board.height. Provided board height: ${board.height}; Provided boxHeight: ${boxHeight}`);
    }

    let result = new AndConstraint();
    for (let startX = 0; startX < board.width; startX += boxWidth) {
        for (let startY = 0; startY < board.height; startY += boxHeight) {
            let dim: BoxDimensions = new BoxDimensions(startX, startY, boxWidth, boxHeight);
            result.addConstraint(new UniqueBoxConstraint(dim))
        }
    }

    return result;
}
