import React, {Component} from 'react';
import classes from './Layout.module.css'

import Aux from '../Aux/Aux';
import Toolbar from '../../component/Navigation/Toolbar/Toolbar'
import SideDrawer from '../../component/Navigation/SideDrawer/SideDrawer'

class Layout extends Component {
    state = {
        showSideDrawer : true
    }

    sideDrawerClosedHandler = () => {
        this.setState({showSideDrawer : false})
    }

    sideDrawerToggleHandler = () => {
        this.setState((prevState) => {
            return {showSideDrawer: !prevState.showSideDrawer}
        });
    }

    render() {
        return (
            <Aux>
                <Toolbar drawerToggleClicked={this.sideDrawerToggleHandler}/>
                <SideDrawer
                    open={this.state.showSideDrawer}
                    close={this.sideDrawerClosedHandler}/>
                <main className={classes.Content}>
                    {this.props.children}
                </main>
            </Aux>
        )
    }
}


export default Layout;