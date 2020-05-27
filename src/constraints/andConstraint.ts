import { Constraint } from "./constraint";
import { Board } from "../board";

/**
 * Represents a constraint that requires several other constraints to
 * each pass for the provided board.
 */
export class AndConstraint implements Constraint {
    protected requiredConstraints: Constraint[];
    
    constructor(constraints?: Constraint[]) {
        this.requiredConstraints = [];
        if (constraints !== undefined) {
            this.requiredConstraints = constraints;
        }
    }

    public addConstraint(constraint: Constraint): void {
        this.requiredConstraints.push(constraint);
    }
    
    public test(board: Board): boolean {
        // If we cannot find a constraint that fails, then all of them pass
        let failedConstraint = this.requiredConstraints
            .find((constraint) => !constraint.test(board))
        return failedConstraint === undefined;
    }
}