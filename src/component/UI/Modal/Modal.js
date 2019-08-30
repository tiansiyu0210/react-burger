import React from 'react';
import classes from './Modal.module.css'

const modal = (props) => (
    <div className={classes.Modal} style={{
        transform: props.ordering ? 'translateY(0)' : 'translateY(-100vh)',
        opacity: props.ordering ? '1' : '0'
    }}>
        {props.children}
    </div>
);

export default modal;