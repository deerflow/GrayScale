import * as React from 'react';
import {CSSProperties} from "react";

interface ContainerProps {
    children?: any;
    maxWidth?: string | number;
    sidePadding?: string | number;
    verticalPadding?: string | number;
}

const Container = ({ children, maxWidth = 1052, sidePadding = '3rem', verticalPadding } : ContainerProps) => {
    const style: CSSProperties = {
        maxWidth: maxWidth,
        paddingLeft: sidePadding,
        paddingRight: sidePadding,
        paddingTop: verticalPadding,
        paddingBottom: verticalPadding,
        marginRight: 'auto',
        marginLeft: 'auto'
    }

    return <div style={style}>{children}</div>;
}

export default Container;