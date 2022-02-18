import React, { Fragment } from 'react';
import { connect } from 'react-redux';

import Toolbar from '../../components/Navigation/Toolbar/Toolbar';

const Layout = (props) => {
    const testStyle = {
        width: '65%',
        margin: '2rem auto 0 auto'
    };

    return (
        <Fragment>
            <Toolbar isAuth={props.isAuthenticated} userStatus={props.userStatus} />

            <div style={testStyle}>
                {props.children}
            </div>
        </Fragment>
    );
}

const mapStateToProps = state => {
    return {
        isAuthenticated: state.isAuth,
        userStatus: state.userStatus
    }
}

export default connect(mapStateToProps, null)(Layout);