import React, { useState } from 'react';
import './index.css';

import Board from './board';

const Game = () => {
    const [history, setHistory] = useState([{ squares: Array(9).fill(null) }]);
    const [finish, setFinish] = useState('');
    const [winnerCombo, setwinnerCombo] = useState([]);
    const [stepNumber, setStepNumber] = useState(0);
    const [xIsNext, setXIsNext] = useState(true);
    const [curtStep, setCurrentStep] = useState(1);

    const handleClick = (i) => {
        const his = [...history];
        const current = his[history.length - 1];
        const squares = current.squares.slice();

        if (calculateWinner(squares) || squares[i]) {
            return;
        }

        squares[i] = xIsNext ? 'X' : 'O';

        currentStep(curtStep);
        setHistory(history.concat([{ squares: squares }]));
        setwinnerCombo(calculateWinner(squares));
        setStepNumber(his.length);
        setXIsNext(!xIsNext);
    };

    const jumpTo = (step) => {
        setStepNumber(step);
        setXIsNext(step % 2 === 0);
    };

    const currentStep = (step) => {
        step++;

        setCurrentStep(step);

        if (curtStep === 9 && winnerCombo === null) {
            setFinish(`Ничья`);
        }
    };

    const Reset = () => {
        setHistory([{ squares: Array(9).fill(null) }]);
        setXIsNext(true);
        setStepNumber(0);
        setwinnerCombo([]);
        setFinish('');
        setCurrentStep(1);
    };

    const calculateWinner = (squares) => {
        const lines = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6],
        ];
        for (let i = 0; i < lines.length; i++) {
            const [a, b, c] = lines[i];
            if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
                setwinnerCombo([a, b, c]);
                setFinish(`Выйграл ${squares[a]}`);

                return [squares[a], lines[i]];
            }
        }
        return null;
    };

    const current = history[stepNumber];

    const moves = history.map((step, move) => {
        const desc = move ? 'Перейти к ходу' + move : 'К началу игры';

        return (
            <li key={move}>
                <button onClick={() => jumpTo(move)}> {desc}</button>
            </li>
        );
    });

    let status = 'Следующий ход: ' + (xIsNext ? 'X' : 'O');

    return (
        <div className='game'>
            <div className='game-board'>
                <Board
                    squares={current.squares}
                    onClick={(i) => handleClick(i)}
                    winnerCombo={winnerCombo}
                />
            </div>
            <div className='game-info'>
                <div>{finish || status}</div>
                <ol>{moves}</ol>
                <button onClick={() => Reset()}>Рестарт </button>
            </div>
        </div>
    );
};

export default Game;
