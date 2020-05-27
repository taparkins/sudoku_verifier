import { Board } from "../../../src/board";
import { UniqueColumnConstraint, getBoardColumnConstraint } from "../../../src/constraints/sudoku/uniqueColumnConstraint";

// All of these tests _look_ like they test rows, but that is just because
// the data entry is transposed in text. In terms of the data, the logic is
// actually checking columns.

describe('UniqueColumnConstraint.test()', () => {
    test('Valid Column', () => {
        let testBoard = new Board(2, 3);
        testBoard.cells = [
            [1, 1, 1],
            [2, 3, 4],
        ];

        let constraint = new UniqueColumnConstraint(1);
        expect(constraint.test(testBoard)).toBe(true);
    });

    test('Invalid Column', () => {
        let testBoard = new Board(2, 3);
        testBoard.cells = [
            [1, 1, 1],
            [2, 3, 4],
        ];

        let constraint = new UniqueColumnConstraint(0);
        expect(constraint.test(testBoard)).toBe(false);
    });
});

describe('getBoardColumnConstraint', () => {
    describe('Square board', () => {
        test('Valid', () => {
            let testBoard = new Board(3);
            testBoard.cells = [
                [1, 2, 3],
                [1, 2, 3],
                [1, 2, 3],
            ];
    
            let constraint = getBoardColumnConstraint(3);
            expect(constraint.test(testBoard)).toBe(true);
        });

        test('Invalid', () => {
            let testBoard = new Board(3);
            testBoard.cells = [
                [1, 2, 3],
                [1, 2, 3],
                [2, 2, 3],
            ];
    
            let constraint = getBoardColumnConstraint(3);
            expect(constraint.test(testBoard)).toBe(false);
        });
    });
    

    describe('Tall board', () => {
        test('Valid', () => {
            let testBoard = new Board(2, 3);
            testBoard.cells = [
                [1, 2, 3],
                [1, 2, 3],
            ];

            let constraint = getBoardColumnConstraint(2);
            expect(constraint.test(testBoard)).toBe(true);
        });

        test('Invalid', () => {
            let testBoard = new Board(2, 3);
            testBoard.cells = [
                [1, 2, 3],
                [1, 3, 3],
            ];

            let constraint = getBoardColumnConstraint(2);
            expect(constraint.test(testBoard)).toBe(false);
        });
    });

    describe('Long board', () => {
        test('Valid', () => {
            let testBoard = new Board(3, 2);
            testBoard.cells = [
                [1, 2],
                [1, 2],
                [1, 2],
            ];

            let constraint = getBoardColumnConstraint(2);
            expect(constraint.test(testBoard)).toBe(true);
        });

        test('Invalid', () => {
            let testBoard = new Board(3, 2);
            testBoard.cells = [
                [1, 2],
                [1, 1],
                [1, 2],
            ];

            let constraint = getBoardColumnConstraint(3);
            expect(constraint.test(testBoard)).toBe(false);
        });
    });
});