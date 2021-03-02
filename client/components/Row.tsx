import * as React from 'react';
import {CSSProperties} from "react";

interface RowProps {
    children?: any;
    className?: string;
    justify?: 'center' | 'space-around' | 'space-between' | 'space-evenly';
    align?: 'center' | 'start' | 'end';
    verticalMargin?: string;
    style?: CSSProperties;
}

const Row = ({ children, className, justify, align, verticalMargin, style } : RowProps) => {
    const inlineStyle: CSSProperties = {
        display: 'flex',
        justifyContent: justify ? justify : '',
        alignItems: align ? align : '',
        marginTop: verticalMargin,
        marginBottom: verticalMargin,
        ...style
    }

    if (justify) inlineStyle.justifyContent = justify;

    return (
        <div className={className} style={inlineStyle}>{children}</div>
    )
}

export default Row;