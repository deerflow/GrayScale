import * as React from 'react';

import './Input.css';
import {CSSProperties, KeyboardEventHandler} from "react";

interface InputProps {
    id?: string;
    type?: 'text' | 'number' | 'email' | 'password';
    value?: string;
    onInput?: Function;
    onKeyDown?: Function;
    style?: CSSProperties;
}

const Input = ({ id, type = 'text', value = '', onInput, onKeyDown, style }: InputProps) => {
    return <input
        id={id}
        className='input'
        style={style}
        type={type}
        value={value}
        onInput={(e: any) => onInput(e.target.value)}
        onKeyDown={onKeyDown ? (e) => onKeyDown(e) : null}/>
}

export default Input;