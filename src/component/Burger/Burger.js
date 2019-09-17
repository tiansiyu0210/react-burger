import React from 'react';
import BurgerIngredient from "./BurgerIngredient/BurgerIngredient";
import classes from './Burger.module.css';
import { withRouter } from 'react-router-dom';

const burger = (props) => {
    console.log(props);
    let burgerIngredient = Object.keys(props.ingredients)
        .map(biKey => {
            return [...Array(props.ingredients[biKey])].map(
                (_, i) => {
                    return <BurgerIngredient key={biKey + i} type={biKey}></BurgerIngredient>
                });
        }).reduce((arr, el) => {
            return arr.concat(el)
        }, []);

    //let merge = [].concat.apply([], burgerIngredient);

    console.log("=========");
    console.log(burgerIngredient);
    //console.log(merge);

    if(burgerIngredient.length === 0){
        burgerIngredient = <p>please start adding ingredient! </p>
    }

    return (
        <div className={classes.Burger}>
            <BurgerIngredient type={'bread-top'}></BurgerIngredient>
            {burgerIngredient}
            <BurgerIngredient type={'bread-bottom'}></BurgerIngredient>
        </div>
    );
};

export default withRouter(burger);//wrap with withRouter the Burger component will have history location and match in the props, the data from the nearest route