import React from 'react';

export default ({ setOption, ...props }) => {
    const onChangeHandler = (e) => {
        const val = e.target.value;
        if (!(/^[0-9]+$/.test(val)) || (props.min && val < props.min)) {
            e.preventDefault();
        } else {
            setOption(Number.parseInt(val));
        }
    }

    return (
        <input type="number" inputMode="numeric" onChange={onChangeHandler} {...props} />
    )
};
