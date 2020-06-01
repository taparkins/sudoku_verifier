import { Position } from "../geometry";
import { Board } from "../board";
import { RegionSpec } from "./regionSpec";

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
        return this.startX + this.width - 1;
    }

    public endY(): number {
        return this.startY + this.height - 1;
    }
}

/**
 * A BoxRegionSpec builds a rectangular sub-region of a board.
 */
export class BoxRegionSpec implements RegionSpec {
    protected dim: BoxDimensions;
    public constructor(dim: BoxDimensions) {
        this.dim = dim;
    }

    /**
     * Obtains the sub-region of a Board contained within the dimensions held by this
     * region spec. If the dimensions fall outside the board, undefined is returned.
     * 
     * @param board Board to obtain a box region from.
     */
    public getRegion(board: Board): Position[] {
        let startPosition: Position = [ this.dim.startX, this.dim.startY ];
        let endPosition: Position = [ this.dim.endX(), this.dim.endY() ];
        if (!(board.positionInsideGrid(startPosition) && board.positionInsideGrid(endPosition))) {
            return undefined;
        }

        let result: Position[] = [];
        for (let x = this.dim.startX; x < this.dim.endX() + 1; x++) {
            for (let y = this.dim.startY; y < this.dim.endY() + 1; y++) {
                result.push([x, y]);
            }
        }

        return result;
    }
}