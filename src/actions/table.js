export const updateTableSides = (rows, columns) => ({
    type: 'UPDATE_TABLE_SIDES',
    rows,
    columns
});

export const updateWinningLength = (winningLength) => ({
    type: 'UPDATE_WINNING_LENGTH',
    winningLength
});

export const updatePosition = (position) => ({
    type: 'UPDATE_POSITION',
    position
});

export const resetGame = () => ({
    type: 'RESET_GAME'
});
