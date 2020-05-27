import { Board } from "../board";

export interface Constraint {
    test(board: Board): boolean;
}