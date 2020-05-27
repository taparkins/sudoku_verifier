import { Board } from "../../../src/board";
import { UniqueBoxConstraint, BoxDimensions, getBoardBoxConstraint } from "../../../src/constraints/sudoku/uniqueBoxConstraint";

describe('UniqueBoxConstraint.test()', () => {
    describe('Valid Grids', () => {
        test('Full Grid Box', () => {
            let testBoard = new Board(3);
            testBoard.cells = [
                [1, 2, 3],
                [4, 5, 6],
                [7, 8, 9],
            ];

            let testDim = new BoxDimensions(0, 0, 3, 3);
            let constraint = new UniqueBoxConstraint(testDim);
            expect(constraint.test(testBoard)).toBe(true);
        });

        test('Partial Grid; starts in top left', () => {
            let testBoard = new Board(3);
            testBoard.cells = [
                [1, 2, 1],
                [4, 3, 1],
                [1, 1, 1],
            ];

            let testDim = new BoxDimensions(0, 0, 2, 2);
            let constraint = new UniqueBoxConstraint(testDim);
            expect(constraint.test(testBoard)).toBe(true);
        });

        test('Partial Grid; starts in center', () => {
            let testBoard = new Board(3);
            testBoard.cells = [
                [1, 1, 1],
                [1, 3, 2],
                [1, 4, 1],
            ];

            let testDim = new BoxDimensions(1, 1, 2, 2);
            let constraint = new UniqueBoxConstraint(testDim);
            expect(constraint.test(testBoard)).toBe(true);
        });
    });

    describe('Invalid Grids', () => {
        test('Full Grid Box', () => {
            let testBoard = new Board(3);
            testBoard.cells = [
                [1, 1, 3],
                [4, 5, 6],
                [7, 8, 9],
            ];

            let testDim = new BoxDimensions(0, 0, 3, 3);
            let constraint = new UniqueBoxConstraint(testDim);
            expect(constraint.test(testBoard)).toBe(false);
        });

        test('Partial Grid; starts in top left', () => {
            let testBoard = new Board(3);
            testBoard.cells = [
                [1, 1, 6],
                [1, 1, 4],
                [7, 5, 2],
            ];

            let testDim = new BoxDimensions(0, 0, 2, 2);
            let constraint = new UniqueBoxConstraint(testDim);
            expect(constraint.test(testBoard)).toBe(false);
        });

        test('Partial Grid; starts in center', () => {
            let testBoard = new Board(3);
            testBoard.cells = [
                [5, 4, 6],
                [2, 1, 1],
                [3, 1, 1],
            ];

            let testDim = new BoxDimensions(1, 1, 2, 2);
            let constraint = new UniqueBoxConstraint(testDim);
            expect(constraint.test(testBoard)).toBe(false);
        });
    });
});

describe('getBoardBoxConstraint()', () => {
    describe('Error cases', () => {
        test('BoxWidth does not divide Board Width', () => {
            let testBoard = new Board(9);
            expect(() => getBoardBoxConstraint(testBoard, 7, 3)).toThrow();
        });
        
        test('BoxHeight does not divide Board Height', () => {
            let testBoard = new Board(9);
            expect(() => getBoardBoxConstraint(testBoard, 3, 7)).toThrow();
        });
    });

    describe('Valid cases', () => {
        test('4x4 -- Square boxes', () => {
            let testBoard = new Board(4);
            testBoard.cells = [
                [1, 2,   1, 2],
                [3, 4,   3, 4],
    
                [1, 2,   1, 2],
                [3, 4,   3, 4],
            ];

            let constraint = getBoardBoxConstraint(testBoard, 2, 2);
            expect(constraint.test(testBoard)).toBe(true);
        });

        test('6x6 -- Vertical boxes', () => {
            let testBoard = new Board(6);
            // I know these don't look vertical; that's because the orientation is transposed
            // thanks to indexing rules.
            testBoard.cells = [
                [1, 2, 3,   1, 2, 3],
                [4, 5, 6,   4, 5, 6],
    
                [1, 2, 3,   1, 2, 3],
                [4, 5, 6,   4, 5, 6],

                [1, 2, 3,   1, 2, 3],
                [4, 5, 6,   4, 5, 6],
            ];

            let constraint = getBoardBoxConstraint(testBoard, 2, 3);
            expect(constraint.test(testBoard)).toBe(true);
        });

        test('6x6 -- Horizontal boxes', () => {
            let testBoard = new Board(6);
            // I know these don't look horizontal; that's because the orientation is transposed
            // thanks to indexing rules.
            testBoard.cells = [
                [1, 2,   1, 2,   1, 2],
                [3, 4,   3, 4,   3, 4],
                [5, 6,   5, 6,   5, 6],

                [1, 2,   1, 2,   1, 2],
                [3, 4,   3, 4,   3, 4],
                [5, 6,   5, 6,   5, 6],
            ];

            let constraint = getBoardBoxConstraint(testBoard, 3, 2);
            expect(constraint.test(testBoard)).toBe(true);
        });
    });
});