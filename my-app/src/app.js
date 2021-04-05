import React from 'react';
import './index.css';

import Board from './board';

class Game extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            history: [
                {
                    squares: Array(9).fill(null),
                },
            ],
            xIsNext: true,
            stepNumber: 0,
            winnerConmo: [],
            finish: '',
            currentStep: 1,
        };
    }

    jumpTo(step) {
        this.setState({
            stepNumber: step,
            xIsNext: step % 2 === 0,
        });
    }

    handleClick(i) {
        const history = this.state.history.slice(0, this.state.stepNumber + 1);
        const current = history[history.length - 1];
        const squares = current.squares.slice();

        if (this.calculateWinner(squares) || squares[i]) {
            return;
        }

        squares[i] = this.state.xIsNext ? 'X' : 'O';

        this.currentStep(this.state.currentStep);

        this.setState({
            history: history.concat([
                {
                    squares: squares,
                },
            ]),
            winnerConmo: this.calculateWinner(squares),
            stepNumber: history.length,
            xIsNext: !this.state.xIsNext,
        });
    }

    currentStep(step) {
        step++;

        this.setState({
            currentStep: step,
        });
        if (this.state.currentStep === 9 && this.state.winnerConmo === null) {
            this.setState({
                finish: `Ничья`,
            });
        }

    }

    Reset() {
         this.setState({
            history: [
                {
                    squares: Array(9).fill(null),
                },
            ],
            xIsNext: true,
            stepNumber: 0,
            winnerConmo: [],
            finish: '',
            currentStep: 1,
        });
    }

    calculateWinner(squares) {
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
                this.setState({
                    winnerCombo: [a, b, c],
                    finish: `Выйграл ${squares[a]}`,
                });

                return [squares[a], lines[i]];
            }
        }
        return null;
    }

    render() {
        const history = this.state.history;
        const current = history[this.state.stepNumber];

        const moves = history.map((step, move) => {
            const desc = move ? 'Перейти к ходу' + move : 'К началу игры';
            return (
                <li key={move}>
                    <button onClick={() => this.jumpTo(move)}> {desc}</button>
                </li>
            );
        });

        let status = 'Следующий ход: ' + (this.state.xIsNext ? 'X' : 'O');

        return (
            <div className='game'>
                <div className='game-board'>
                    <Board
                        squares={current.squares}
                        onClick={(i) => this.handleClick(i)}
                        winnerCombo={this.state.winnerCombo}
                    />
                </div>
                <div className='game-info'>
                    <div>{this.state.finish || status}</div>
                    <ol>{moves}</ol>
                    <button onClick={() => this.Reset()}>Рестарт </button>
                </div>
            </div>
        );
    }
}

export default Game;
