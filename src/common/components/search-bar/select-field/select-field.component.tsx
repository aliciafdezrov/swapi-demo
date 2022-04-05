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
}

export const SelectField = (props: Props) => {
    const {options, value, onSelect} = props;

    const handleOnSelect = (event) => {
        onSelect(event.target.value);
    }

    return (
        <section className={classes.filterInput}>
            <select onChange={handleOnSelect} value={value} name="sort" id="sorting-select">
                {
                    options.map((option) => (<option key={option.value} value={option.value}>{option.name}</option>))
                }
            </select>
        </section>
    );
};
