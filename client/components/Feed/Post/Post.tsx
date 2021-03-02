import * as React from 'react';
import { DateTime } from 'luxon';
import { AiOutlineClose } from 'react-icons/ai';

import './Post.css';
import Row from "../../Row";
import UserDocument from "../../../types/UserDocument";

interface PostProps {
    id: string;
    body: string;
    date: string;
    isPublic: boolean;
    user: UserDocument;
    onDeleteClick: any;
}

const Post = ({ id, body, date, isPublic, user, onDeleteClick }: PostProps) => {
    const isTheAuthor = localStorage.getItem('id') === user._id;
    const dt: DateTime = DateTime.fromISO(date);
    const formattedDate = dt.setLocale('fr').toLocaleString(DateTime.DATETIME_SHORT_WITH_SECONDS);

    return (<div className='post-card'>
        <Row justify='space-between'>
            <p className='post-author'>{isTheAuthor ? 'You' : user.username} {isPublic ? '' : '(private)'} - {formattedDate}</p>
            {isTheAuthor && <AiOutlineClose className='post-delete-icon' onClick={() => onDeleteClick(id)} />}
        </Row>
        <p>{body}</p>


    </div>);
}

export default Post;