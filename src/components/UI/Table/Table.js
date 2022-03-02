import React from 'react';

import classes from './Table.module.scss';
import svg from '../../../assets/images/sprite.svg';

const Table = props => {
    return (
        <div className={classes.TableWrapper}>
            <table className={classes.Table}>
                <thead>
                    <tr>
                        {props.headers.map(header => {
                            return <th key={header}>{header}</th>
                        })}
                    </tr>
                </thead>

                <tbody>
                    {props.rows.map((row, index) => {
                        return (
                            <tr key={'AnswerRow' + index}>
                                {row.map((rowData, index) => {
                                    return (
                                        <td key={rowData.value + '_' + index} className={classes.Table__Row}>
                                            {rowData.value}

                                            {rowData.showIcon || false ?
                                                <svg className={classes.Table__Row__Icon} style={rowData.changeColor ? {fill: '#5B0200'} : {}}>
                                                    <use xlinkHref={`${svg}#icon-${rowData.icon}`}></use>
                                                </svg> : null}
                                        </td>
                                    )
                                })}
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </div>
    )
}

export default Table;