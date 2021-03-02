import * as React from 'react';
import { Link, Redirect } from 'react-router-dom';

import Navbar from "../components/Navbar/Navbar";
import Container from "../components/Container";
import Row from "../components/Row";
import Label from "../components/Label";
import Input from "../components/Input/Input";
import Button from "../components/Button";
import Col from "../components/Col";

const LoginView = () => {
    document.title = 'Login - GrayScale'

    const [redirect, setRedirect] : [string, Function] = React.useState('');

    const [email, setEmail] : [string, Function] = React.useState('');
    const [password, setPassword] : [string, Function] = React.useState('');

    const [error, setError] : [string, Function] = React.useState('');

    const handleLogin = async () => {
        if (!email || !password) return setError('All fields are required');
        const emailRule = new RegExp(/(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/);
        if (!emailRule.test(email)) return setError('Invalid email');

        setError('');

        const res = await fetch('/api/login', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify({
                email: email,
                password: password
            })
        });

        const data = await res.json();

        if (data?.error) return setError(data.error);

        if (data?.id && data?.token) {
            localStorage.setItem('id', data.id);
            localStorage.setItem('token', data.token);
            return setRedirect('feed');
        }
    }

    if (redirect) return <Redirect to={redirect} />

    return (<>
            <Navbar />
            <Container>
                <Col align='center'>
                    <h1 style={{margin: '3rem 0 1.5rem 0', textAlign: 'center'}}>Log in</h1>
                    <Link to='/get-started'>Or create an account</Link>
                </Col>
                <Row justify='center' align='center' verticalMargin='1.5rem'>
                    <Label style={{ margin: '0 0.75rem', width: '9rem', textAlign: 'right'}} inputId='email'>Email</Label>
                    <Input style={{ width: '18rem', marginRight: '10rem' }} value={email} onInput={setEmail} type='email' id='email'/>
                </Row>
                <Row justify='center' align='center' verticalMargin='1.5rem'>
                    <Label style={{ margin: '0 0.75rem', width: '9rem', textAlign: 'right'}} inputId='password'>Password</Label>
                    <Input style={{ width: '18rem', marginRight: '10rem' }} value={password} onInput={setPassword} type='password' id='password'/>
                </Row>
                <Row justify='center' verticalMargin='3rem'>
                    <Button template='primary' fontSize='1rem' onClick={handleLogin}>Log in</Button>
                </Row>
                <Row justify='center'>
                    {error ? <p style={{color: '#ca0101'}}>{error}</p> : ''}
                </Row>
            </Container>
        </>
    )
}

export default LoginView;