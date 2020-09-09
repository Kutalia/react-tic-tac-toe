import React, { useState, useContext } from 'react';
import TableOption from './TableOption';
import { updateTableSides, updateWinningLength, resetGame } from '../actions/table';
import { tableContext, tableDefaults } from '../utils/common';

export default () => {
    const { state, dispatch } = useContext(tableContext);
    const [rows, setRows] = useState(state.rows);
    const [columns, setColumns] = useState(state.columns);
    const [winningLength, setWinningLength] = useState(state.winningLength);

    const applyChangesHandler = () => {
        dispatch(updateTableSides(rows, columns));

        const maxPossibleWinningLength = Math.max(columns, rows);

        if (winningLength <= maxPossibleWinningLength) {
            dispatch(updateWinningLength(winningLength));
        } else {
            setWinningLength(maxPossibleWinningLength);
            dispatch(updateWinningLength(maxPossibleWinningLength));
        }
        dispatch(resetGame());
    }

    return (
        <div className="options">
            <div className="form-control">
                <label htmlFor="rows">Number of rows</label>
                <br />
                <TableOption id="rows" placeholder="Number of rows" value={rows} min={tableDefaults.rows} setOption={setRows} />
            </div>
            <div className="form-control">
                <label htmlFor="columns">Number of columns</label>
                <br />
                <TableOption id="columns" placeholder="Number of columns" value={columns} min={tableDefaults.columns} setOption={setColumns} />
            </div>
            <div className="form-control">
                <label htmlFor="winning-length">Winning length</label>
                <br />
                <TableOption id="winning-length" placeholder="Winning length" value={winningLength} min={tableDefaults.winningLength}
                    max={Math.max(columns, rows)} setOption={setWinningLength} />
            </div>
            <button onClick={applyChangesHandler}>Apply</button>
        </div>
    )
};
