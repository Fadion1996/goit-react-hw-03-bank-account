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
            } else {
                type = 'Withdrawal';
                if (balance - parseInt(value) < 0) {
                    valid = false;
                    alert('На счету недостаточно средств для проведения операции!');
                } else {
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
            }
        } else {
            alert('Введите сумму для проведения операции!');
        }
    };

    componentDidUpdate(){
        localStorage.setItem('stateApp', JSON.stringify(this.state));
    }

    componentDidMount(){
        if (localStorage.getItem('stateApp')){
            const {history, balance, deposit, withdraw} = JSON.parse(localStorage.getItem('stateApp'));
            history.map((action)=>{
                this.setState(state => {
                    const history = [...state.history, action];
                    return {history}
                });
            });

            this.setState({
                balance: balance,
                deposit: deposit,
                withdraw: withdraw
            })
        }
    }

    render () {
        const {balance, withdraw, deposit, history} = this.state;
        return (
            <div className="dashboard" >
                <Controls option = {this.setHistory}/>
                <Balance balance = {balance} withdraw = {withdraw} deposit = {deposit}/>
                <TransactionHistory history = {history}/>
            </div>
        )
    }
}
