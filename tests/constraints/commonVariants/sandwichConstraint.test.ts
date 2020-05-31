import { Orientation } from '../../../src/geometry';
import { SandwichConstraint } from '../../../src/constraints/commonVariants/sandwichConstraint';
import { Board } from '../../../src/board';

describe('SandwichConstraint.test()', () => {
    describe('Invalid Crusts', () => {
        test('Both crusts missing', () => {
            let testBoard = new Board(5);
            testBoard.cells = [
                [0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0],
                [3, 3, 3, 3, 3],
                [0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0],
            ];

            let constraint = new SandwichConstraint(Orientation.Vertical, [1, 5], 2, 9);
            expect(constraint.test(testBoard)).toBe(false);
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

            let constraint = new SandwichConstraint(Orientation.Vertical, [1, 5], 2, 9);
            expect(constraint.test(testBoard)).toBe(false);
        });

        test('Repeated crust', () => {
            let testBoard = new Board(5);
            testBoard.cells = [
                [0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0],
                [1, 1, 3, 3, 5],
                [0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0],
            ];

            let constraint = new SandwichConstraint(Orientation.Vertical, [1, 5], 2, 6);
            expect(constraint.test(testBoard)).toBe(false);
        });
    });

    describe('Valid Cases', () => {
        test('Horizontal clue', () => {
            let testBoard = new Board(5);
            testBoard.cells = [
                [1, 0, 0, 0, 0],
                [2, 0, 0, 0, 0],
                [3, 0, 0, 0, 0],
                [4, 0, 0, 0, 0],
                [5, 0, 0, 0, 0],
            ];

            let constraint = new SandwichConstraint(Orientation.Horizontal, [1, 5], 0, 9);
            expect(constraint.test(testBoard)).toBe(true);
        });

        test('Vertical clue', () => {
            let testBoard = new Board(5);
            testBoard.cells = [
                [1, 2, 3, 4, 5],
                [0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0],
            ];

            let constraint = new SandwichConstraint(Orientation.Vertical, [1, 5], 0, 9);
            expect(constraint.test(testBoard)).toBe(true);
        });

        test('Crusts in reverse order', () => {
            let testBoard = new Board(5);
            testBoard.cells = [
                [5, 2, 3, 4, 1],
                [0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0],
            ];

            let constraint = new SandwichConstraint(Orientation.Vertical, [1, 5], 0, 9);
            expect(constraint.test(testBoard)).toBe(true);
        });

        test('Zero clue', () => {
            let testBoard = new Board(5);
            testBoard.cells = [
                [5, 1, 2, 3, 4],
                [0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0],
            ];

            let constraint = new SandwichConstraint(Orientation.Vertical, [1, 5], 0, 0);
            expect(constraint.test(testBoard)).toBe(true);
        });

        test('Partial row clue', () => {
            let testBoard = new Board(5);
            testBoard.cells = [
                [4, 5, 3, 1, 2],
                [0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0],
            ];

            let constraint = new SandwichConstraint(Orientation.Vertical, [1, 5], 0, 3);
            expect(constraint.test(testBoard)).toBe(true);
        });
    });

    describe ('Invalid Cases', () => {
        test('Horizontal clue', () => {
            let testBoard = new Board(5);
            testBoard.cells = [
                [1, 0, 0, 0, 0],
                [2, 0, 0, 0, 0],
                [3, 0, 0, 0, 0],
                [4, 0, 0, 0, 0],
                [5, 0, 0, 0, 0],
            ];

            let constraint = new SandwichConstraint(Orientation.Horizontal, [1, 5], 0, 7);
            expect(constraint.test(testBoard)).toBe(false);
        });

        test('Vertical clue', () => {
            let testBoard = new Board(5);
            testBoard.cells = [
                [1, 2, 3, 4, 5],
                [0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0],
            ];

            let constraint = new SandwichConstraint(Orientation.Vertical, [1, 5], 0, 6);
            expect(constraint.test(testBoard)).toBe(false);
        });

        test('Expected zero, received non-zero', () => {
            let testBoard = new Board(5);
            testBoard.cells = [
                [1, 2, 5, 3, 4],
                [0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0],
            ];

            let constraint = new SandwichConstraint(Orientation.Vertical, [1, 5], 0, 0);
            expect(constraint.test(testBoard)).toBe(false);
        });

        test('Expected non-zero, received zero', () => {
            let testBoard = new Board(5);
            testBoard.cells = [
                [1, 5, 3, 4, 2],
                [0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0],
            ];

            let constraint = new SandwichConstraint(Orientation.Vertical, [1, 5], 0, 4);
            expect(constraint.test(testBoard)).toBe(false);
        });
    });
});