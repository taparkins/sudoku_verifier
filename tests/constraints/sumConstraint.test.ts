import { Position } from "../../src/geometry";
import { Board } from "../../src/board";
import { RegionSpec } from "../../src/regionSpecs/regionSpec";
import { SumConstraint } from "../../src/constraints/sumConstraint";
import { ColumnRegionSpec } from "../../src/regionSpecs/linearRegionSpecs";

describe('SumConstraint.test()', () => {
    test('RegionSpec returns undefined', () => {
        let board = new Board(3);
            board.cells = [
                [1,2,3],
                [3,1,2],
                [2,3,1],
            ];

            let errorRegionSpec = new (class ErrorRegionSpec implements RegionSpec {
                getRegion(board: Board): Position[] {
                    return undefined;
                }
            });
            let constraint = new SumConstraint(errorRegionSpec, 0);

            expect(constraint.test(board)).toBe(false);
    });

    describe('Empty region', () => {
        test('Valid', () => {
            let board = new Board(3);
            board.cells = [
                [1,2,3],
                [3,1,2],
                [2,3,1],
            ];

            let emptyRegionSpec = new (class EmptyRegionSpec implements RegionSpec {
                getRegion(board: Board): Position[] {
                    return [];
                }
            });
            let constraint = new SumConstraint(emptyRegionSpec, 0);

            expect(constraint.test(board)).toBe(true);
        });

        test('Invalid', () => {
            let board = new Board(3);
            board.cells = [
                [1,2,3],
                [3,1,2],
                [2,3,1],
            ];

            let emptyRegionSpec = new (class EmptyRegionSpec implements RegionSpec {
                getRegion(board: Board): Position[] {
                    return [];
                }
            });
            let constraint = new SumConstraint(emptyRegionSpec, 1);

            expect(constraint.test(board)).toBe(false);
        });
    });

    describe('Singleton region', () => {
        test('Valid', () => {
            let board = new Board(3);
            board.cells = [
                [1,2,3],
                [3,1,2],
                [2,3,1],
            ];

            let singletonRegionSpec = new (class EmptyRegionSpec implements RegionSpec {
                getRegion(board: Board): Position[] {
                    return [[1,2]];
                }
            });
            let constraint = new SumConstraint(singletonRegionSpec, 2);

            expect(constraint.test(board)).toBe(true);
        });

        test('Invalid', () => {
            let board = new Board(3);
            board.cells = [
                [1,2,3],
                [3,1,2],
                [2,3,1],
            ];

            let singletonRegionSpec = new (class EmptyRegionSpec implements RegionSpec {
                getRegion(board: Board): Position[] {
                    return [[1,2]];
                }
            });
            let constraint = new SumConstraint(singletonRegionSpec, 3);

            expect(constraint.test(board)).toBe(false);
        });
    });

    describe('Multiple cell region', () => {
        test('Valid', () => {
            let board = new Board(3);
            board.cells = [
                [1,2,3],
                [3,1,2],
                [2,3,1],
            ];

            let regionSpec = new ColumnRegionSpec(1);
            let constraint = new SumConstraint(regionSpec, 6);

            expect(constraint.test(board)).toBe(true);
        });

        test('Invalid', () => {
            let board = new Board(3);
            board.cells = [
                [1,2,3],
                [3,1,2],
                [2,3,1],
            ];

            let regionSpec = new ColumnRegionSpec(1);
            let constraint = new SumConstraint(regionSpec, 3);

            expect(constraint.test(board)).toBe(false);
        });
    });
});