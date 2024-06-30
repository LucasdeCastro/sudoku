import {
  createEmptySudokuBoard,
  createSudokuBoard,
  getRandomList,
  isValidSudokuBoard,
} from "./sudoku";

describe("sudoku", () => {
  it("createSudokuBoard", () => {
    console.log({
      board: createSudokuBoard(),
    });
  });

  it("getRandomList", () => {
    const list = getRandomList();
    expect(list.length).toBe(9);
    expect(new Set(list).size).toBe(9);
  });

  it("createEmptySudokuBoard", () => {
    expect(createEmptySudokuBoard()).toMatchObject([
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
    ]);
  });

  it("isValidSudokuBoard", () => {
    const valid = [
      [5, 3, 4, 6, 7, 8, 9, 1, 2],
      [6, 7, 2, 1, 9, 5, 3, 4, 8],
      [1, 9, 8, 3, 4, 2, 5, 6, 7],
      [8, 5, 9, 7, 6, 1, 4, 2, 3],
      [4, 2, 6, 8, 5, 3, 7, 9, 1],
      [7, 1, 3, 9, 2, 4, 8, 5, 6],
      [9, 6, 1, 5, 3, 7, 2, 8, 4],
      [2, 8, 7, 4, 1, 9, 6, 3, 5],
      [3, 4, 5, 2, 8, 6, 1, 7, 9],
    ];

    const invalid = [
      [4, 5, 3, 9, 0, 8, 6, 7, 2],
      [1, 6, 8, 3, 4, 5, 5, 9, 7],
      [3, 7, 6, 1, 5, 4, 2, 8, 9],
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
    ];

    // valid[0][0] = 0;
    // expect(isValidSudokuBoard(valid, 0, 0, 5)).toBe(true);

    // valid[0][0] = 5;
    // expect(isValidSudokuBoard(valid, 0, 0, 5)).toBe(false);

    valid[0][4] = 0;
    expect(isValidSudokuBoard(invalid, 0, 0, 1)).toBe(true);
  });
});
