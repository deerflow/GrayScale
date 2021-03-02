import * as React from 'react';
import {CSSProperties} from "react";

interface CheckboxProps {
    checked?: boolean;
    id?: string;
    onChange?: Function,
    style?: CSSProperties
}

const Checkbox = ({ checked, id, onChange, style }: CheckboxProps) => {
    const attr = {
        checked,
        id,
        style,
        onChange: () => onChange(!checked) ?? null
    }
    return <input type='checkbox' {...attr} />;
}

export default Checkbox;