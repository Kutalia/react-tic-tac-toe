import { checkForWinningPath, tableDefaults } from '../utils/common';

export default (state, action) => {
    switch (action.type) {
        case 'UPDATE_TABLE_SIDES':
            return {
                ...state,
                rows: action.rows,
                columns: action.columns
            };
        case 'UPDATE_WINNING_LENGTH':
            return {
                ...state,
                winningLength: action.winningLength
            };
        case 'UPDATE_POSITION':
            const { positions, winningLength, rows, columns, currentTurn } = state;
            const { position } = action;

            state.positions.splice(action.position, 1, state.currentTurn);

            const winningPath = checkForWinningPath({ position, positions, winningLength, rows, columns });

            return {
                ...state,
                currentTurn: state.currentTurn === 1 ? 0 : 1,
                winningPath,
                winner: winningPath.length ? currentTurn : undefined
            };
        case 'RESET_GAME':
            return {
                ...tableDefaults,
                positions: new Array(state.rows * state.columns),
                rows: state.rows,
                columns: state.columns,
                winningLength: state.winningLength
            };
        default:
            return state;
    }
};