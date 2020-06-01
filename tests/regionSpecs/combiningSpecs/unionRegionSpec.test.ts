import { Position } from "../../../src/geometry";
import { Board } from "../../../src/board";
import { BoxDimensions, BoxRegionSpec } from "../../../src/regionSpecs/boxRegionSpec";
import { ColumnRegionSpec, RowRegionSpec } from "../../../src/regionSpecs/linearRegionSpecs";
import { UnionRegionSpec } from "../../../src/regionSpecs/combiningSpecs/unionRegionSpec";
import { RegionSpec } from "../../../src/regionSpecs/regionSpec";
import { expectArraySameIgnoringOrder } from "../../testHelpers";

describe('UnionRegionSpec.getRegion()', () => {
    test('Error in one region', () => {
        let board = new Board(5);
        
        let baseRegionSpec1 = new ColumnRegionSpec(1);
        let baseRegionSpec2 = new RowRegionSpec(1);
        let errorRegionSpec = new (class ErrorRegionSpec implements RegionSpec {
            getRegion(board: Board): Position[] | undefined {
                return undefined;
            }
        });

        let testRegionSpec = new UnionRegionSpec([baseRegionSpec1, baseRegionSpec2, errorRegionSpec]);
        expect(testRegionSpec.getRegion(board)).toBe(undefined);
    });

    test('Empty region and non-empty region', () => {
        let board = new Board(5);
        
        let baseRegionSpec = new ColumnRegionSpec(1);
        let emptyRegionSpec = new (class EmptyRegionSpec implements RegionSpec {
            getRegion(board: Board): Position[] | undefined {
                return [];
            }
        });

        let testRegionSpec = new UnionRegionSpec([baseRegionSpec, emptyRegionSpec]);

        let actualRegion = testRegionSpec.getRegion(board);
        let expectedRegion = baseRegionSpec.getRegion(board);
        expectArraySameIgnoringOrder(actualRegion, expectedRegion);
    });

    test('Region and proper subset', () => {
        let board = new Board(5);
        
        let baseDimensions = new BoxDimensions(1, 1, 3, 3);
        let baseRegionSpec = new BoxRegionSpec(baseDimensions);

        let subDimensions = new BoxDimensions(2, 1, 1, 2);
        let subRegionSpec = new BoxRegionSpec(subDimensions);

        let testRegionSpec = new UnionRegionSpec([baseRegionSpec, subRegionSpec]);

        let actualRegion = testRegionSpec.getRegion(board);
        let expectedRegion = baseRegionSpec.getRegion(board);
        expectArraySameIgnoringOrder(actualRegion, expectedRegion);
    });

    test('Disjoint regions', () => {
        let board = new Board(5);
        
        let baseDimensions1 = new BoxDimensions(1, 1, 3, 3);
        let baseRegionSpec1 = new BoxRegionSpec(baseDimensions1);

        let baseDimensions2 = new BoxDimensions(0, 0, 3, 1);
        let baseRegionSpec2 = new BoxRegionSpec(baseDimensions2);

        let testRegionSpec = new UnionRegionSpec([baseRegionSpec1, baseRegionSpec2]);

        let actualRegion = testRegionSpec.getRegion(board);
        let expectedRegion = baseRegionSpec1.getRegion(board).concat(baseRegionSpec2.getRegion(board));
        expectArraySameIgnoringOrder(actualRegion, expectedRegion);
    });

    test('Overlapping regions', () => {
        let board = new Board(5);
        
        let baseDimensions1 = new BoxDimensions(1, 1, 2, 2);
        let baseRegionSpec1 = new BoxRegionSpec(baseDimensions1);

        let baseDimensions2 = new BoxDimensions(0, 0, 2, 2);
        let baseRegionSpec2 = new BoxRegionSpec(baseDimensions2);

        let testRegionSpec = new UnionRegionSpec([baseRegionSpec1, baseRegionSpec2]);

        let actualRegion = testRegionSpec.getRegion(board);
        let expectedRegion = [
            [0, 0],
            [0, 1],
            [1, 0],
            [1, 1],
            [1, 2],
            [2, 1],
            [2, 2],
        ];
        expectArraySameIgnoringOrder(actualRegion, expectedRegion);
    });
});