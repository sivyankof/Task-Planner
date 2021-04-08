import React from 'react';

const Square = (props) => {
    function search() {
        const { position, winnerCombo } = props;

        if (winnerCombo) {
            if (winnerCombo.indexOf(position) !== -1) {
                return 'square bg';
            }
        }
        return 'square';
    }

    return (
        <button className={search()} onClick={() => props.onClick(props.position)}>
            {props.value}
        </button>
    );
};

export default Square;
