import React from 'react';
import Square from './square';

class Board extends React.Component {
    renderSquare(i) {
        return <Square value={this.props.squares[i]} onClick={() => this.props.onClick(i)} />;
    }

    // resetGame() {
    //     const squares = Array(9).fill(null);
    //     this.setState({ squares: squares });
    // }

    render() {
        return (
            <div>
                <div className='board-row'>
                    {this.renderSquare(0)}
                    {this.renderSquare(1)}
                    {this.renderSquare(2)}
                </div>
                <div className='board-row'>
                    {this.renderSquare(3)}
                    {this.renderSquare(4)}
                    {this.renderSquare(5)}
                </div>
                <div className='board-row'>
                    {this.renderSquare(6)}
                    {this.renderSquare(7)}
                    {this.renderSquare(8)}
                </div>
                {/* <div>
                    <button onClick={() => this.resetGame()}>Сбросить</button>
                </div> */}
            </div>
        );
    }
}

export default Board;
