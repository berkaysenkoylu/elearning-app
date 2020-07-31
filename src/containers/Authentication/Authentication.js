import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';

import classes from './Authentication.module.scss';
import Login from '../../components/Auth/Login/Login';
import Signup from '../../components/Auth/Signup/Signup';
import RequestPasswordReset from '../../components/Auth/RequestPasswordReset/RequestPasswordReset';

class Authentication extends Component {
    constructor(props) {
        super(props);

        this.state = {
            signupMode: false
        };
    }

    onSignupClosedHandler = (event, toggle) => {
        event.stopPropagation();

        this.setState({
            signupMode: toggle
        });
    }

    onForgotPasswordClickedHandler = () => {
        this.props.history.push(this.props.match.url + '/password-reset');
    }

    render() {
        return (
            <Switch>
                <Route path={this.props.match.url + '/password-reset'} render={() => <RequestPasswordReset />} />
                
                <Route path={this.props.match.url} render={() => {
                    return <div className={classes.Authentication} style={this.state.signupMode ? { height: "60rem" } : {}}>
                        <Login
                            isSignupMode={this.state.signupMode}
                            forgotPasswordClicked={this.onForgotPasswordClickedHandler}
                        />

                        <Signup
                            isSignupMode={this.state.signupMode}
                            openSignupPanel={this.onSignupClosedHandler}
                            closeSignupPanel={this.onSignupClosedHandler}
                        />
                    </div>;
                }} />
            </Switch>
        )
    }
}

export default Authentication;