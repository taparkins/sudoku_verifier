
export function expectArraySameIgnoringOrder(a1: any[], a2: any[]): void {
    expect(a1).toEqual(expect.arrayContaining(a2));
    expect(a2).toEqual(expect.arrayContaining(a1));
    expect(a1.length).toBe(a2.length);
}