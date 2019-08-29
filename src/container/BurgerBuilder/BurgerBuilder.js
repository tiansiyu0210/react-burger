import React, { Component } from 'react';
import Aux from '../../hoc/Aux';
import Burger from '../../component/Burger/Burger';
import BuilderControls from '../../component/Burger/BuildControls/BuildControls'

const INGREDIENT_PRICE ={
    bacon: 1.7,
    salad: 1.2,
    cheese: 0.5,
    meat: 2
}

class BurgerBuilder extends Component {
    // constructor(props){
    //     super(props);
    //     this.state = {};
    // }

    state = {
        ingredients: {
            bacon: 0,
            salad: 0,
            cheese: 0,
            meat: 0
        },
        price: 4
    }

    addIngredient = (type) => {
        const oldIn = this.state.ingredients[type];
        const updatedIn = oldIn + 1;
        const copyIn = {...this.state.ingredients};
        copyIn[type] = updatedIn;

        const priceAdd = INGREDIENT_PRICE[type];
        const oldPrice = this.state.price;
        const newPrice = oldPrice + priceAdd;

        this.setState({price: newPrice, ingredients: copyIn});
    }

    render() {
        return (
            <Aux>
                <Burger ingredients={this.state.ingredients}/>
                <BuilderControls addIn={this.addIngredient}></BuilderControls>
            </Aux>
        )
    }
}

export default BurgerBuilder;