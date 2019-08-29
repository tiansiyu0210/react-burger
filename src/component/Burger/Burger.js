import React from 'react';
import BurgerIngredient from "./BurgerIngredient/BurgerIngredient";
import classes from './Burger.module.css';

const burger = (props) => {
    const burgerIngredient = Object.keys(props.ingredients)
        .map(biKey => {
            return [...Array(props.ingredients[biKey])].map(
                (_, i) => {
                    return <BurgerIngredient key={biKey + i} type={biKey}></BurgerIngredient>
                });
        });

    console.log(burgerIngredient);


    return (
        <div className={classes.Burger}>
            <BurgerIngredient type={'bread-top'}></BurgerIngredient>
            {burgerIngredient}
            <BurgerIngredient type={'bread-bottom'}></BurgerIngredient>
        </div>
    );
};

export default burger;