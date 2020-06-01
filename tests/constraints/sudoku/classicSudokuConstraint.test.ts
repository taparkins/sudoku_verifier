import { Board } from "../../../src/board";
import { getSudokuConstraint, getStandard9SudokuConstraint, getBoardRowConstraint, getBoardColumnConstraint, getBoardBoxConstraint } from "../../../src/constraints/sudoku/classicSudokuConstraint";

describe('getBoardRowConstraint', () => {
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

describe('getSudokuConstraint()', () => {
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