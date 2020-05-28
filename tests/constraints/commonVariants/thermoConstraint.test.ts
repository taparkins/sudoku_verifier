import { Position, Direction } from '../../../src/geometry';
import { ThermoConstraint } from '../../../src/constraints/commonVariants/thermoConstraint';
import { Board } from '../../../src/board';

describe('ThermoConstraint Constructor Assertions', () => {
    test('Empty Path', () => {
        expect(() => new ThermoConstraint([0, 0], [])).toThrow();
    });

    test('Repeating Grid Cell', () => {
        let startPosition: Position = [2, 2];
        let path: Direction[] = [
            Direction.UpLeft,
            Direction.Down,
            Direction.Right, // Repeats bulb here
            Direction.Right,
        ];

        expect(() => new ThermoConstraint(startPosition, path)).toThrow();
    });

    test('Self-Intersection Is Accepted', () => {
        let startPosition: Position = [3, 3];
        let path: Direction[] = [
            Direction.DownLeft,
            Direction.Up,
            Direction.DownRight, // Crosses first segment here, but does not repeat cell
        ];

        expect(() => new ThermoConstraint(startPosition, path)).not.toThrow();
    });
});

describe('ThermoConstraint.test()', () => {
    describe('Valid Cases', () => {
        test('Short Thermometer', () => {
            let board = new Board(3);
            board.cells = [
                [1, 2, 3],
                [4, 5, 6],
                [7, 8, 9],
            ];

            let bulbPosition: Position = [1, 1];
            let path: Direction[] = [ Direction.Down ];

            let constraint = new ThermoConstraint(bulbPosition, path);
            expect(constraint.test(board)).toBe(true);
        });

        test('Long Thermometer', () => {
            let board = new Board(3);
            board.cells = [
                [1, 2, 3],
                [4, 5, 6],
                [7, 8, 9],
            ];

            let bulbPosition: Position = [0, 0];
            let path: Direction[] = [
                Direction.Down,
                Direction.Down,
                Direction.UpRight,
                Direction.Right,
                Direction.Down,
            ];

            let constraint = new ThermoConstraint(bulbPosition, path);
            expect(constraint.test(board)).toBe(true);
        });
    });

    describe('Invalid Cases', () => {
        test('Short Thermometer', () => {
            let board = new Board(3);
            board.cells = [
                [1, 2, 3],
                [4, 5, 6],
                [7, 8, 9],
            ];

            let bulbPosition: Position = [1, 1];
            let path: Direction[] = [ Direction.Up ];

            let constraint = new ThermoConstraint(bulbPosition, path);
            expect(constraint.test(board)).toBe(false);
        });

        test('Long Thermometer with one downward movement', () => {
            let board = new Board(3);
            board.cells = [
                [1, 2, 3],
                [4, 5, 6],
                [7, 8, 9],
            ];

            let bulbPosition: Position = [0, 0];
            let path: Direction[] = [
                Direction.Down,
                Direction.Down,
                Direction.Right,
                Direction.Up, // Oops, number went down here
                Direction.Right,
                Direction.Down,
            ];

            let constraint = new ThermoConstraint(bulbPosition, path);
            expect(constraint.test(board)).toBe(false);
        });

        test('Long Thermometer with one stable movement', () => {
            let board = new Board(3);
            board.cells = [
                [1, 2, 3],
                [4, 6, 6],
                [7, 8, 9],
            ];

            let bulbPosition: Position = [0, 0];
            let path: Direction[] = [
                Direction.Down,
                Direction.Down,
                Direction.Right,
                Direction.Up, // Oops, number stayed the same here
                Direction.Right,
                Direction.Down,
            ];

            let constraint = new ThermoConstraint(bulbPosition, path);
            expect(constraint.test(board)).toBe(false);
        });
    });

    test('Error on thermometer passing outside board', () => {
        let board = new Board(3);
        board.cells = [
            [1, 2, 3],
            [4, 5, 6],
            [7, 8, 9],
        ];

        let bulbPosition: Position = [1, 1];
        let path: Direction[] = [
            Direction.Up,       // in grid
            Direction.Right,    // still in grid
            Direction.Right,    // oops, stepped outside
            Direction.DownLeft, // came back, but it's too late
        ];

        let constraint = new ThermoConstraint(bulbPosition, path);
        expect(() => constraint.test(board)).toThrow();
    });
});