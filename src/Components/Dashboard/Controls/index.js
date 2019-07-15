import React, {Component} from 'react';
import Button from "@material-ui/core/Button";
import './control.css'


export default class Control extends Component {
    state = {
        value: ''
    };

    handleChange = (e) => {
        const value = e.target.validity.valid ? e.target.value : this.state.value;
        this.setState({value});
    };

    handleClick = (flag) => {
        this.props.option(flag, this.state.value)
    };

    render (){

        return (
            <section className="controls">
                <input
                    value={this.state.value}
                    type="text"
                    pattern="[0-9]*"
                    onChange={this.handleChange}
                />
                <Button
                    variant="contained"
                    color="primary"
                    onClick={()=>this.handleClick(true)}>
                    Deposit
                </Button>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={()=>this.handleClick(false)}>
                    Withdraw
                </Button>
            </section>
        )
    }
}