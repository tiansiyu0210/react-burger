import React from 'react';
import classes from './Order.module.css'

const order = (props) => {

    const ingredients = [];

    for(let i in props.ingredients){
        ingredients.push(
            {
                name: i,
                amount: props.ingredients[i]
            }
        )
    }

    const output = ingredients.map(ig => {
        return <span key={ig.name}>{ig.name} ({ig.amount})</span>
    })

    return (
        <div className={classes.Order}>
            <p>Ingredients: {output}</p>
            <p>Price: <strong>USD: {Number.parseFloat(props.price).toFixed(2)}</strong></p>
        </div>
    )

};

export default order;