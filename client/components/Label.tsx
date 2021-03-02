import * as React from 'react';
import {CSSProperties} from "react";

interface LabelProps {
    children?: any;
    inputId?: string;
    style?: CSSProperties;
}

const Label = ({ children, inputId, style } : LabelProps) => {
    return <label style={style} htmlFor={inputId}>{children}</label>;
}

export default Label;