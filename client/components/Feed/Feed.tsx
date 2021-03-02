import * as React from 'react';

import Post from "./Post/Post";
import '../../types/PostDocument';
import PostDocument from "../../types/PostDocument";

interface FeedProps {
    feed: PostDocument[];
    onDeleteClick: any;
}

const Feed = ({ feed, onDeleteClick }: FeedProps) => {
    if (!feed || feed.length === 0) return <div>No post found</div>;

    return (
        <div>
            {feed.map((post) => <Post
                    key={post._id}
                    id={post._id}
                    body={post.body}
                    user={post.user}
                    date={post.date}
                    isPublic={post.public}
                    onDeleteClick={onDeleteClick}
                />)}
        </div>
    )
}

export default Feed;