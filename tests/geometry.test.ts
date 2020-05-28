import { DirectionToMovement, Direction } from "../src/geometry";

describe('DirectionToMovement()', () => {
    test('Up', () => {
        expect(DirectionToMovement(Direction.Up)).toStrictEqual([0, -1]);
    });
    test('Down', () => {
        expect(DirectionToMovement(Direction.Down)).toStrictEqual([0, 1]);
    });
    test('Left', () => {
        expect(DirectionToMovement(Direction.Left)).toStrictEqual([-1, 0]);
    });
    test('Right', () => {
        expect(DirectionToMovement(Direction.Right)).toStrictEqual([1, 0]);
    });
    test('UpLeft', () => {
        expect(DirectionToMovement(Direction.UpLeft)).toStrictEqual([-1, -1]);
    });
    test('UpRight', () => {
        expect(DirectionToMovement(Direction.UpRight)).toStrictEqual([1, -1]);
    });
    test('DownLeft', () => {
        expect(DirectionToMovement(Direction.DownLeft)).toStrictEqual([-1, 1]);
    });
    test('DownRight', () => {
        expect(DirectionToMovement(Direction.DownRight)).toStrictEqual([1, 1]);
    });
});