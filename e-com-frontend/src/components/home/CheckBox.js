import React from "react";
import { useState, useEffect } from "react";

//! MY CHECKBOX --------------------------
const CheckBox = ({ categories, handleFilters }) => {
    const [checked, setChecked] = useState([]);
    const checkedIds = [...checked];

    const handleToggle = (id) => () => {
        //* return -1 or first index
        const foundId = checked.indexOf(id);
        if (foundId === -1) {
            checkedIds.push(id);
        } else {
            checkedIds.splice(foundId, 1);
        }
        setChecked(checkedIds);
        handleFilters(checkedIds);
    };

    // useEffect(() => {
    //     alert(JSON.stringify(checked))
    // }, [checked])

    return categories.map((category) => (
        <li className="" key={category._id}>
            <input
                type="checkbox"
                onChange={handleToggle(category._id)}
                value={checked.indexOf(category._id === -1)}
                className=""
            />
            <label className="">{category.name}</label>
        </li>
    ));
};

export default CheckBox;
