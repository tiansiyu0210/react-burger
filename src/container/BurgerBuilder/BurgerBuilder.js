import React, { Component } from 'react';
import Aux from '../../hoc/Aux';
import Burger from '../../component/Burger/Burger';
import BuilderControls from '../../component/Burger/BuildControls/BuildControls'


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
        }
    }

    render() {
        return (
            <Aux>
                <Burger ingredients={this.state.ingredients}/>
                <BuilderControls></BuilderControls>
            </Aux>
        )
    }
}

export default BurgerBuilder;