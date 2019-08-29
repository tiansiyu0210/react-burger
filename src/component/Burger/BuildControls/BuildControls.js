import React from 'react'
import BuildControl from './BuildControl/BuildControl';
import classes from './BuildControls.module.css';

const controls = [
    {label: 'Bacon', type: 'bacon'},
    {label: 'Meat', type: 'meat'},
    {label: 'Salad', type: 'salad'},
    {label: 'Cheese', type: 'cheese'}
]

const buildControls = (props) => (
    <div className={classes.BuildControls}>
        <p>Current Price: <strong>{props.price.toFixed(2)}</strong></p>
        {controls.map(control => {
            return <BuildControl key={control.label}
                                 label={control.label}
                                 added={() => props.addIn(control.type)}
                                 removed={() => props.removeIn(control.type)}
                                 disableInfo={props.disableInfo[control.type]}
            ></BuildControl>
        })}
    </div>
)

export default buildControls;