import React, { Component } from 'react';
import Aux from '../../hoc/Aux/Aux';
import Burger from '../../component/Burger/Burger';
import BuilderControls from '../../component/Burger/BuildControls/BuildControls'
import Modal from '../../component/UI/Modal/Modal';
import OrderSummary from '../../component/Burger/OrderSummary/OrderSummary'
import axios from '../../axios-orders';
import Spinner from '../../component/UI/Spinner/Spinner'
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";

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
        ingredients: null,
        price: 4,
        purchase: false,
        ordering: false,
        loading: false,
        error: false
    }
    componentDidMount() {
        console.log(this.props);

        axios.get('https://react-burger-tian.firebaseio.com/ingredinets.json')
            .then(response => {
                this.setState({ingredients: response.data})
            })
            .catch(error => {
                this.setState({error: true});
            });
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
    cancelOrderHandler = () => {
        this.setState({ordering: false});
    }

    payOrderHandler = () => {
        //alert('you pay successfully');
        // this.setState({loading: true});
        // const order = {
        //     ingredients: this.state.ingredients,
        //     price: this.state.price,
        //     customer: {
        //         name: 'tian',
        //         address: {
        //             street: 'moringside',
        //             zipCode: '22332'
        //         },
        //         email: 'test@gmail.com',
        //     },
        //     deliveryMethod: 'fast'
        // };
        //
        // axios.post('/orders.json', order)
        //     .then( response => {
        //         console.log(response);
        //         this.setState({loading: false, ordering: false});
        //     })
        //     .catch(error => {
        //         this.setState({loading: false, ordering: false});
        //         console.log(error);
        //     });

        const queryParam = [];
        for(let i in this.state.ingredients){
            queryParam.push(encodeURIComponent(i) + '=' + encodeURIComponent(this.state.ingredients[i]))
        }

        const queryString = queryParam.join('&');

        this.props.history.push({
            pathname: '/checkout',
            search: '?' + queryString
        });
    }

    render() {
        const disableInfo = {
            ...this.state.ingredients
        }

        for(let key in disableInfo){
            disableInfo[key] = disableInfo[key] <= 0
        }

        let orderSummary = null;

        let burger = this.state.error ? <p>Ingredients cannot be loaded!</p> : <Spinner/>;

        console.log('[BurgerBuilder]', this.state.ingredients);

        if(this.state.ingredients){
            burger =  (
                <Aux>
                    <Burger ingredients={this.state.ingredients}/>
                    <BuilderControls addIn={this.addIngredient}
                                     removeIn={this.removeIngredient}
                                     disableInfo={disableInfo}
                                     price={this.state.price}
                                     purchasable={this.state.purchase}
                                     ordering={this.orderHandler} >
                    </BuilderControls>
                </Aux>
            );

            orderSummary =  <OrderSummary pay={this.payOrderHandler}
                                              cancel={this.cancelOrderHandler}
                                              ingredients={this.state.ingredients}
                                              price={this.state.price}/>;
        };

        if(this.state.loading){
            orderSummary = <Spinner/>
        }



        return (
            <Aux>
                <Modal ordering={this.state.ordering} modalClosed={this.cancelOrderHandler}>
                    {orderSummary}
                </Modal>
               {burger}
            </Aux>
        )
    }
}

export default withErrorHandler(BurgerBuilder, axios);