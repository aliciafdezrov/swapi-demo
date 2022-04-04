import React from 'react';
import classes from "./search-bar.style.scss";

interface Props {
    onSearch: (query: string) => void;
    defaultSearch: string;
}

export const SearchBar: React.FC<Props> = (props) => {
    const {onSearch, defaultSearch} = props;
    const [inputValue, setInputValue] = React.useState(defaultSearch);

    const handleOnChangeInput = (event) => {
        const {value} = event.target;
        setInputValue(value);
        onSearch(value);
    }

    return (
        <section className={classes.searchInput}>
            <input id={"search-input"} aria-required="true" value={inputValue} onChange={handleOnChangeInput} type="search"
                   placeholder="Search something" aria-label="search-input"/>
        </section>
    );
};
