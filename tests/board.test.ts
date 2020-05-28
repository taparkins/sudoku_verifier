import { Position } from "../src/geometry";
import { Board } from "../src/board";

function expectArraySameIgnoringOrder(a1: any[], a2: any[]): void {
    expect(a1).toEqual(expect.arrayContaining(a2));
    expect(a2).toEqual(expect.arrayContaining(a1));
    expect(a1.length).toBe(a2.length);
}

describe('Board.positionInsideGrid', () => {
    test('Is inside', () => {
        let testBoard = new Board(3);
        expect(testBoard.positionInsideGrid([1, 1])).toBe(true);
    });

    describe('Is outside', () => {
        test('To the left', () => {
            let testBoard = new Board(3);
            expect(testBoard.positionInsideGrid([-1, 1])).toBe(false);
        });
        test('To the right', () => {
            let testBoard = new Board(3);
            expect(testBoard.positionInsideGrid([3, 1])).toBe(false);
        });
        test('Above', () => {
            let testBoard = new Board(3);
            expect(testBoard.positionInsideGrid([1, -1])).toBe(false);
        });
        test('Below', () => {
            let testBoard = new Board(3);
            expect(testBoard.positionInsideGrid([1, 3])).toBe(false);
        });
        test('At an angle', () => {
            let testBoard = new Board(3);
            expect(testBoard.positionInsideGrid([3, -1])).toBe(false);
        });
    });
});

describe('Board.getColumn()', () => {
    test('Square Board', () => {
        let testBoard = new Board(3);
        for (let x = 0; x < 3; x++) {
            let curResult = testBoard.getColumn(x);
            let expected = [ [x, 0], [x, 1], [x, 2] ];
            expectArraySameIgnoringOrder(curResult, expected);
        }
    });

    test('Long Board', () => {
        let testBoard = new Board(4, 2);
        for (let x = 0; x < 4; x++) {
            let curResult = testBoard.getColumn(x);
            let expected = [ [x, 0], [x, 1] ];
            expectArraySameIgnoringOrder(curResult, expected);
        }
    });

    test('Tall Board', () => {
        let testBoard = new Board(2, 4);
        for (let x = 0; x < 2; x++) {
            let curResult = testBoard.getColumn(x);
            let expected = [ [x, 0], [x, 1], [x, 2], [x, 3] ];
            expectArraySameIgnoringOrder(curResult, expected);
        }
    });

    test('Out of bounds request', () => {
        let testBoard = new Board(3);
        expect(() => testBoard.getColumn(4)).toThrow();
    });
});

describe('Board.getRow()', () => {
    test('Square Board', () => {
        let testBoard = new Board(3);
        for (let y = 0; y < 3; y++) {
            let curResult = testBoard.getRow(y);
            let expected = [ [0, y], [1, y], [2, y] ];
            expectArraySameIgnoringOrder(curResult, expected);
        }
    });

    test('Long Board', () => {
        let testBoard = new Board(4, 2);
        for (let y = 0; y < 2; y++) {
            let curResult = testBoard.getRow(y);
            let expected = [ [0, y], [1, y], [2, y], [3, y] ];
            expectArraySameIgnoringOrder(curResult, expected);
        }
    });

    test('Tall Board', () => {
        let testBoard = new Board(2, 4);
        for (let y = 0; y < 4; y++) {
            let curResult = testBoard.getRow(y);
            let expected = [ [0, y], [1, y] ];
            expectArraySameIgnoringOrder(curResult, expected);
        }
    });

    test('Out of bounds request', () => {
        let testBoard = new Board(3);
        expect(() => testBoard.getRow(4)).toThrow();
    });
});

describe('Board.getOrthoAdjacentPositions()', () => {
    describe('Start in grid', () => {
        test('Center square', () => {
            let testBoard = new Board(3);
            let result = testBoard.getOrthoAdjacentPositions([1, 1]);
            let expected = [ [0, 1], [1, 0], [1, 2], [2, 1] ];
            expectArraySameIgnoringOrder(result, expected);
        });

        test('Right edge square', () => {
            let testBoard = new Board(3);
            let result = testBoard.getOrthoAdjacentPositions([2, 1]);
            let expected = [ [1, 1], [2, 0], [2, 2] ];
            expectArraySameIgnoringOrder(result, expected);
        });

        test('Left edge square', () => {
            let testBoard = new Board(3);
            let result = testBoard.getOrthoAdjacentPositions([0, 1]);
            let expected = [ [1, 1], [0, 0], [0, 2] ];
            expectArraySameIgnoringOrder(result, expected);
        });

        test('Top edge square', () => {
            let testBoard = new Board(3);
            let result = testBoard.getOrthoAdjacentPositions([1, 0]);
            let expected = [ [1, 1], [0, 0], [2, 0] ];
            expectArraySameIgnoringOrder(result, expected);
        });

        test ('Bottom edge square', () => {
            let testBoard = new Board(3);
            let result = testBoard.getOrthoAdjacentPositions([1, 2]);
            let expected = [ [1, 1], [0, 2], [2, 2] ];
            expectArraySameIgnoringOrder(result, expected);
        });

        test ('Top-left square', () => {
            let testBoard = new Board(3);
            let result = testBoard.getOrthoAdjacentPositions([0, 0]);
            let expected = [ [0, 1], [1, 0] ];
            expectArraySameIgnoringOrder(result, expected);
        });

        test ('Top-right square', () => {
            let testBoard = new Board(3);
            let result = testBoard.getOrthoAdjacentPositions([2, 0]);
            let expected = [ [1, 0], [2, 1] ];
            expectArraySameIgnoringOrder(result, expected);
        });

        test ('Bottom-left square', () => {
            let testBoard = new Board(3);
            let result = testBoard.getOrthoAdjacentPositions([0, 2]);
            let expected = [ [0, 1], [1, 2] ];
            expectArraySameIgnoringOrder(result, expected);
        });

        test('Bottom-right square', ()=> {
            let testBoard = new Board(3);
            let result = testBoard.getOrthoAdjacentPositions([2, 2]);
            let expected = [ [2, 1], [1, 2] ];
            expectArraySameIgnoringOrder(result, expected);
        });
    });

    describe('Start outside grid', () => {
        test('Right edge', () => {
            let testBoard = new Board(3);
            let result = testBoard.getOrthoAdjacentPositions([-1, 1]);
            let expected = [ [0, 1] ];
            expectArraySameIgnoringOrder(result, expected);
        });
        
        test('Left edge', () => {
            let testBoard = new Board(3);
            let result = testBoard.getOrthoAdjacentPositions([3, 1]);
            let expected = [ [2, 1] ];
            expectArraySameIgnoringOrder(result, expected);
        });

        test('Top edge', () => {
            let testBoard = new Board(3);
            let result = testBoard.getOrthoAdjacentPositions([1, -1]);
            let expected = [ [1, 0] ];
            expectArraySameIgnoringOrder(result, expected);
        });

        test('Bottom edge', () => {
            let testBoard = new Board(3);
            let result = testBoard.getOrthoAdjacentPositions([1, 3]);
            let expected = [ [1, 2] ];
            expectArraySameIgnoringOrder(result, expected);
        });

        test('Corner', () => {
            let testBoard = new Board(3);
            let result = testBoard.getOrthoAdjacentPositions([-1, 3]);
            let expected: Position[] = [ ];
            expectArraySameIgnoringOrder(result, expected);
        });

        test('Distant outside position', () => {
            let testBoard = new Board(3);
            let result = testBoard.getOrthoAdjacentPositions([-2, 15]);
            let expected: Position[] = [ ];
            expectArraySameIgnoringOrder(result, expected);
        });
    });
});

describe('Board.getDiagAdjacentPositions()', () => {
    describe('Start in grid', () => {
        test('Center square', () => {
            let testBoard = new Board(3);
            let result = testBoard.getDiagAdjacentPositions([1, 1]);
            let expected = [ [0, 0], [2, 0], [0, 2], [2, 2] ];
            expectArraySameIgnoringOrder(result, expected);
        });

        test('Right edge square', () => {
            let testBoard = new Board(3);
            let result = testBoard.getDiagAdjacentPositions([2, 1]);
            let expected = [ [1, 0], [1, 2] ];
            expectArraySameIgnoringOrder(result, expected);
        });

        test('Left edge square', () => {
            let testBoard = new Board(3);
            let result = testBoard.getDiagAdjacentPositions([0, 1]);
            let expected = [ [1, 0], [1, 2] ];
            expectArraySameIgnoringOrder(result, expected);
        });

        test('Top edge square', () => {
            let testBoard = new Board(3);
            let result = testBoard.getDiagAdjacentPositions([1, 0]);
            let expected = [ [0, 1], [2, 1] ];
            expectArraySameIgnoringOrder(result, expected);
        });

        test ('Bottom edge square', () => {
            let testBoard = new Board(3);
            let result = testBoard.getDiagAdjacentPositions([1, 2]);
            let expected = [ [0, 1], [2, 1] ];
            expectArraySameIgnoringOrder(result, expected);
        });

        test ('Top-left square', () => {
            let testBoard = new Board(3);
            let result = testBoard.getDiagAdjacentPositions([0, 0]);
            let expected = [ [1, 1] ];
            expectArraySameIgnoringOrder(result, expected);
        });

        test ('Top-right square', () => {
            let testBoard = new Board(3);
            let result = testBoard.getDiagAdjacentPositions([2, 0]);
            let expected = [ [1, 1] ];
            expectArraySameIgnoringOrder(result, expected);
        });

        test ('Bottom-left square', () => {
            let testBoard = new Board(3);
            let result = testBoard.getDiagAdjacentPositions([0, 2]);
            let expected = [ [1, 1] ];
            expectArraySameIgnoringOrder(result, expected);
        });

        test('Bottom-right square', ()=> {
            let testBoard = new Board(3);
            let result = testBoard.getDiagAdjacentPositions([2, 2]);
            let expected = [ [1, 1] ];
            expectArraySameIgnoringOrder(result, expected);
        });
    });

    describe('Start outside grid', () => {
        test('Right edge', () => {
            let testBoard = new Board(3);
            let result = testBoard.getDiagAdjacentPositions([-1, 1]);
            let expected = [ [0, 2], [0, 0] ];
            expectArraySameIgnoringOrder(result, expected);
        });
        
        test('Left edge', () => {
            let testBoard = new Board(3);
            let result = testBoard.getDiagAdjacentPositions([3, 1]);
            let expected = [ [2, 0], [2, 2] ];
            expectArraySameIgnoringOrder(result, expected);
        });

        test('Top edge', () => {
            let testBoard = new Board(3);
            let result = testBoard.getDiagAdjacentPositions([1, -1]);
            let expected = [ [0, 0], [2, 0] ];
            expectArraySameIgnoringOrder(result, expected);
        });

        test('Bottom edge', () => {
            let testBoard = new Board(3);
            let result = testBoard.getDiagAdjacentPositions([1, 3]);
            let expected = [ [0, 2], [2, 2] ];
            expectArraySameIgnoringOrder(result, expected);
        });

        test('Corner', () => {
            let testBoard = new Board(3);
            let result = testBoard.getDiagAdjacentPositions([-1, 3]);
            let expected = [ [0, 2 ] ];
            expectArraySameIgnoringOrder(result, expected);
        });

        test('Distant outside position', () => {
            let testBoard = new Board(3);
            let result = testBoard.getDiagAdjacentPositions([-2, 15]);
            let expected: Position[] = [ ];
            expectArraySameIgnoringOrder(result, expected);
        });
    });
});