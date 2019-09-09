import React, {Component} from 'react';
import classes from './Modal.module.css'
import Aux from '../../../hoc/Aux';
import Backdrop from '../Backdrop/Backdrop'

class Modal extends Component {

    shouldComponentUpdate(nextProps, nextState, nextContext) {
        return nextProps.ordering !== this.props.ordering;
    }

    componentWillUpdate() {
        console.log('[Model] componentWillUpdate');
    }

    render() {
        return (
            <Aux>
                <Backdrop show={this.props.ordering} clicked={this.props.modalClosed}/>
                <div className={classes.Modal} style={{
                    transform: this.props.ordering ? 'translateY(0)' : 'translateY(-100vh)',
                    opacity: this.props.ordering ? '1' : '0'
                }}>
                    {this.props.children}
                </div>
            </Aux>
        )
    }
};

export default Modal;