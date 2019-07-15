import React from 'react';
import './balance.css';

const Balance = (props) => {

    const { balance, deposit, withdraw } = props;
        return (
        <section className="balance">
            <span>⬆️{deposit}$</span>
            <span>⬇️{withdraw}$</span>
            <span>Balance: {balance}$</span>
        </section>
    )
}

export default Balance;