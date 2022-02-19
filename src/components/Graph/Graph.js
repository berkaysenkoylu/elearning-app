import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Label } from 'recharts';

import classes from './Graph.module.scss';

// TODO: Add additional properties to increase variety
const Graph = props => {
    return (
        <div className={classes.Graph}>
            <header className={classes.Graph__Header}>
                <h2>{props.graphTitle}</h2>
            </header>

            <ResponsiveContainer width="100%" height="100%">
                <LineChart
                    width={500}
                    height={300}
                    data={props.data}
                    margin={{
                        top: 5,
                        right: 5,
                        left: 5,
                        bottom: 5,
                    }}
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey={props.dataKeyxAxis}>
                        <Label value={props.dataKeyxAxis} offset={0} position="insideBottom" />
                    </XAxis>
                    
                    <YAxis dataKey={props.dataKeyyAxis}>
                        <Label value={props.dataKeyyAxis} angle="-90" position="insideLeft" textAnchor="middle" />
                    </YAxis>
                    <Tooltip />
                    <Line type="monotone" dataKey={props.dataKeyName} stroke="#000000" />
                </LineChart>
            </ResponsiveContainer>
        </div>
    )
}

export default Graph;