import React, { useContext } from 'react';
import { updatePosition } from '../actions/table';
import { tableContext } from '../utils/common';

export default () => {
    const { state, dispatch } = useContext(tableContext);
    const { rows: numberOfRows, columns: numberOfColumns, positions, winningPath, winner } = state;
    const rows = Array(numberOfRows);

    for (let i = 0; i < numberOfRows; i++) {
        const columns = new Array(numberOfColumns);

        for (let j = 0; j < numberOfColumns; j++) {
            const position = numberOfColumns * (i) + j;
            const isPositionWinner = winningPath.includes(position);
            columns[j] = <div
                className={`column column--${j} ${isPositionWinner ? 'winner' : ''} ${positions[position] === 1 ? 'tick' : (positions[position] === 0 ? 'circle' : 'empty')}`}
                key={position}
                onClick={() => { !winner && dispatch(updatePosition(position)); }}
            />
        }

        rows[i] = (
            <div className={`row row--${i}`} key={i}>
                {columns}
            </div>
        );
    }

    return (
        <div className="table">
            {rows}
        </div>
    );
}
