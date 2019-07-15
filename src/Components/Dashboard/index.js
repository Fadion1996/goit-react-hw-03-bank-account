import React, { Component, Fragment } from 'react';
import './dashboard.css'
import Balance from './Balance';
import Controls from './Controls';
import TransactionHistory from './TransactionHistory';
import shortid from 'shortid'

export default class MoviePage extends Component {

    state = {
        history: [],
        balance: 0,
        deposit: 0,
        withdraw: 0
    };

    setHistory = (flag, value) => {
        const { balance, withdraw, deposit} = this.state;
        let valid = true;
        if (parseInt(value)) {
            let type = '',
                date = new Date(Date.now()).toLocaleString();
            date = date.substring(0, date.length - 3);

            if (flag) {
                type = 'Deposit';
                this.setState({balance: balance + parseInt(value)})
                this.setState({deposit: deposit + parseInt(value)});
                localStorage.setItem('balance', balance);
                localStorage.setItem('deposit', deposit);
            } else {
                type = 'Withdrawal';
                if (balance - parseInt(value) < 0 || (parseInt(localStorage.getItem('balance')) - parseInt(value)) < 0) {
                    valid = false;
                    alert('На счету недостаточно средств для проведения операции!');
                } else {
                    localStorage.setItem('balance', balance);
                    localStorage.setItem('withdraw', withdraw);
                    this.setState({balance: balance - parseInt(value)});
                    this.setState({withdraw: withdraw + parseInt(value)});
                }
            }

            if (valid) {
                let newAction = {
                    id: shortid.generate(),
                    type: type,
                    amount: value,
                    date: date
                };

                this.setState({
                    history: [...this.state.history, newAction],
                });
                //localStorage.setItem('history', JSON.stringify(this.state.history));
            }
        } else {
            alert('Введите сумму для проведения операции!');
        }
    };

    componentWillUpdate(){
        localStorage.setItem('history', JSON.stringify(this.state.history));
    }


    render () {
        const {balance, withdraw, deposit, history} = this.state;
        return (
            <div className="dashboard" >
                <Controls option = {this.setHistory}/>
                    {localStorage.getItem('history') ? (
                        <Fragment>
                            <Balance balance = {localStorage.getItem('balance')} 
                            withdraw = {localStorage.getItem('withdraw')} 
                            deposit = {localStorage.getItem('deposit')}/>
                            <TransactionHistory history = {JSON.parse(localStorage.getItem('history'))}/>
                        </Fragment>
                    ) : (
                        <Fragment>
                            <TransactionHistory history = {history}/>
                            <Balance balance = {balance} withdraw = {withdraw} deposit = {deposit}/>
                        </Fragment>
                    )}
            </div>
        )
    }
}
