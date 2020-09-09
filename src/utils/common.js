import { createContext } from 'react';

const adjacentDirectionsByOrientation = {
    horizontal: ['left', 'right'],
    vertical: ['bottom', 'top'],
    diagonal_45_Degrees: ['bottomLeft', 'topRight'],
    diagonal_135_Degrees: ['bottomRight', 'topLeft']
};

function getReverseDirection(direction) {
    for (const orientation in adjacentDirectionsByOrientation) {
        if (adjacentDirectionsByOrientation.hasOwnProperty(orientation)) {
            const directions = adjacentDirectionsByOrientation[orientation];
            if (directions.includes(direction)) {
                return directions.filter(currentDirection => currentDirection !== direction)[0];
            }
        }
    }
}

function getAdjacentPositions(position, rows, columns) {
    const row = Math.ceil((position + 1) / columns); // adding 1 since position is zero-based
    const column = (position + 1) % columns || columns;

    const hasRightAdjacent = column < columns;
    const hasLeftAdjacent = column > 1;
    const hasTopAdjacent = row > 1;
    const hasBottomAdjacent = row < rows;

    return {
        right: hasRightAdjacent && (position + 1),
        left: hasLeftAdjacent && (position - 1),
        top: hasTopAdjacent && (position - columns),
        bottom: hasBottomAdjacent && (position + columns),
        topRight: hasTopAdjacent && hasRightAdjacent && (position - columns + 1),
        topLeft: hasTopAdjacent && hasLeftAdjacent && (position - columns - 1),
        bottomRight: hasBottomAdjacent && hasRightAdjacent && (position + columns + 1),
        bottomLeft: hasBottomAdjacent && hasLeftAdjacent && (position + columns - 1)
    };
};

function recursiveAdjacentsCheck({ position, positions, winningLength, winningPath, direction, rows, columns }) {
    if (winningPath.length === winningLength) {
        return winningPath;
    }

    const adjacentPositions = getAdjacentPositions(position, rows, columns);
    const adjacentPosition = adjacentPositions[direction];

    if (adjacentPosition !== false && positions[position] === positions[adjacentPosition]) {
        winningPath.push(adjacentPosition);
        if (winningPath.length === winningLength) {
            return winningPath;
        }
        return recursiveAdjacentsCheck({ position: adjacentPosition, positions, winningLength, winningPath, direction, rows, columns });
    }
    return winningPath;
}

export function checkForWinningPath({ position, positions, winningLength, rows, columns }) {
    const adjacentPositions = getAdjacentPositions(position, rows, columns);

    let winningPath, winningReversePath;

    for (const direction in adjacentPositions) {
        winningPath = [position];

        if (adjacentPositions[direction] !== false) {
            winningPath = recursiveAdjacentsCheck({ position, positions, winningLength, winningPath, direction, rows, columns });
            if (winningPath.length === winningLength) {
                return winningPath;
            }
        }

        const reverseDirection = getReverseDirection(direction);
        if (adjacentPositions[reverseDirection] !== false) {
            winningReversePath = recursiveAdjacentsCheck({ position, positions, winningLength, winningPath: [position], direction: reverseDirection, rows, columns });
            if (winningReversePath.length === winningLength) {
                return winningReversePath;
            }

            winningPath.shift(); // remove initial position from one of paths to avoid duplication
            if (!winningPath.length) {
                winningPath = [];
            }
            winningPath = winningPath.concat(winningReversePath);
            if (winningPath.length === winningLength) {
                return winningPath;
            }
        }
    }

    return tableDefaults.winningPath;
}

export const tableDefaults = {
    currentTurn: 1,
    rows: 3,
    columns: 3,
    positions: new Array(9),
    winningLength: 3,
    winningPath: [],
    winner: undefined
};

export const tableContext = createContext();
