import * as React from 'react';
import { Link, Redirect } from 'react-router-dom';

import LinkInterface from "../types/LinkInterface";

import Navbar from "../components/Navbar/Navbar";
import Button from "../components/Button";
import Row from "../components/Row";

const HomeView = () => {
    document.title = 'GrayScale';

    if (localStorage.hasOwnProperty('token') && localStorage.hasOwnProperty('id')) {
        return <Redirect to='/feed' />;
    }

    return (
        <>
            <Navbar />
            <h1 style={{ fontSize: '12rem', textAlign: 'center', color: '#373737', margin: '5rem 0' }}>GrayScale</h1>
            <Row justify='center'>
                <Link to='/get-started'>
                    <Button template='primary'>Get started</Button>
                </Link>
            </Row>
        </>
    )
}

export default HomeView;