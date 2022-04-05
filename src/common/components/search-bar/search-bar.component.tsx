import React from 'react';
import classes from './search-bar.style.scss';
import {SearchField} from "./search-field/search-field.component";
import {SelectField, SelectItem} from "./select-field/select-field.component";

interface Props {
    search: string;
    onSearch: (name: string) => void;
    selectOptions: SelectItem[];
    selectValue: string;
    onSelect: (selectedValue: string) => void;
    isAscending: boolean;
    onChangeSortDirection: (isAscending: boolean) => void;
}

export const SearchBar = (props: Props) => {
    const {search, onSearch, selectOptions, selectValue, onSelect, isAscending, onChangeSortDirection} = props;

    return (
        <section className={classes.searchItems}>
            <div className={classes.spaceBetween}>
                <SearchField defaultSearch={search} onSearch={onSearch}/></div>
            <div>
                <SelectField onSelect={onSelect} value={selectValue} options={selectOptions} isAscending={isAscending}
                             onChangeSortDirection={onChangeSortDirection}/>
            </div>
        </section>
    );
};
