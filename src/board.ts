import { Position } from './geometry';

export class Board {
    public cells: number[][];
    public width: number;
    public height: number;

    /**
     * Builds a board with the specified positions.
     * 
     * @param width Width of the board.
     * @param height Height of the board. If unspecified, defaults to `width`.
     */
    constructor(width: number, height?: number) {
        this.width = width;
        if (height === undefined) {
            this.height = width;
        } else {
            this.height = height;
        }

        this.cells = new Array<Array<number>>(width);
        for (let x = 0; x < width; x++) {
            this.cells[x] = new Array<number>(height);
        }
    }

    /**
     * Returns a list of positions that lie on a specified column in the grid.
     * Returned array is guaranteed to have unique values, but there is no
     * guarantee on order.
     * 
     * @param x0 Index for the column to return positions for.
     */
    public getColumn(x0: number): Position[] {
        if (x0 < 0 || x0 >= this.width) {
            throw new Error(`Column index out of bounds: Board width: ${this.width}, given: ${x0}`);
        }

        let result = new Array<Position>(this.height);
        for (let y = 0; y < this.height; y++) {
            result[y] = [x0, y];
        }
        return result;
    }

    /**
     * Returns a list of positions that lie on a specified row in the grid.
     * Returned array is guaranteed to have unique values, but there is no
     * guarantee on order.
     * 
     * @param y0 Index for the row to return positions for.
     */
    public getRow(y0: number): Position[] {
        if (y0 < 0 || y0 >= this.height) {
            throw new Error(`Row index out of bounds: Board height: ${this.height}, given: ${y0}`);
        }

        let result = new Array<Position>(this.width);
        for (let x = 0; x < this.width; x++) {
            result[x] = [x, y0];
        }
        return result;
    }

    /**
     * Returns a list of positions that are adjacent, either orthogonally or
     * diagonally, from a specified starting position. Returned array guaranteed
     * to have unique values, but there is no guarantee on order.
     * 
     * @param startingPosition Position to find grid cells adjacent to. Does not
     * need to fall inside the grid; this allows searches from clues outside the
     * grid.
     */
    public getKingsMoveAdjacentPositions(startingPosition: Position): Position[] {
        let orthoAdj = this.getOrthoAdjacentPositions(startingPosition);
        let diagAdj = this.getDiagAdjacentPositions(startingPosition);
        return [...orthoAdj, ...diagAdj];
    }

    /**
     * Returns a list of positions that are orthogonally adjacent from a specified
     * starting position. Returned array guaranteed to have unique values, but
     * there is no guarantee on order.
     * 
     * @param startingPosition Position to find grid cells adjacent to. Does not
     * need to fall inside the grid; this allows searches from clues outside the
     * grid.
     */
    public getOrthoAdjacentPositions(startingPosition: Position): Position[] {
        let possiblePositions: Position[] = [
            [startingPosition[0] - 1, startingPosition[1]],
            [startingPosition[0] + 1, startingPosition[1]],
            [startingPosition[0],     startingPosition[1] - 1],
            [startingPosition[0],     startingPosition[1] + 1],
        ];

        return possiblePositions.filter(this.positionInsideGrid.bind(this));
    }

    /**
     * Returns a list of positions that are diagonally adjacent from a specified
     * starting position. Returned array guaranteed to have unique values, but
     * there is no guarantee on order.
     * 
     * @param startingPosition Position to find grid cells adjacent to. Does not
     * need to fall inside the grid; this allows searches from clues outside the
     * grid.
     */
    public getDiagAdjacentPositions(startingPosition: Position): Position[] {
        let possiblePositions: Position[] = [
            [startingPosition[0] - 1, startingPosition[1] - 1],
            [startingPosition[0] - 1, startingPosition[1] + 1],
            [startingPosition[0] + 1, startingPosition[1] - 1],
            [startingPosition[0] + 1, startingPosition[1] + 1],
        ]
        
        return possiblePositions.filter(this.positionInsideGrid.bind(this));
    }

    /**
     * Returns true if the specified position falls inside the grid.
     * 
     * @param position Position to test for being inside the grid.
     */
    public positionInsideGrid(position: Position): boolean {
        let xInside = position[0] >= 0 && position[0] < this.width;
        let yInside = position[1] >= 0 && position[1] < this.height;
        return xInside && yInside;
    }

    /**
     * Returns the value of a cell at a specified position.
     * If the position is outside the grid, an Error is thrown.
     * 
     * @param position Position to obtain cell value for.
     */
    public getValueForPosition(position: Position): number {
        if (!this.positionInsideGrid(position)) {
            throw new Error(`Index out of bounds: ${position[0]}, ${position[1]}`);
        }

        return this.cells[position[0]][position[1]];
    }

    /**
     * Returns the values of cells in each position in a specified region of the
     * grid. Order of values will match the order of positions in provided region.
     * 
     * If a position is outside the grid, an Error is thrown.
     * 
     * @param region Region of cells to obtain values for.
     */
    public getValuesForRegion(region: Position[]): number[] {
        return region
            .map((position) => this.cells[position[0]][position[1]]);
    }

    /**
     * Returns the values of all cells in the grid. The values will be ordered top-
     * to-bottom, then left-to-right.
     */
    public getAllValues(): number[] {
        return Array.prototype.concat(...this.cells);
    }
}