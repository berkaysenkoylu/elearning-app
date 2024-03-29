import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import * as actions from '../../store/actions/index';

import classes from './Authentication.module.scss';
import FeedbackDialogue from '../../components/FeedbackDialogue/FeedbackDialogue';
import Login from '../../components/Auth/Login/Login';
import Signup from '../../components/Auth/Signup/Signup';
import SignupSuccess from '../../components/Auth/SignupSuccess/SignupSuccess';
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
        if(prevProps.redirectPath !== this.props.redirectPath && prevProps.signupSuccess !== this.props.signupSuccess &&
            this.props.redirectPath === '/auth/signup-success') {
            this.setState({
                signupMode: false
            });

            // SIGNUP SUCCESSFULL
            this.props.history.push(this.props.redirectPath);
        }

        // Check if there is an error
        if(prevProps.error !== this.props.error && this.props.error !== null) {
            this.setState({
                showError: true
            });
        }
    }

    onCloseFeedBackDialogueHandler = () => {
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

    onSignupFormSubmittedHandler = (formData) => {
        this.props.signup(formData);
    }

    onEmailFormSubmitted = (email) => {
        this.props.requestPasswordReset(email);
    }

    onPasswordResetFormSubmitHandler = (formData) => {
        this.props.resetPassword(formData);
    }

    render() {
        let content = null;

        if (this.props.isAuthenticated) {
            // Login successfull
            content = <Redirect to='/' />;
        } else {
            content = (
                <Switch>
                    <Route path={this.props.match.url + '/signup-success'} exact render={() => <SignupSuccess />} />

                    <Route path={this.props.match.url + '/password-reset'} exact render={() =>
                        <RequestPasswordReset
                            emailFormSubmit={this.onEmailFormSubmitted}
                            loading={this.props.loading}
                            reqSuccessfull={!this.state.showError && !this.props.error} />} />
    
                    <Route path={this.props.match.url + '/password-reset/:token'} exact render={() =>
                        <PasswordRest
                            {...this.props}
                            resetFormSubmit={this.onPasswordResetFormSubmitHandler}
                            loading={this.props.loading}
                            reqSuccessfull={!this.state.showError && !this.props.error}
                            path={this.props.redirectPath} />} />
                    
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
                                signupFormSubmit={this.onSignupFormSubmittedHandler}
                            />
                        </div>;
                    }} />
                </Switch>
            );
        }

        return (
            <>
                <FeedbackDialogue
                    show={this.state.showError}
                    feedbackMessage={this.props.error}
                    closed={this.onCloseFeedBackDialogueHandler}
                    isError={true}
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
        redirectPath: state.redirectPath,
        signupSuccess: state.successfullSignup
    }
}

const mapDispatchToProps = dispatch => {
    return {
        login: (formData) => dispatch(actions.login(formData)),
        signup: (formData) => dispatch(actions.signup(formData)),
        requestPasswordReset: (email) => dispatch(actions.passwordResetRequest(email)),
        resetPassword: (formData) => dispatch(actions.resetPassword(formData))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Authentication);