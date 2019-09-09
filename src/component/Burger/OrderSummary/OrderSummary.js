import React, {Component} from 'react';
import Aux from '../../../hoc/Aux/Aux'
import Button from '../../UI/Button/Button'

class OrderSummary extends Component {
    componentWillUpdate(){
        console.log('[OrderSummary] componentWillUpdate')
    }


    render() {
        const ig = Object.keys(this.props.ingredients)
            .map(igKey => {
                return (
                    <li key={igKey}>
                        <span style={{textTransform: 'capitalize'}}> {igKey} </span>: {this.props.ingredients[igKey]}
                    </li>
                )
            });

        return (
            <Aux>
                <h3>Your Order:</h3>
                <p>Ingredients list:</p>
                <ul>
                    {ig}
                </ul>
                <p>amount is <strong>${this.props.price.toFixed(2)}</strong>, please checkout</p>
                <Button btnType="Success" clicked={this.props.pay}>Pay</Button>
                <Button btnType="Danger" clicked={this.props.cancel}>Cancel</Button>
            </Aux>
        )
    }
};


export default OrderSummary;