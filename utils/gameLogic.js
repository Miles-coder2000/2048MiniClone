export function initializeGrid(size) {
  const grid = Array(size).fill().map(() =>
    Array(size).fill({ value: 0, isNew: false, hasMerged: false })
  );
  addRandomTile(grid);
  addRandomTile(grid);
  return grid;
}

export function addRandomTile(grid) {
  const emptyCells = [];
  grid.forEach((row, r) =>
    row.forEach((cell, c) => {
      if (cell.value === 0) emptyCells.push([r, c]);
    })
  );
  if (emptyCells.length === 0) return;
  const [r, c] = emptyCells[Math.floor(Math.random() * emptyCells.length)];
  grid[r][c] = { value: Math.random() < 0.9 ? 2 : 4, isNew: true, hasMerged: false };
}

function slideAndMergeRow(arr) {
  const newRow = arr.filter(c => c.value !== 0);
  let score = 0;
  let mergedRow = [];

  for (let i = 0; i < newRow.length; i++) {
    if (i < newRow.length - 1 && newRow[i].value === newRow[i + 1].value) {
      const mergedValue = newRow[i].value * 2;
      mergedRow.push({ value: mergedValue, isNew: false, hasMerged: true });
      score += mergedValue;
      i++; // skip next tile
    } else {
      mergedRow.push({ ...newRow[i], isNew: false, hasMerged: false });
    }
  }

  while (mergedRow.length < arr.length) mergedRow.push({ value: 0, isNew: false, hasMerged: false });
  return { row: mergedRow, score };
}

export function moveTiles(grid, direction) {
  let newGrid = grid.map(row => [...row]);
  let score = 0;

  const rotateGrid = (g) => g[0].map((_, i) => g.map(row => row[i]));
  const processRow = (arr) => {
    const { row, score: rowScore } = slideAndMergeRow(arr);
    score += rowScore;
    return row;
  };

  if (direction === 'left') newGrid = newGrid.map(processRow);
  else if (direction === 'right') newGrid = newGrid.map(row => processRow(row.reverse()).reverse());
  else if (direction === 'up') {
    let rotated = rotateGrid(newGrid);
    rotated = rotated.map(processRow);
    newGrid = rotateGrid(rotated);
  } else if (direction === 'down') {
    let rotated = rotateGrid(newGrid);
    rotated = rotated.map(col => processRow(col.reverse()).reverse());
    newGrid = rotateGrid(rotated);
  }

  addRandomTile(newGrid);
  return { newGrid, newScore: score };
}

export function isGameOver(grid) {
  for (let r = 0; r < grid.length; r++) {
    for (let c = 0; c < grid[0].length; c++) {
      if (grid[r][c].value === 0) return false;
      if (r < grid.length - 1 && grid[r][c].value === grid[r + 1][c].value) return false;
      if (c < grid[0].length - 1 && grid[r][c].value === grid[r][c + 1].value) return false;
    }
  }
  return true;
}
