import { Board } from "../../../src/board";
import { UniqueRowConstraint, getBoardRowConstraint } from "../../../src/constraints/sudoku/uniqueRowConstraint";

// All of these tests _look_ like they test columns, but that is just because
// the data entry is transposed in text. In terms of the data, the logic is
// actually checking rows.

describe('UniqueRowConstraint.test()', () => {
    test('Valid Row', () => {
        let testBoard = new Board(3, 2);
        testBoard.cells = [
            [1, 2],
            [1, 3],
            [1, 4],
        ];

        let constraint = new UniqueRowConstraint(1);
        expect(constraint.test(testBoard)).toBe(true);
    });

    test('Invalid Row', () => {
        let testBoard = new Board(3, 2);
        testBoard.cells = [
            [1, 2],
            [1, 3],
            [1, 4],
        ];

        let constraint = new UniqueRowConstraint(0);
        expect(constraint.test(testBoard)).toBe(false);
    });
});

describe('getBoardColumnConstraint', () => {
    describe('Square board', () => {
        test('Valid', () => {
            let testBoard = new Board(3);
            testBoard.cells = [
                [1, 1, 1],
                [2, 2, 2],
                [3, 3, 3],
            ];
    
            let constraint = getBoardRowConstraint(3);
            expect(constraint.test(testBoard)).toBe(true);
        });

        test('Invalid', () => {
            let testBoard = new Board(3);
            testBoard.cells = [
                [1, 1, 2],
                [2, 2, 2],
                [3, 3, 3],
            ];
    
            let constraint = getBoardRowConstraint(3);
            expect(constraint.test(testBoard)).toBe(false);
        });
    });
    

    describe('Tall board', () => {
        test('Valid', () => {
            let testBoard = new Board(2, 3);
            testBoard.cells = [
                [1, 1, 1],
                [2, 2, 2],
            ];

            let constraint = getBoardRowConstraint(3);
            expect(constraint.test(testBoard)).toBe(true);
        });

        test('Invalid', () => {
            let testBoard = new Board(2, 3);
            testBoard.cells = [
                [1, 1, 1],
                [1, 2, 2],
            ];

            let constraint = getBoardRowConstraint(3);
            expect(constraint.test(testBoard)).toBe(false);
        });
    });

    describe('Long board', () => {
        test('Valid', () => {
            let testBoard = new Board(3, 2);
            testBoard.cells = [
                [1, 1],
                [2, 3],
                [3, 2],
            ];

            let constraint = getBoardRowConstraint(2);
            expect(constraint.test(testBoard)).toBe(true);
        });

        test('Invalid', () => {
            let testBoard = new Board(3, 2);
            testBoard.cells = [
                [1, 1],
                [1, 3],
                [2, 2],
            ];

            let constraint = getBoardRowConstraint(2);
            expect(constraint.test(testBoard)).toBe(false);
        });
    });
});