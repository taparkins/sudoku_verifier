import { Position } from "../geometry";
import { Board } from "../board";

/**
 * A RegionSpec is a generic mechanism for finding a group of
 * cells on a board, and obtaining the Positions that compose
 * that region.
 */
export interface RegionSpec {
    /**
     * Selects each Position for the region defined by this spec,
     * and returns an unordered set containing those Positions.
     * Undefined may be returned if the spec is unable to compute
     * a valid region for the provided board.
     * 
     * Although this function returns a Position[], this should
     * be treated as an unordered collection of Positions. A list
     * type is preferred here only because Set<Position> does not
     * properly enforce uniqueness of tuples (the underlying type
     * for Position).
     * 
     * @param board A filled board to use as a template for the
     * specified region. Returned Positions will be contained in
     * this board's grid.
     */
    getRegion(board: Board): Position[] | undefined;
}

/**
 * An OrderedRegionSpec is exactly like a RegionSpec, except that
 * the conceptual region has an ordering to it (such as a path)
 * which allows the user to treat the region as an ordered list for
 * further logic.
 */
export abstract class OrderedRegionSpec implements RegionSpec {
    /**
     * Selects each Position for the region defined by this spec,
     * and returns an ordered list containing those Positions.
     * Undefined may be returned if the spec is unable to compute
     * a valid region for the provided board.
     * 
     * @param board A filled board to use as a template for the
     * specified region. Returned Positions will be contained in
     * this board's grid.
     */
    public abstract getOrderedRegion(board: Board): Position[] | undefined;

    public getRegion(board: Board): Position[] | undefined {
        return this.getOrderedRegion(board);
    }
}