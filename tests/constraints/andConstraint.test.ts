import { Constraint } from "../../src/constraints/constraint";
import { AndConstraint } from "../../src/constraints/andConstraint";
import { Board } from "../../src/board";

class PassConstraint implements Constraint {
    test(board: Board): boolean {
        return true;
    }
}

class FailConstraint implements Constraint {
    test(board: Board): boolean {
        return false;
    }
}

describe('AndConstraint.test()', () => {
    test('No Failed Constraints', () => {
        let board = new Board(3);
        let constraint = new AndConstraint([
            new PassConstraint(),
            new PassConstraint(),
        ]);
        expect(constraint.test(board)).toBe(true);
    });
    
    test('First constraint fails', () => {
        let board = new Board(3);
        let constraint = new AndConstraint([
            new FailConstraint(),
            new PassConstraint(),
        ]);
        expect(constraint.test(board)).toBe(false);
    });
    
    test('Last constraint fails', () => {
        let board = new Board(3);
        let constraint = new AndConstraint([
            new PassConstraint(),
            new FailConstraint(),
        ]);
        expect(constraint.test(board)).toBe(false);
    });
});