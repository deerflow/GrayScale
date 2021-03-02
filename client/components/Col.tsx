import * as React from 'react';
import {CSSProperties} from "react";

interface ColProps {
    children?: any
    size?: number;
    justify?: 'center' | 'space-between' | 'space-around' | 'space-evenly';
    align?: 'center';
}

const Col = ({ children, size = 12, justify, align } : ColProps) => {
    const style: CSSProperties = {
        display: 'flex',
        flexDirection: 'column',
        width: Math.round(size / 12 * 100).toString() + '%',
        justifyContent: justify,
        alignItems: align
    }

    return <div style={style}>{children}</div>;
}

export default Col;