import React from 'react';
import classes from './pagination.style.scss';

interface Props {
    hasPreviousPage: boolean;
    currentPage: number;
    textContent: string;
    hasNextPage: boolean;
    search: string;
    onSearch: (search: string, page: number) => void;
}

export const Pagination = (props: Props) => {
    const {hasPreviousPage, currentPage, textContent, hasNextPage, onSearch, search} = props;

    const handleOnSearch = (addToOffset: boolean) => {
        window.scrollTo({top: 0, behavior: 'smooth'});
        let nextPage = addToOffset ? currentPage + 1 : currentPage - 1;
        onSearch(search, nextPage);
    }

    return (
        <>
            <button id={"previous-page-button"} aria-label={"previous page button"} className={classes.round}
                    disabled={!hasPreviousPage}
                    onClick={() => handleOnSearch(false)}>
                &#8249;
            </button>
            <span className={classes.metaInfo}>{textContent}</span>
            <button id={"next-page-button"} aria-label={"next page button"} className={classes.round}
                    disabled={!hasNextPage}
                    onClick={() => handleOnSearch(true)}>
                &#8250;
            </button>
        </>
    );
};
