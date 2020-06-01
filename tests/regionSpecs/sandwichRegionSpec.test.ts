import { Position } from "../../src/geometry";
import { Board } from "../../src/board";
import { SandwichRegionSpec } from "../../src/regionSpecs/sandwichRegionSpec";
import { ColumnRegionSpec } from "../../src/regionSpecs/linearRegionSpecs";
import { OrderedRegionSpec } from "../../src/regionSpecs/regionSpec";

describe('SandwichRegionSpec.getOrderedRegion()', () => {
    describe('Error cases', () => {
        test('Both crusts missing', () => {
            let testBoard = new Board(5);
            testBoard.cells = [
                [0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0],
                [3, 3, 3, 3, 3],
                [0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0],
            ];

            let parentSpec = new ColumnRegionSpec(2);
            let regionSpec = new SandwichRegionSpec(parentSpec, [1, 5]);
            expect(regionSpec.getOrderedRegion(testBoard)).toBe(undefined);
        });

        test('One crust missing', () => {
            let testBoard = new Board(5);
            testBoard.cells = [
                [0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0],
                [1, 3, 3, 3, 3],
                [0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0],
            ];

            let parentSpec = new ColumnRegionSpec(2);
            let regionSpec = new SandwichRegionSpec(parentSpec, [1, 5]);
            expect(regionSpec.getOrderedRegion(testBoard)).toBe(undefined);
        });

        test('Repeated crust', () => {
            let testBoard = new Board(5);
            testBoard.cells = [
                [0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0],
                [1, 3, 1, 5, 3],
                [0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0],
            ];

            let parentSpec = new ColumnRegionSpec(2);
            let regionSpec = new SandwichRegionSpec(parentSpec, [1, 5]);
            expect(regionSpec.getOrderedRegion(testBoard)).toBe(undefined);
        });

        test('Empty parent region', () => {
            let testBoard = new Board(5);
            testBoard.cells = [
                [0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0],
                [3, 3, 3, 3, 3],
                [0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0],
            ];

            let parentSpec = new (class EmptyRegion extends OrderedRegionSpec {
                public getOrderedRegion(board: Board): Position[] | undefined {
                    return [];
                }
            });
            let regionSpec = new SandwichRegionSpec(parentSpec, [1, 5]);
            expect(regionSpec.getOrderedRegion(testBoard)).toBe(undefined);
        });

        test('Parent region that encountered an error', () => {
            let testBoard = new Board(5);
            testBoard.cells = [
                [0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0],
                [3, 3, 3, 3, 3],
                [0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0],
            ];

            let parentSpec = new (class ErrorRegion extends OrderedRegionSpec {
                public getOrderedRegion(board: Board): Position[] | undefined {
                    return undefined;
                }
            });
            let regionSpec = new SandwichRegionSpec(parentSpec, [1, 5]);
            expect(regionSpec.getOrderedRegion(testBoard)).toBe(undefined);
        });
    });

    describe('Happy path', () => {
        test('(Nearly) Full subregion', () => {
            let testBoard = new Board(5);
            testBoard.cells = [
                [0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0],
                [1, 3, 2, 4, 5],
                [0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0],
            ];

            let parentSpec = new ColumnRegionSpec(2);
            let regionSpec = new SandwichRegionSpec(parentSpec, [1, 5]);
            expect(regionSpec.getOrderedRegion(testBoard)).toStrictEqual([
                [2, 1],
                [2, 2],
                [2, 3],
            ]);
        });

        test('Partial subregion', () => {
            let testBoard = new Board(5);
            testBoard.cells = [
                [0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0],
                [4, 1, 2, 5, 3],
                [0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0],
            ];

            let parentSpec = new ColumnRegionSpec(2);
            let regionSpec = new SandwichRegionSpec(parentSpec, [1, 5]);
            expect(regionSpec.getOrderedRegion(testBoard)).toStrictEqual([
                [2, 2],
            ]);
        });

        test('Empty region between crusts', () => {
            let testBoard = new Board(5);
            testBoard.cells = [
                [0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0],
                [1, 5, 2, 4, 3],
                [0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0],
            ];

            let parentSpec = new ColumnRegionSpec(2);
            let regionSpec = new SandwichRegionSpec(parentSpec, [1, 5]);
            expect(regionSpec.getOrderedRegion(testBoard)).toStrictEqual([]);
        });
    });
});