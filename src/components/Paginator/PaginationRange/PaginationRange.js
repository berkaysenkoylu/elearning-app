import React from 'react';

import classes from './PaginationRange.module.scss';

const PaginationRange = (props) => {

    return (
        <div className={classes.PaginationRange}>
            {props.itemPerPage * props.currentPage + 1} - {(props.itemPerPage * (props.currentPage + 1)) > props.maxItem ? props.maxItem : props.itemPerPage * (props.currentPage + 1)} of {props.maxItem}
        </div>
    )
}

export default PaginationRange;