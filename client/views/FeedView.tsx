import * as React from 'react';
import { Redirect } from 'react-router-dom';

import Navbar from "../components/Navbar/Navbar";
import PostTextArea from "../components/PostTextArea/PostTextArea";
import Container from "../components/Container";
import { useEffect, useState } from "react";
import PostDocument from "../types/PostDocument";
import Feed from "../components/Feed/Feed";

const FeedView = () => {
    const [isLoggedIn, setIsLoggedIn] : [boolean, Function] = useState(false);
    const [redirect, setRedirect] : [string, Function] = useState('');

    const [postAreaContent, setPostAreaContent] : [string, Function] = useState('');
    const [isPostPublic, setIsPostPublic] : [boolean, Function] = useState(true);

    const [feed, setFeed]: [PostDocument[], Function] = useState([]);

    useEffect(() => {
        getLatestPosts().then(() => console.log('Fetched posts'));
    }, [])

    useEffect(() => {
        if (redirect) location.href = '/login';
    }, [redirect])

    const handleError = (error: string) => {
        switch (error) {
            case 'Unidentified request':
                return handleInvalidToken();
            case 'Missing requirements':
                return console.error(error);
            default:
                console.error(error);
        }
    }

    const handleInvalidToken = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('id');
        setRedirect('/login');
    }

    const getLatestPosts = async () => {
        try {
            const res = await fetch('/auth/posts', {
                method: 'POST',
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify({
                    userId: localStorage.getItem('id'),
                    token: localStorage.getItem('token')
                })
            });

            let data = await res.json();

            if (data?.error) return handleError(data.error);

            setIsLoggedIn(true);
            setFeed(data);
        } catch (e) {
            handleInvalidToken();
        }
    }

    const onPostAreaSubmit = async () => {
        if (!RegExp(/\S/).test(postAreaContent)) return;

        const res = await fetch('/auth/posts/create', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify({
                userId: localStorage.getItem('id'),
                token: localStorage.getItem('token'),
                postBody: postAreaContent,
                public: isPostPublic
            })
        });

        const data = await res.json();

        if (data?.error) return handleError(data.error);

        setFeed([data, ...feed]);
        setPostAreaContent('');
    }

    const deletePost = async (id: string) => {
        const res = await fetch('/auth/posts/delete', {
            method: 'DELETE',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify({
                userId: localStorage.getItem('id'),
                token: localStorage.getItem('token'),
                postId: id
            })
        });

        const data = await res.json();

        if (data?.error) return handleError(data.error);

        if (data?.id) {
            setFeed(feed.filter(post => post._id !== data.id));
        }
    }

    return (<>
            <Navbar isLoggedIn={isLoggedIn} />
            <Container>
                <PostTextArea
                    content={postAreaContent}
                    onInput={setPostAreaContent}
                    onSubmit={onPostAreaSubmit}
                    isPostPublic={isPostPublic}
                    setIsPostPublic={setIsPostPublic}
                />
                <Feed feed={feed} onDeleteClick={deletePost}/>
            </Container>
        </>);
}

export default FeedView;