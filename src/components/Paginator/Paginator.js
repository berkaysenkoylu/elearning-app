import React, { useState, useEffect } from 'react';

import classes from './Paginator.module.scss';
import SelectInput from '../UI/SelectInput/SelectInput';
import PaginationRange from './PaginationRange/PaginationRange';
import PrevButton from './PrevButton/PrevButton';
import NextButton from './NextButton/NextButton';

const Paginator = (props) => {
    const [itemPerPage, setItemPerPage] = useState(props.itemPerPage[0]);
    const [currentPage, setCurrentPage] = useState(props.currentPage);
    const [pageCount, setPageCount] = useState(Math.floor((props.maxItemCount / props.itemPerPage[0])) + ((props.maxItemCount % props.itemPerPage[0] === 0) ? 0 : 1));
    
    useEffect(() => {
        setPageCount(Math.floor((props.maxItemCount / props.itemPerPage[0])) + ((props.maxItemCount % props.itemPerPage[0] === 0) ? 0 : 1))
    }, [props.maxItemCount, props.itemPerPage]);

    const onValueSelectedHandler = (value) => {
        setItemPerPage(value);
        setCurrentPage(0);

        // value => item per page
        let pageNumber = Math.floor((props.maxItemCount / value) + ((props.maxItemCount % value === 0) ? 0 : 1));
        setPageCount(pageNumber);

        props.pagination({ perPage: value, currentPage: 0, pageCount: pageNumber });
    }

    const onPrevPageHandler = () => {
        setCurrentPage(currentPage => currentPage - 1 < 0 ? 0 : currentPage - 1);

        props.pagination({ perPage: itemPerPage, currentPage: currentPage - 1 < 0 ? 0 : currentPage - 1, pageCount: pageCount });
    }

    const onNextPageHandler = () => {
        setCurrentPage(currentPage => currentPage + 1 > pageCount - 1 ? pageCount - 1 : currentPage + 1);

        props.pagination({ perPage: itemPerPage, currentPage: currentPage + 1 > pageCount - 1 ? pageCount - 1 : currentPage + 1, pageCount: pageCount });
    }

    return (
        <div className={classes.Paginator}>
            <SelectInput itemPerPageList={props.itemPerPage} valueSelected={onValueSelectedHandler} />
            
            <PaginationRange 
                itemPerPage={itemPerPage}
                currentPage={currentPage}
                pageCount={pageCount}
                maxItem={props.maxItemCount} />

            <div className={classes.PaginatorButtons}>
                <PrevButton clicked={onPrevPageHandler} disabled={!props.hasPrevPage} />
                
                <NextButton clicked={onNextPageHandler} disabled={!props.hasNextPage} />
            </div>
            
        </div>
    )
}

export default Paginator;