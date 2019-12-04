import React, { useState } from 'react';

import { calculateWinner } from './util/calculateWinner';
import { Board } from './components/Board';

export const Game = () => {
    const [history, setHistory] = useState([{
        squares: Array(9).fill(null)
    }]);
    const [stepNumber, setStepNumber] = useState(0);
    const [xIsNext, setxIsNext] = useState(true);

    const handleClick = i => {
        const historyCurrentUtil = history.slice(0, stepNumber + 1);
        const current = historyCurrentUtil[historyCurrentUtil.length - 1];
        const squares = current.squares.slice();
        if(calculateWinner(squares) || squares[i]) {
            return;
        }
        squares[i] = xIsNext ? 'X': 'O';
        setHistory(historyCurrentUtil.concat([{
            squares: squares
        }]));
        setStepNumber(historyCurrentUtil.length);
        setxIsNext(!xIsNext);
    };

    const jumpTo = step => {
        setStepNumber(step);
        setxIsNext((step % 2) === 0);
    };


    const current = history[stepNumber];
    const winner = calculateWinner(current.squares);
    
    const moves = history.map((step, move) => {
        const desc = move ?
            `Go to move # ${move}`:
            'Go to game start';
        return (
            <li key={move}>
                <button onClick={() => jumpTo(move)}>{desc}</button>
            </li>
        );
    });

    let status;
    if (winner) {
        status = `Winner: ${winner}`;
    } else {
        status = `Next player: ${ xIsNext ? 'X': 'O'}`;
    }

    return (
        <div className="game">
            <div className="game-board">
                <Board 
                    squares={current.squares}
                    onClick={i => handleClick(i)}/>
            </div>
            <div className="game-info">
            <div>{status}</div>
            <ol>{moves}</ol>
            </div>
        </div>
    );
}
