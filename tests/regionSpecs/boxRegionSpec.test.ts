import { Board } from "../../src/board";
import { BoxDimensions, BoxRegionSpec } from "../../src/regionSpecs/boxRegionSpec";
import { expectArraySameIgnoringOrder } from "../testHelpers";

describe('BoxRegionSpec.getRegion()', () => {
    describe('Error cases', () => {
        describe('Box falls outside the board grid', () => {
            test('Left side', () => {
                let testBoard = new Board(5);
                let dimensions = new BoxDimensions(-1, 1, 3, 3);
                let boxRegionSpec = new BoxRegionSpec(dimensions);
                expect(boxRegionSpec.getRegion(testBoard)).toBe(undefined);
            });

            test('Top side', () => {
                let testBoard = new Board(5);
                let dimensions = new BoxDimensions(1, -1, 3, 3);
                let boxRegionSpec = new BoxRegionSpec(dimensions);
                expect(boxRegionSpec.getRegion(testBoard)).toBe(undefined);
            });

            test('Right side', () => {
                let testBoard = new Board(5);
                let dimensions = new BoxDimensions(3, 1, 3, 3);
                let boxRegionSpec = new BoxRegionSpec(dimensions);
                expect(boxRegionSpec.getRegion(testBoard)).toBe(undefined);
            });

            test('Bottom side', () => {
                let testBoard = new Board(5);
                let dimensions = new BoxDimensions(1, 3, 3, 3);
                let boxRegionSpec = new BoxRegionSpec(dimensions);
                expect(boxRegionSpec.getRegion(testBoard)).toBe(undefined);
            });

            test('Top and left sides', () => {
                let testBoard = new Board(5);
                let dimensions = new BoxDimensions(-1, -1, 3, 3);
                let boxRegionSpec = new BoxRegionSpec(dimensions);
                expect(boxRegionSpec.getRegion(testBoard)).toBe(undefined);
            });

            test('Top and right sides', () => {
                let testBoard = new Board(5);
                let dimensions = new BoxDimensions(-1, 3, 3, 3);
                let boxRegionSpec = new BoxRegionSpec(dimensions);
                expect(boxRegionSpec.getRegion(testBoard)).toBe(undefined);
            });

            test('Top and bottom sides', () => {
                let testBoard = new Board(5);
                let dimensions = new BoxDimensions(1, -1, 3, 7);
                let boxRegionSpec = new BoxRegionSpec(dimensions);
                expect(boxRegionSpec.getRegion(testBoard)).toBe(undefined);
            });

            test('Bottom and left sides', () => {
                let testBoard = new Board(5);
                let dimensions = new BoxDimensions(3, -1, 3, 3);
                let boxRegionSpec = new BoxRegionSpec(dimensions);
                expect(boxRegionSpec.getRegion(testBoard)).toBe(undefined);
            });

            test('Bottom and right sides', () => {
                let testBoard = new Board(5);
                let dimensions = new BoxDimensions(3, 3, 3, 3);
                let boxRegionSpec = new BoxRegionSpec(dimensions);
                expect(boxRegionSpec.getRegion(testBoard)).toBe(undefined);
            });

            test('Left and right sides', () => {
                let testBoard = new Board(5);
                let dimensions = new BoxDimensions(-1, 1, 7, 3);
                let boxRegionSpec = new BoxRegionSpec(dimensions);
                expect(boxRegionSpec.getRegion(testBoard)).toBe(undefined);
            });

            test('All but left side', () => {
                let testBoard = new Board(5);
                let dimensions = new BoxDimensions(1, -1, 7, 7);
                let boxRegionSpec = new BoxRegionSpec(dimensions);
                expect(boxRegionSpec.getRegion(testBoard)).toBe(undefined);
            });

            test('All but top side', () => {
                let testBoard = new Board(5);
                let dimensions = new BoxDimensions(-1, 1, 7, 7);
                let boxRegionSpec = new BoxRegionSpec(dimensions);
                expect(boxRegionSpec.getRegion(testBoard)).toBe(undefined);
            });

            test('All but bottom side', () => {
                let testBoard = new Board(5);
                let dimensions = new BoxDimensions(-1, -1, 7, 3);
                let boxRegionSpec = new BoxRegionSpec(dimensions);
                expect(boxRegionSpec.getRegion(testBoard)).toBe(undefined);
            });

            test('All but right side', () => {
                let testBoard = new Board(5);
                let dimensions = new BoxDimensions(-1, -1, 3, 7);
                let boxRegionSpec = new BoxRegionSpec(dimensions);
                expect(boxRegionSpec.getRegion(testBoard)).toBe(undefined);
            });

            test('All sides, overlapping box', () => {
                let testBoard = new Board(5);
                let dimensions = new BoxDimensions(-1, -1, 7, 7);
                let boxRegionSpec = new BoxRegionSpec(dimensions);
                expect(boxRegionSpec.getRegion(testBoard)).toBe(undefined);
            });

            test('All sides, completely separate', () => {
                let testBoard = new Board(5);
                let dimensions = new BoxDimensions(12, 15, 3, 3);
                let boxRegionSpec = new BoxRegionSpec(dimensions);
                expect(boxRegionSpec.getRegion(testBoard)).toBe(undefined);
            });
        });
    });

    describe('Happy path', () => {
        test('Full board', () => {
            let testBoard = new Board(3);
            let dimensions = new BoxDimensions(0, 0, 3, 3);
            let boxRegionSpec = new BoxRegionSpec(dimensions);
            
            let resultRegion = boxRegionSpec.getRegion(testBoard);
            let expectedRegion = [
                [0, 0],
                [0, 1],
                [0, 2],

                [1, 0],
                [1, 1],
                [1, 2],
                
                [2, 0],
                [2, 1],
                [2, 2],
            ];

            expectArraySameIgnoringOrder(resultRegion, expectedRegion);
        });

        test('1-cell wide', () => {
            let testBoard = new Board(3);
            let dimensions = new BoxDimensions(1, 1, 1, 2);
            let boxRegionSpec = new BoxRegionSpec(dimensions);
            
            let resultRegion = boxRegionSpec.getRegion(testBoard);
            let expectedRegion = [
                [1, 1],
                [1, 2],
            ];

            expectArraySameIgnoringOrder(resultRegion, expectedRegion);
        });

        test('1-cell tall', () => {
            let testBoard = new Board(3);
            let dimensions = new BoxDimensions(1, 2, 2, 1);
            let boxRegionSpec = new BoxRegionSpec(dimensions);
            
            let resultRegion = boxRegionSpec.getRegion(testBoard);
            let expectedRegion = [
                [1, 2],
                [2, 2],
            ];

            expectArraySameIgnoringOrder(resultRegion, expectedRegion);
        });

        test('Single cell', () => {
            let testBoard = new Board(3);
            let dimensions = new BoxDimensions(2, 0, 1, 1);
            let boxRegionSpec = new BoxRegionSpec(dimensions);
            
            let resultRegion = boxRegionSpec.getRegion(testBoard);
            let expectedRegion = [
                [2, 0],
            ];

            expectArraySameIgnoringOrder(resultRegion, expectedRegion);
        });
    });
});