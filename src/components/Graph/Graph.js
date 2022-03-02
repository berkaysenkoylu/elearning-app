import React from 'react';
import {
    LineChart,
    Line,
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    Label,
    Legend
} from 'recharts';

import classes from './Graph.module.scss';

// TODO: Add additional properties to increase variety
const Graph = props => {
    let graphType = props.graphType || 'line';

    let pageContent = (
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
    );

    if (graphType === 'bar') {
        pageContent = (
            <BarChart width={600} height={250} data={props.data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey='name' />
                <YAxis />
                <Tooltip />
                <Legend />
                {props.bars.map(bar => {
                    return <Bar key={bar.name} dataKey={bar.name} fill={bar.color} />
                })}
            </BarChart>
        );
    }

    return (
        <div className={classes.Graph}>
            <header className={classes.Graph__Header}>
                <h2>{props.graphTitle}</h2>
            </header>

            {pageContent}
        </div>
    )
}

export default Graph;