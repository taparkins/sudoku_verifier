import { Position } from "../../src/geometry";
import { Board } from "../../src/board";
import { RegionSpec } from "../../src/regionSpecs/regionSpec";
import { UniqueValueConstraint } from "../../src/constraints/uniqueValueConstraint";

describe('UniqueValueConstraint.test()', () => {
    describe('Full Grid', () => {
        test('Valid', () => {
            let testBoard = new Board(2);
            testBoard.cells = [
                [1, 2],
                [3, 4],
            ];

            let regionSpec = new (class TestRegionSpec implements RegionSpec {
                public getRegion(board: Board): Position[] {
                    return [
                        [0, 0],
                        [0, 1],
                        [1, 0],
                        [1, 1],
                    ];
                }
            });
            let constraint = new UniqueValueConstraint(regionSpec);

            expect(constraint.test(testBoard)).toBe(true);
        });

        test ('Invalid', () => {
            let testBoard = new Board(2);
            testBoard.cells = [
                [1, 2],
                [2, 1],
            ];

            let regionSpec = new (class TestRegionSpec implements RegionSpec {
                public getRegion(board: Board): Position[] {
                    return [
                        [0, 0],
                        [0, 1],
                        [1, 0],
                        [1, 1],
                    ];
                }
            });
            let constraint = new UniqueValueConstraint(regionSpec);

            expect(constraint.test(testBoard)).toBe(false);
        });
    });

    describe('Jagged region', () => {
        test('Valid', () => {
            let testBoard = new Board(2);
            testBoard.cells = [
                [1, 2],
                [1, 1],
            ];

            let regionSpec = new (class TestRegionSpec implements RegionSpec {
                public getRegion(board: Board): Position[] {
                    return [
                        [0, 1],
                        [1, 0],
                    ];
                }
            });
            let constraint = new UniqueValueConstraint(regionSpec);

            expect(constraint.test(testBoard)).toBe(true);
        });

        test ('Invalid', () => {
            let testBoard = new Board(2);
            testBoard.cells = [
                [1, 2],
                [1, 1],
            ];

            let regionSpec = new (class TestRegionSpec implements RegionSpec {
                public getRegion(board: Board): Position[] {
                    return [
                        [1, 1],
                        [0, 0],
                    ];
                }
            });
            let constraint = new UniqueValueConstraint(regionSpec);

            expect(constraint.test(testBoard)).toBe(false);
        });
    })
});