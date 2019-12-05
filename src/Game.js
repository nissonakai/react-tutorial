import React, { useState } from 'react';

import { calculateWinner } from './util/calculateWinner';
import { calculatePosition } from './util/calculatePosition'
import { Board } from './components/Board';

export const Game = () => {
    const [history, setHistory] = useState([{
        squares: Array(9).fill(null)
    }]);
    const [stepNumber, setStepNumber] = useState(0);
    const [xIsNext, setxIsNext] = useState(true);
    const [positions, setPositions] = useState([]);

    const handleClick = position => {
        const historyCurrentUtil = history.slice(0, stepNumber + 1);
        const current = historyCurrentUtil[historyCurrentUtil.length - 1];
        const squares = current.squares.slice();
        const positionList = positions.slice();
        if(calculateWinner(squares) || squares[position]) {
            return;
        }
        squares[position] = xIsNext ? 'X': 'O';
        positionList.push(calculatePosition(position));
        setHistory(historyCurrentUtil.concat([{
            squares: squares
        }]));
        setPositions(positionList);
        setStepNumber(historyCurrentUtil.length);
        setxIsNext(!xIsNext);
        console.log(positions);
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
            console.log(move);
        return (
            <li key={move}>
                <button onClick={() => jumpTo(move)}>{desc}</button> {positions[move - 1]}
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
