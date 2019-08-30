import React from 'react';
import Aux from '../../../hoc/Aux'
import Button from '../../UI/Button/Button'

const orderSummary = (props) => {
    const ig = Object.keys(props.ingredients)
        .map(igKey => {
            return (<li key={igKey}>
                     <span style={{textTransform: 'capitalize'}}> {igKey} </span>: {props.ingredients[igKey]}
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
            <p>checkout?</p>
            <Button btnType="Success" clicked={props.pay}>Pay</Button>
            <Button btnType="Danger" clicked={props.cancel}>Cancel</Button>
        </Aux>
    )

};


export default orderSummary;