import React from 'react';
import Aux from '../../../hoc/Aux'

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
        </Aux>
    )

};


export default orderSummary;