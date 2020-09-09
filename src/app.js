import React, { useReducer } from 'react';
import ReactDOM from 'react-dom';
import './styles/styles.css';
import { tableDefaults, tableContext } from './utils/common';
import tableReducer from './reducers/table';
import TableOptions from './components/TableOptions';
import Table from './components/Table';
import WinnerAnnouncement from './components/WinnerAnnouncement';

const App = () => {
    const [state, dispatch] = useReducer(tableReducer, tableDefaults);

    return (
        <>
            <div className="header">
                <h1>Welcome to React Tic Tac Toe</h1>
            </div>
            <div className="main">
                <tableContext.Provider value={{ state, dispatch }}>
                    <TableOptions />
                    <Table />
                    <WinnerAnnouncement />
                </tableContext.Provider>
            </div>
        </>
    );
};

ReactDOM.render(<App />, document.getElementById('app'));
