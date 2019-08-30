import React, { Component } from 'react';
import Aux from '../../hoc/Aux';
import Burger from '../../component/Burger/Burger';
import BuilderControls from '../../component/Burger/BuildControls/BuildControls'
import Modal from '../../component/UI/Modal/Modal';
import OrderSummary from '../../component/Burger/OrderSummary/OrderSummary'

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
        price: 4,
        purchase: false,
        ordering: false
    }

    updatePurchase(curIngredient) {
        const ingredientList = {
            ...curIngredient
        };

        const sum = Object.keys(ingredientList)
            .map(igKey => {
                return ingredientList[igKey];
            })
            .reduce((sum, el) =>{
                return sum + el
            },0)

        this.setState({purchase: sum > 0})
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

        this.updatePurchase(copyIn);
    }

    removeIngredient = (type) => {
        const oldIn = this.state.ingredients[type];
        if(oldIn <= 0){
            return
        }
        const updatedIn = oldIn - 1;
        const copyIn = {...this.state.ingredients};
        copyIn[type] = updatedIn;

        const priceAdd = INGREDIENT_PRICE[type];
        const oldPrice = this.state.price;
        const newPrice = oldPrice - priceAdd;

        this.setState({price: newPrice, ingredients: copyIn});

        this.updatePurchase(copyIn);
    }

    orderHandler = () => {
        this.setState({ordering: true});
    }

    render() {
        const disableInfo = {
            ...this.state.ingredients
        }

        for(let key in disableInfo){
            disableInfo[key] = disableInfo[key] <= 0
        }

        return (
            <Aux>
                <Modal ordering={this.state.ordering}>
                    <OrderSummary ingredients={this.state.ingredients}/>
                </Modal>
                <Burger ingredients={this.state.ingredients}/>
                <BuilderControls addIn={this.addIngredient}
                                 removeIn={this.removeIngredient}
                                 disableInfo={disableInfo}
                                 price={this.state.price}
                                 purchasable={this.state.purchase}
                                 ordering={this.orderHandler}
                ></BuilderControls>
            </Aux>
        )
    }
}

export default BurgerBuilder;