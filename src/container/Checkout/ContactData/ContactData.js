import React , {Component} from  'react';
import Button from '../../../component/UI/Button/Button';
import classes from './ContactData.module.css'
import axios from '../../../axios-orders';
import Spinner from '../../../component/UI/Spinner/Spinner';
import Input from '../../../component/UI/Input/Input';

class ContactData extends Component {
    state = {
        name: '',
        email: '',
        address : {
            street: '',
            zip: ''
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
            customer: {
                name: 'tian',
                address: {
                    street: 'moringside',
                    zipCode: '22332'
                },
                email: 'test@gmail.com',
            },
            deliveryMethod: 'fast'
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
        let form = (
            <form>
                <Input inputtype="input" type="text" name="name" placeholder="your name"/>
                <Input inputtype="input" type="email" name="email" placeholder="your email"/>
                <Input inputtype="input" type="street" name="street" placeholder="your street"/>
                <Input inputtype="input" type="zip" name="zip" placeholder="your zip"/>
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