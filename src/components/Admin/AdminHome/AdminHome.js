import React from 'react';

import classes from './AdminHome.module.scss';
import FeaturedInfo from './FeaturedInfo/FeaturedInfo';
import Graph from '../../Graph/Graph';
import { userData } from '../../../assets/exampleData';

const AdminHome = () => {
    return (
        <div className={classes.AdminHome}>
            <FeaturedInfo />

            <Graph
                data={userData}
                graphTitle='Active User Details'
                dataKeyxAxis='Month'
                dataKeyyAxis='Active User'
                dataKeyName='Active User'
            />
        </div>
    );
}

export default AdminHome;