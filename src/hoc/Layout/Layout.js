import React, { Fragment } from 'react';

import Toolbar from '../../components/Navigation/Toolbar/Toolbar';

// TODO REMOVE
// import Course from '../../containers/Course/Course';

const Layout = (props) => {
    const testStyle = {
        marginTop: '5rem'
    };

    return (
        <Fragment>
            <Toolbar />

            <div style={testStyle}>
                {props.children}
                
                {/* SITE LAYOUT
                <Course /> */}
            </div>
        </Fragment>
    );
}

export default Layout;