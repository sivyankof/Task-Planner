import React from 'react';

class Square extends React.Component {
    search() {
        const { position, winnerCombo } = this.props;

        if (winnerCombo) {
            if (winnerCombo.indexOf(position) !== -1) {
                return 'square bg';
            }
        } 
        return 'square';
    }

    render() {
        return (
            <button
                className={this.search()}
                onClick={() => this.props.onClick(this.props.position)}>
                {this.props.value}
            </button>
        );
    }
}

export default Square;
