import React , {Component} from  'react';
import Button from '../../../component/UI/Button/Button';
import classes from './ContactData.module.css'

class ContactData extends Component {
    state = {
        name: '',
        email: '',
        address : {
            street: '',
            zip: ''
        }
    };

    render() {
        return (
            <div className={classes.ContactData}>
                <h4>Enter your Contact Data</h4>
                <form>
                    <input type="text" name="name" placeholder="your name"/>
                    <input type="email" name="email" placeholder="your email"/>
                    <input type="street" name="street" placeholder="your street"/>
                    <input type="zip" name="zip" placeholder="your zip"/>
                    <Button btnType="Success">Order</Button>
                </form>
            </div>
        )
    }
}

export default ContactData;