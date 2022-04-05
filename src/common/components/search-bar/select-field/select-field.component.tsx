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

const empty_option: SelectItem = {
    name: "None",
    value: null
}

export const SelectField = (props: Props) => {
    const {options, value, onSelect} = props;

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
        </section>
    );
};
