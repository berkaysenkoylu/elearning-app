import React, { Fragment } from 'react';
import { connect } from 'react-redux';

import Toolbar from '../../components/Navigation/Toolbar/Toolbar';

const Layout = (props) => {
    const testStyle = {
        marginTop: '5rem'
    };

    return (
        <Fragment>
            <Toolbar isAuth={props.isAuthenticated} />

            <div style={testStyle}>
                {props.children}
            </div>
        </Fragment>
    );
}

const mapStateToProps = state => {
    return {
        isAuthenticated: state.isAuth
    }
}

export default connect(mapStateToProps, null)(Layout);