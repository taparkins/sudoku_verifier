import { Board } from "../../src/board";
import { ColumnRegionSpec, RowRegionSpec } from "../../src/regionSpecs/linearRegionSpecs";

describe('ColumnRegionSpec.getOrderedRegion()', () => {
    describe('Error cases', () => {
        test('Outside on the left', () => {
            let testBoard = new Board(3);
            let regionSpec = new ColumnRegionSpec(-1);
            expect(regionSpec.getOrderedRegion(testBoard)).toBe(undefined);
        });

        test('Outside on the right', () => {
            let testBoard = new Board(3);
            let regionSpec = new ColumnRegionSpec(3);
            expect(regionSpec.getOrderedRegion(testBoard)).toBe(undefined);
        });
    });

    describe('Happy path', () => {
        test('Left edge', () => {
            let testBoard = new Board(3);
            let regionSpec = new ColumnRegionSpec(0);
            expect(regionSpec.getOrderedRegion(testBoard)).toStrictEqual([
                [0, 0],
                [0, 1],
                [0, 2],
            ]);
        });

        test('Middle', () => {
            let testBoard = new Board(3);
            let regionSpec = new ColumnRegionSpec(1);
            expect(regionSpec.getOrderedRegion(testBoard)).toStrictEqual([
                [1, 0],
                [1, 1],
                [1, 2],
            ]);
        });

        test('Right edge', () => {
            let testBoard = new Board(3);
            let regionSpec = new ColumnRegionSpec(2);
            expect(regionSpec.getOrderedRegion(testBoard)).toStrictEqual([
                [2, 0],
                [2, 1],
                [2, 2],
            ]);
        });
    });
});

describe('RowRegionSpec.getOrderedRegion()', () => {
    describe('Error cases', () => {
        test('Outside above', () => {
            let testBoard = new Board(3);
            let regionSpec = new RowRegionSpec(-1);
            expect(regionSpec.getOrderedRegion(testBoard)).toBe(undefined);
        });

        test('Outside below', () => {
            let testBoard = new Board(3);
            let regionSpec = new RowRegionSpec(3);
            expect(regionSpec.getOrderedRegion(testBoard)).toBe(undefined);
        });
    });

    describe('Happy path', () => {
        test('Top edge', () => {
            let testBoard = new Board(3);
            let regionSpec = new RowRegionSpec(0);
            expect(regionSpec.getOrderedRegion(testBoard)).toStrictEqual([
                [0, 0],
                [1, 0],
                [2, 0],
            ]);
        });

        test('Middle', () => {
            let testBoard = new Board(3);
            let regionSpec = new RowRegionSpec(1);
            expect(regionSpec.getOrderedRegion(testBoard)).toStrictEqual([
                [0, 1],
                [1, 1],
                [2, 1],
            ]);
        });

        test('Bottom edge', () => {
            let testBoard = new Board(3);
            let regionSpec = new RowRegionSpec(2);
            expect(regionSpec.getOrderedRegion(testBoard)).toStrictEqual([
                [0, 2],
                [1, 2],
                [2, 2],
            ]);
        });
    });
});