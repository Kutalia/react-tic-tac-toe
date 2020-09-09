import React, { useContext } from 'react';
import { resetGame } from '../actions/table';
import { tableContext } from '../utils/common';

export default () => {
    const { state, dispatch } = useContext(tableContext);
    const { winner } = state;

    if (!Number.isInteger(winner)) {
        return null;
    }

    const winnerName = winner === 1 ? 'Tick' : 'Circle';

    return (
        <div className="winner-announcement">
            <h2>{winnerName} has won a game. Congratulations!</h2>
            <button onClick={() => dispatch(resetGame())}>Start Again</button>
        </div>
    );
};
