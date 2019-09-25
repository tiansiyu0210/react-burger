import React , {Component} from  'react';
import Button from '../../../component/UI/Button/Button';
import classes from './ContactData.module.css'
import axios from '../../../axios-orders';
import Spinner from '../../../component/UI/Spinner/Spinner';
import Input from '../../../component/UI/Input/Input';

class ContactData extends Component {
    state = {
       orderForm: {
           name: {
               elementType: 'input',
               elementConfig: {
                   type: 'text',
                   placeholder: 'Your Name'
               },
               value: ''
           },
           street: {
               elementType: 'input',
               elementConfig: {
                   type: 'text',
                   placeholder: 'Your Street'
               },
               value: ''
           },
           zipCode: {
               elementType: 'input',
               elementConfig: {
                   type: 'text',
                   placeholder: 'Your ZipCode'
               },
               value: ''
           },
           email: {
               elementType: 'input',
               elementConfig: {
                   type: 'text',
                   placeholder: 'Your Email'
               },
               value: ''
           },
           deliveryMethod: {
               elementType: 'select',
               elementConfig: {
                   options: [
                       {value: 'fastest', displayValue: 'Fastest'},
                       {value: 'cheapest', displayValue: 'Cheapest'}
                   ]
               },
               value: ''
           }
       },
        loading: false
    };

    orderHandler = (event) => {
        event.preventDefault();
        alert('you pay successfully');
        this.setState({loading: true});
        const order = {
            ingredients: this.props.ingredients,
            price: this.props.price,
        };

        axios.post('/orders.json', order)
            .then( response => {
                console.log(response);
                this.setState({loading: false});
                this.props.history.push('/');
            })
            .catch(error => {
                this.setState({loading: false});
                console.log(error);
            });
    }

    render() {
        let formElementArray = [];
        for (let key in this.state.orderForm) {
            formElementArray.push({
                id: key,
                config: this.state.orderForm[key]
            })
        }

        let form = (
            <form>
                {formElementArray.map(formElement => (
                    <Input
                        key={formElement.id}
                        elementType={formElement.config.elementType}
                        elementConfig={formElement.config.elementConfig}
                        value={formElement.config.value}
                    />
                ))}
                <Button btnType="Success" clicked={this.orderHandler}>Order</Button>
            </form>
        );

        if(this.state.loading){
            form = <Spinner/>
        }

        return (
            <div className={classes.ContactData}>
                <h4>Enter your Contact Data</h4>
                {form}
            </div>
        )
    }
}

export default ContactData;