import { Position } from "../geometry";
import { OrderedRegionSpec } from "./regionSpec";
import { Board } from "../board";

/**
 * A ColumnRegionSpec builds a subregion of a Board by querying for a
 * specified column of the grid.
 * 
 * This region is considered ordered, but the order is bidirectional.
 * That is to say, if the list of positions is reversed, the result
 * should be considered identical.
 */
export class ColumnRegionSpec extends OrderedRegionSpec {
    private index: number;
    constructor(index: number) {
        super();
        this.index = index;
    }

    /**
     * Returns the column of the board for the specified index. If the
     * index falls outside the board, undefined is returned.
     * 
     * @param board Board to obtain a column from.
     */
    public getOrderedRegion(board: Board): Position[] {
        if (this.index < 0 || this.index >= board.width) {
            return undefined;
        }
        
        return board.getColumn(this.index);
    }
}

/**
 * A RowRegionSpec builds a subregion of a Board by querying for a
 * specified row of the grid.
 * 
 * This region is considered ordered, but the order is bidirectional.
 * That is to say, if the list of positions is reversed, the result
 * should be considered identical.
 */
export class RowRegionSpec extends OrderedRegionSpec {
    private index: number;
    constructor(index: number) {
        super();
        this.index = index;
    }

    /**
     * Returns the row of the board for the specified index. If the
     * index falls outside the board, undefined is returned.
     * 
     * @param board Board to obtain a row from.
     */
    public getOrderedRegion(board: Board): Position[] {
        if (this.index < 0 || this.index >= board.height) {
            return undefined;
        }

        return board.getRow(this.index);
    }
}