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
        {controls.map(control => {
            return <BuildControl key={control.label}
                                 label={control.label}
                                 added={() => props.addIn(control.type)}></BuildControl>
        })}
    </div>
)

export default buildControls;