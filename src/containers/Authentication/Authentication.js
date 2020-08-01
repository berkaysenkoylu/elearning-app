import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import * as actions from '../../store/actions/index';

import classes from './Authentication.module.scss';
import ErrorDialogue from '../../components/ErrorDialogue/ErrorDialogue';
import Login from '../../components/Auth/Login/Login';
import Signup from '../../components/Auth/Signup/Signup';
import RequestPasswordReset from '../../components/Auth/RequestPasswordReset/RequestPasswordReset';
import PasswordRest from '../../components/Auth/PasswordReset/PasswordReset';

class Authentication extends Component {
    constructor(props) {
        super(props);

        this.state = {
            showError: false,
            signupMode: false
        };
    }

    componentDidUpdate(prevProps, prevState) {
        // Check if there is an error
        if(prevProps.error !== this.props.error && this.props.error !== null) {
            this.setState({
                showError: true
            });
        }
    }

    onCloseErrorDialogueHandler = () => {
        this.setState({
            showError: false
        });
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

    onLoginFormSubmittedHandler = (formData) => {
        this.props.login(formData);
    }

    render() {
        let content = null;

        if (this.props.isAuthenticated) {
            // Login successfull
            content = <Redirect to='/' />;
        } else {
            content = (
                <Switch>
                    <Route path={this.props.match.url + '/password-reset'} exact render={() => <RequestPasswordReset />} />
    
                    <Route path={this.props.match.url + '/password-reset/:token'} exact render={() => <PasswordRest />} />
                    
                    <Route path={this.props.match.url} exact render={() => {
                        return <div className={classes.Authentication} style={this.state.signupMode ? { height: "60rem" } : {}}>
                            <Login
                                isSignupMode={this.state.signupMode}
                                forgotPasswordClicked={this.onForgotPasswordClickedHandler}
                                loginFormSubmit={this.onLoginFormSubmittedHandler}
                            />
    
                            <Signup
                                isSignupMode={this.state.signupMode}
                                openSignupPanel={this.onSignupClosedHandler}
                                closeSignupPanel={this.onSignupClosedHandler}
                            />
                        </div>;
                    }} />
                </Switch>
            );
        }

        return (
            <>
                <ErrorDialogue
                    show={this.state.showError}
                    errorMessage={this.props.error}
                    closed={this.onCloseErrorDialogueHandler}
                />

                {content}
            </>
        )
    }
}

const mapStateToProps = state => {
    return {
        loading: state.isLoading,
        error: state.error,
        token: state.token,
        isAuthenticated: state.isAuth,
        redirectPath: state.redirectPath
    }
}

const mapDispatchToProps = dispatch => {
    return {
        login: (formData) => dispatch(actions.login(formData))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Authentication);