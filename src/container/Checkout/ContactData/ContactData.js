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
               value: '',
               validation: {
                   required: true,
                   minLength: 5
               },
               valid: false
           },
           street: {
               elementType: 'input',
               elementConfig: {
                   type: 'text',
                   placeholder: 'Your Street'
               },
               value: '',
               validation: {
                   required: true
               },
               valid: false
           },
           zipCode: {
               elementType: 'input',
               elementConfig: {
                   type: 'text',
                   placeholder: 'Your ZipCode'
               },
               value: '',
               validation: {
                   required: true
               },
               valid: false
           },
           email: {
               elementType: 'input',
               elementConfig: {
                   type: 'text',
                   placeholder: 'Your Email'
               },
               value: '',
               validation: {
                   required: true
               },
               valid: false
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


    checkValidation(value, rules){
        let isValid = true;

        if(rules.required){
            isValid = value.trim() !== '' && isValid;
        }

        if(rules.minLength){
            isValid = value.length >= rules.minLength && isValid;
        }

        return isValid;
    }

    orderHandler = (event) => {
        event.preventDefault();
        alert('you pay successfully');
        this.setState({loading: true});

        const formData = {};
        for(let i in this.state.orderForm){
            formData[i] = this.state.orderForm[i].value;
        }


        const order = {
            ingredients: this.props.ingredients,
            price: this.props.price,
            orderData: formData
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

    inputChangedHandler = (event, inputIdentifier) => {
        const updatedOrderForm = {
            ...this.state.orderForm
        }

        const updatedOrderElement = {
            ...updatedOrderForm[inputIdentifier]
        }

        updatedOrderElement.value = event.target.value;
        updatedOrderElement.valid = this.checkValidation(updatedOrderElement.value, updatedOrderElement.validation);
        updatedOrderForm[inputIdentifier] = updatedOrderElement;

        this.setState({
            orderForm: updatedOrderForm
        })

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
            <form onSubmit={this.orderHandler}>
                {formElementArray.map(formElement => (
                    <Input
                        key={formElement.id}
                        elementType={formElement.config.elementType}
                        elementConfig={formElement.config.elementConfig}
                        value={formElement.config.value}
                        changed={(event) => this.inputChangedHandler(event, formElement.id)}
                        invalid={!formElement.config.valid}
                        shouldValidate={formElement.config.validation}
                    />
                ))}
                <Button btnType="Success">Order</Button>
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