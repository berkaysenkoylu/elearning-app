import React, { Fragment } from 'react';

import Toolbar from '../../components/Navigation/Toolbar/Toolbar';

// TODO REMOVE
import Course from '../../containers/Course/Course';

const Layout = () => {
    const testStyle = {
        height: 'calc(100vh - 5rem)',
        width: '100vw',
        marginTop: '5rem'
    };

    return (
        <Fragment>
            <Toolbar />

            <div style={testStyle}>
                SITE LAYOUT

                <Course />
            </div>
        </Fragment>
    );
}

export default Layout;