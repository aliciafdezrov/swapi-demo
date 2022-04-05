import React from 'react';
import classes from "./select-field.style.scss";

export interface SelectItem {
    name: string;
    value: string;
}

interface Props {
    options: SelectItem[];
    value: string;
    onSelect: (value: string) => void;
    isAscending?: boolean;
    onChangeSortDirection: (isAscending: boolean) => void;
}

const empty_option: SelectItem = {
    name: "None",
    value: null
}

export const SelectField = (props: Props) => {
    const {options, value, onSelect, isAscending, onChangeSortDirection} = props;

    const handleOnSelect = (event) => {
        let selectedValue = event.target.value;
        if (event.target.value === empty_option.value) {
            selectedValue = null;
        }
        onSelect(selectedValue);
    }

    return (
        <section className={classes.filterInput}>
            <select onChange={handleOnSelect} value={value} name="sort" id="sorting-select">
                <>
                    <option value={empty_option.value}>{empty_option.name}</option>
                    {
                        options.map((option) => (
                            <option key={option.value} value={option.value}>{option.name}</option>))
                    }
                </>
            </select>
            {value !== undefined && value !== empty_option.name ?
                isAscending ?
                    <span onClick={() => onChangeSortDirection(!isAscending)} className={classes.arrow}>&#x25BC;</span>
                    :
                    <span onClick={() => onChangeSortDirection(!isAscending)}
                          className={classes.arrow}>&#x25B2;</span>
                : null
            }
        </section>
    );
};
