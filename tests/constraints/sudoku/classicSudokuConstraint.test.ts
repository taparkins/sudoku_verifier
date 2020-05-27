import { Board } from "../../../src/board";
import { getSudokuConstraint, getStandard9SudokuConstraint } from "../../../src/constraints/sudoku/classicSudokuConstraint";

describe('Happy Path', () => {
    describe('Valid Grids', () => {
        test('sample valid 9x9 sudoku', () => {
            let sampleBoard = new Board(9);
            sampleBoard.cells = [
                [6, 3, 9,   5, 7, 4,   1, 8, 2],
                [5, 4, 1,   8, 2, 9,   3, 7, 6],
                [7, 8, 2,   6, 1, 3,   9, 5, 4],
                
                [1, 9, 8,   4, 6, 7,   5, 2, 3],
                [3, 6, 5,   9, 8, 2,   4, 1, 7],
                [4, 2, 7,   1, 3, 5,   8, 6, 9],
                
                [9, 5, 6,   7, 4, 8,   2, 3, 1],
                [8, 1, 3,   2, 9, 6,   7, 4, 5],
                [2, 7, 4,   3, 5, 1,   6, 9, 8],
            ];
    
            let constraint = getStandard9SudokuConstraint();
            expect(constraint.test(sampleBoard)).toBe(true);
        });
    
        test('sample valid 4x4 sudoku', () => {
            let sampleBoard = new Board(4);
            sampleBoard.cells = [
                [1, 2,   3, 4],
                [3, 4,   2, 1],
    
                [2, 1,   4, 3],
                [4, 3,   1, 2],
            ];
    
            let constraint = getSudokuConstraint(sampleBoard, 2, 2, 1, 4);
            expect(constraint.test(sampleBoard)).toBe(true);
        });
    });
    
    describe('Invalid Grids', () => {
        test('9x9 -- value below minimum', () => {
            let sampleBoard = new Board(9);
            sampleBoard.cells = [
                [6, 3, 9,   5, 7, 4,   1, 8, 2],
                [5, 0, 1,   8, 2, 9,   3, 7, 6],
                [7, 8, 2,   6, 1, 3,   9, 5, 4],
                
                [1, 9, 8,   4, 6, 7,   5, 2, 3],
                [3, 6, 5,   9, 8, 2,   4, 1, 7],
                [4, 2, 7,   1, 3, 5,   8, 6, 9],
                
                [9, 5, 6,   7, 4, 8,   2, 3, 1],
                [8, 1, 3,   2, 9, 6,   7, 4, 5],
                [2, 7, 4,   3, 5, 1,   6, 9, 8],
            ];
    
            let constraint = getStandard9SudokuConstraint();
            expect(constraint.test(sampleBoard)).toBe(false);
        });

        test('9x9 -- value above maximum', () => {
            let sampleBoard = new Board(9);
            sampleBoard.cells = [
                [6, 3, 9,   5, 7, 4,   1, 8, 2],
                [5, 10, 1,  8, 2, 9,   3, 7, 6],
                [7, 8, 2,   6, 1, 3,   9, 5, 4],
                
                [1, 9, 8,   4, 6, 7,   5, 2, 3],
                [3, 6, 5,   9, 8, 2,   4, 1, 7],
                [4, 2, 7,   1, 3, 5,   8, 6, 9],
                
                [9, 5, 6,   7, 4, 8,   2, 3, 1],
                [8, 1, 3,   2, 9, 6,   7, 4, 5],
                [2, 7, 4,   3, 5, 1,   6, 9, 8],
            ];
    
            let constraint = getStandard9SudokuConstraint();
            expect(constraint.test(sampleBoard)).toBe(false);
        });
        
        test('4x4 -- value below minimum', () => {
            let sampleBoard = new Board(4);
            sampleBoard.cells = [
                [0, 2,   3, 4],
                [3, 4,   2, 1],
    
                [2, 1,   4, 3],
                [4, 3,   1, 2],
            ];
    
            let constraint = getSudokuConstraint(sampleBoard, 4, 4, 1, 4);
            expect(constraint.test(sampleBoard)).toBe(false);
        });
        
        test('4x4 -- value above maximum', () => {
            let sampleBoard = new Board(4);
            sampleBoard.cells = [
                [5, 2,   3, 4],
                [3, 4,   2, 1],
    
                [2, 1,   4, 3],
                [4, 3,   1, 2],
            ];
    
            let constraint = getSudokuConstraint(sampleBoard, 4, 4, 1, 4);
            expect(constraint.test(sampleBoard)).toBe(false);
        });

        describe('9x9 -- repeated digit', () => {
            test('error in top-left box', () => {
                let sampleBoard = new Board(9);
                sampleBoard.cells = [
                    [9, 3, 9,   5, 7, 4,   1, 8, 2],
                    [5, 4, 1,   8, 2, 9,   3, 7, 6],
                    [7, 8, 2,   6, 1, 3,   9, 5, 4],
                    
                    [1, 9, 8,   4, 6, 7,   5, 2, 3],
                    [3, 6, 5,   9, 8, 2,   4, 1, 7],
                    [4, 2, 7,   1, 3, 5,   8, 6, 9],
                    
                    [9, 5, 6,   7, 4, 8,   2, 3, 1],
                    [8, 1, 3,   2, 9, 6,   7, 4, 5],
                    [2, 7, 4,   3, 5, 1,   6, 9, 8],
                ];
        
                let constraint = getStandard9SudokuConstraint();
                expect(constraint.test(sampleBoard)).toBe(false);
            });

            test('error in top-center box', () => {
                let sampleBoard = new Board(9);
                sampleBoard.cells = [
                    [6, 3, 9,   5, 7, 4,   1, 8, 2],
                    [5, 4, 1,   8, 1, 9,   3, 7, 6],
                    [7, 8, 2,   6, 1, 3,   9, 5, 4],
                    
                    [1, 9, 8,   4, 6, 7,   5, 2, 3],
                    [3, 6, 5,   9, 8, 2,   4, 1, 7],
                    [4, 2, 7,   1, 3, 5,   8, 6, 9],
                    
                    [9, 5, 6,   7, 4, 8,   2, 3, 1],
                    [8, 1, 3,   2, 9, 6,   7, 4, 5],
                    [2, 7, 4,   3, 5, 1,   6, 9, 8],
                ];
        
                let constraint = getStandard9SudokuConstraint();
                expect(constraint.test(sampleBoard)).toBe(false);
            });

            test('error in top-right box', () => {
                let sampleBoard = new Board(9);
                sampleBoard.cells = [
                    [6, 3, 9,   5, 7, 4,   1, 8, 2],
                    [5, 4, 1,   8, 2, 9,   3, 7, 6],
                    [7, 8, 2,   6, 1, 3,   7, 5, 4],
                    
                    [1, 9, 8,   4, 6, 7,   5, 2, 3],
                    [3, 6, 5,   9, 8, 2,   4, 1, 7],
                    [4, 2, 7,   1, 3, 5,   8, 6, 9],
                    
                    [9, 5, 6,   7, 4, 8,   2, 3, 1],
                    [8, 1, 3,   2, 9, 6,   7, 4, 5],
                    [2, 7, 4,   3, 5, 1,   6, 9, 8],
                ];
        
                let constraint = getStandard9SudokuConstraint();
                expect(constraint.test(sampleBoard)).toBe(false);
            });

            test('error in center-left box', () => {
                let sampleBoard = new Board(9);
                sampleBoard.cells = [
                    [6, 3, 9,   5, 7, 4,   1, 8, 2],
                    [5, 4, 1,   8, 2, 9,   3, 7, 6],
                    [7, 8, 2,   6, 1, 3,   9, 5, 4],
                    
                    [1, 9, 8,   4, 6, 7,   5, 2, 3],
                    [3, 6, 5,   9, 8, 2,   4, 1, 7],
                    [4, 3, 7,   1, 3, 5,   8, 6, 9],
                    
                    [9, 5, 6,   7, 4, 8,   2, 3, 1],
                    [8, 1, 3,   2, 9, 6,   7, 4, 5],
                    [2, 7, 4,   3, 5, 1,   6, 9, 8],
                ];
        
                let constraint = getStandard9SudokuConstraint();
                expect(constraint.test(sampleBoard)).toBe(false);
            });

            test('error in true-center box', () => {
                let sampleBoard = new Board(9);
                sampleBoard.cells = [
                    [6, 3, 9,   5, 7, 4,   1, 8, 2],
                    [5, 4, 1,   8, 2, 9,   3, 7, 6],
                    [7, 8, 2,   6, 1, 3,   9, 5, 4],
                    
                    [1, 9, 8,   4, 6, 7,   5, 2, 3],
                    [3, 6, 5,   5, 8, 2,   4, 1, 7],
                    [4, 2, 7,   1, 3, 5,   8, 6, 9],
                    
                    [9, 5, 6,   7, 4, 8,   2, 3, 1],
                    [8, 1, 3,   2, 9, 6,   7, 4, 5],
                    [2, 7, 4,   3, 5, 1,   6, 9, 8],
                ];
        
                let constraint = getStandard9SudokuConstraint();
                expect(constraint.test(sampleBoard)).toBe(false);
            });

            test('error in center-right box', () => {
                let sampleBoard = new Board(9);
                sampleBoard.cells = [
                    [6, 3, 9,   5, 7, 4,   1, 8, 2],
                    [5, 4, 1,   8, 2, 9,   3, 7, 6],
                    [7, 8, 2,   6, 1, 3,   9, 5, 4],
                    
                    [1, 9, 8,   4, 6, 7,   5, 8, 3],
                    [3, 6, 5,   9, 8, 2,   4, 1, 7],
                    [4, 2, 7,   1, 3, 5,   8, 6, 9],
                    
                    [9, 5, 6,   7, 4, 8,   2, 3, 1],
                    [8, 1, 3,   2, 9, 6,   7, 4, 5],
                    [2, 7, 4,   3, 5, 1,   6, 9, 8],
                ];
        
                let constraint = getStandard9SudokuConstraint();
                expect(constraint.test(sampleBoard)).toBe(false);
            });

            test('error in bottom-left box', () => {
                let sampleBoard = new Board(9);
                sampleBoard.cells = [
                    [6, 3, 9,   5, 7, 4,   1, 8, 2],
                    [5, 4, 1,   8, 2, 9,   3, 7, 6],
                    [7, 8, 2,   6, 1, 3,   9, 5, 4],
                    
                    [1, 9, 8,   4, 6, 7,   5, 2, 3],
                    [3, 6, 5,   9, 8, 2,   4, 1, 7],
                    [4, 2, 7,   1, 3, 5,   8, 6, 9],
                    
                    [9, 5, 6,   7, 4, 8,   2, 3, 1],
                    [8, 1, 4,   2, 9, 6,   7, 4, 5],
                    [2, 7, 4,   3, 5, 1,   6, 9, 8],
                ];
        
                let constraint = getStandard9SudokuConstraint();
                expect(constraint.test(sampleBoard)).toBe(false);
            });

            test('error in bottom-center box', () => {
                let sampleBoard = new Board(9);
                sampleBoard.cells = [
                    [6, 3, 9,   5, 7, 4,   1, 8, 2],
                    [5, 4, 1,   8, 2, 9,   3, 7, 6],
                    [7, 8, 2,   6, 1, 3,   9, 5, 4],
                    
                    [1, 9, 8,   4, 6, 7,   5, 2, 3],
                    [3, 6, 5,   9, 8, 2,   4, 1, 7],
                    [4, 2, 7,   1, 3, 5,   8, 6, 9],
                    
                    [9, 5, 6,   7, 4, 8,   2, 3, 1],
                    [8, 1, 3,   2, 7, 6,   7, 4, 5],
                    [2, 7, 4,   3, 5, 1,   6, 9, 8],
                ];
        
                let constraint = getStandard9SudokuConstraint();
                expect(constraint.test(sampleBoard)).toBe(false);
            });

            test('error in bottom-right box', () => {
                let sampleBoard = new Board(9);
                sampleBoard.cells = [
                    [6, 3, 9,   5, 7, 4,   1, 8, 2],
                    [5, 4, 1,   8, 2, 9,   3, 7, 6],
                    [7, 8, 2,   6, 1, 3,   9, 5, 4],
                    
                    [1, 9, 8,   4, 6, 7,   5, 2, 3],
                    [3, 6, 5,   9, 8, 2,   4, 1, 7],
                    [4, 2, 7,   1, 3, 5,   8, 6, 9],
                    
                    [9, 5, 6,   7, 4, 8,   2, 3, 1],
                    [8, 1, 3,   2, 9, 6,   7, 4, 5],
                    [2, 7, 4,   3, 5, 1,   6, 9, 9],
                ];
        
                let constraint = getStandard9SudokuConstraint();
                expect(constraint.test(sampleBoard)).toBe(false);
            });
        });
        
        test('4x4 -- repeated digit', () => {
            let sampleBoard = new Board(4);
            sampleBoard.cells = [
                [4, 2,   3, 4],
                [3, 1,   2, 1],
    
                [2, 4,   4, 3],
                [1, 3,   1, 2],
            ];
    
            let constraint = getSudokuConstraint(sampleBoard, 4, 4, 1, 4);
            expect(constraint.test(sampleBoard)).toBe(false);
        });
    });
});