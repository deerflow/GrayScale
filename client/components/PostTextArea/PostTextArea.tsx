import * as React from 'react';
import autosize from 'autosize';
import {CSSProperties, FormEvent} from "react";

import './PostTextArea.css';
import Button from "../Button";
import Row from "../Row";

interface PostAreaProps {
    content: string;
    onInput: Function;
    onSubmit: Function;
    isPostPublic: boolean;
    setIsPostPublic: Function;
    style?: CSSProperties;
}

const PostTextArea = ({ content, onInput, onSubmit, isPostPublic, setIsPostPublic, style }: PostAreaProps) => {
    let textarea = React.useRef(null);

    const onKeyDown = e => {
        if (e.code === 'Enter') {
            e.preventDefault();
            e.stopPropagation();
            onSubmit()
        }
    }

    const toggleIsPostPublic = () => {
        setIsPostPublic(!isPostPublic);
    }

    React.useEffect(() => {
        autosize(textarea);
    }, [])

    return (
        <form onSubmit={(e: FormEvent) => {e.preventDefault();onSubmit();}}>
            <Row>
                <textarea
                    ref={textarea}
                    style={style}
                    placeholder='Share some thoughts...'
                    className='post-textarea'
                    onInput={(e: any) => onInput(e.target.value)}
                    onKeyDown={onKeyDown}
                    value={content}
                    cols={30}
                    rows={Math.floor(content.length / 37) + 1}
                    maxLength={255}
                />
            </Row>
            <Row className='row-public-checkbox' align='center'>
                <input type='checkbox' checked={isPostPublic} onChange={toggleIsPostPublic}/>
                <label style={{marginLeft: '0.25rem'}} onClick={toggleIsPostPublic}>Public</label>
            </Row>
            <Button template='primary' type='submit'>Post</Button>
        </form>
    )
}

export default PostTextArea;