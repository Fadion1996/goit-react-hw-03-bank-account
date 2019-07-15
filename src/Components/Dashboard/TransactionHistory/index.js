import React from 'react';
import './transaction-history.css'

const TransactionHistory = (props) => {
    const {history} = props;

    return (
        <table className="history">
            <thead>
            <tr>
                <th>Transaction</th>
                <th>Amount</th>
                <th>Date</th>
            </tr>
            </thead>
            <tbody>
            {
                history.map((item) => {
                    return (
                        <tr key={item.id}>
                            <td>{item.type}</td>
                            <td>{item.amount}.00$</td>
                            <td>{item.date}</td>
                        </tr>
                    )
                })
            }
            </tbody>
        </table>
    )
}

export default TransactionHistory