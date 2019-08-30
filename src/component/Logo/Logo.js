import React from 'react';
import BurgerLogo from '../../assets/image/burger-logo.png'
import classes from './Logo.module.css'

const logo = (props) => (
    <div className={classes.Logo}>
        <img src={BurgerLogo} alt="myBurgerLogo"/>
    </div>
)

export default logo;