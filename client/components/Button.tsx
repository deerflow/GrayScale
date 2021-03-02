import * as React from 'react';
import {CSSProperties} from "react";

interface ButtonProps {
    children: any;
    template: 'primary' | 'transparent';
    type?: 'submit' | 'button' | 'reset';
    fontSize?: string,
    padding?: string | number,
    margin?: string | number,
    onClick?: Function;
    disabled?: boolean;
}

const Button = ({ children, template, type, fontSize, padding, margin, onClick = () => null, disabled } : ButtonProps) => {
    const style: CSSProperties = {
        outline: 'none',
        border: 'none',
        cursor: disabled ? 'default' : 'pointer',
        padding: padding || '0.75rem 1rem',
        margin: margin,
        fontSize: fontSize || '1rem',
        fontWeight: 400,
    }

    switch (template) {
        case 'primary':
            style.color = '#fff';
            style.backgroundColor = disabled ? '#8f8f8f' : '#000';
            break;
        case 'transparent':
            style.color = '#000';
            style.backgroundColor = 'transparent';
            break;
    }

    return disabled ? <button type={type} style={style}>{children}</button> : <button type={type} style={style} onClick={() => onClick()}>{children}</button>;
}

export default Button;