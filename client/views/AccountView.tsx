import * as React from 'react';
import Navbar from "../components/Navbar/Navbar";
import Container from "../components/Container";
import Input from "../components/Input/Input";
import Row from "../components/Row";
import Checkbox from "../components/Checkbox";
import Button from "../components/Button";

const AccountView = () => {

    const [email, setEmail] : [{ origin: string, current: string }, Function] = React.useState({ origin: '', current: '' });
    const [username, setUsername]: [{ origin: string, current: string }, Function] = React.useState({ origin: '', current: '' });
    const [stayAnonymous, setStayAnonymous]: [{ origin: boolean, current: boolean }, Function] = React.useState({ origin: true, current: true });

    const [unsavedChanges, setUnsavedChanges]: [boolean, Function] = React.useState(false);

    const handleKeyDown: Function = (e: KeyboardEvent) => {
        if (e.code === 'Space') e.preventDefault();
    }

    const getUserInfos = async () => {
        const res = await fetch('/auth/users/account', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify({
                userId: localStorage.getItem('id'),
                token: localStorage.getItem('token')
            })
        });

        const data = await res.json();

        if (data?.error) return console.error(data.error);

        if (data?.email) setEmail({ origin: data.email, current: data.email });
        if (data?.username) setUsername({ origin: data.username, current: data.username });
        if (data.hasOwnProperty('stayAnonymous')) setStayAnonymous({ origin: data.stayAnonymous, current: data.stayAnonymous });
    }

    const updateUserInfos = async () => {
        const res = await fetch('/auth/users/account/update', {
            method: 'PUT',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify({
                userId: localStorage.getItem('id'),
                token: localStorage.getItem('token'),
                email: email.current,
                username: username.current,
                stayAnonymous: stayAnonymous.current
            })
        });

        const data = await res.json();

        if (data?.error) return console.error(data.error);

        console.log(data);
    }

    React.useEffect(() => {
        getUserInfos()
            .then(() => console.log('Fetched User Informations'))
            .catch(e => console.error(e));
    }, [])

    React.useEffect(() => {
        if (email.origin !== email.current) return setUnsavedChanges(true);
        if (username.origin !== username.current) return setUnsavedChanges(true);
        if (stayAnonymous.origin !== stayAnonymous.current) return setUnsavedChanges(true);

        setUnsavedChanges(false);
    }, [email, username, stayAnonymous])

    return (<>
        <Navbar isLoggedIn={true} />
        <Container verticalPadding='2rem'>
            <h1 style={{ textAlign: 'center' }}>Account</h1>
            <Row align='center' verticalMargin='1rem'>
                <label style={{ width: '6rem', textAlign: 'right', marginRight: '0.5rem' }} htmlFor='email'>Email</label>
                <Input
                    id='email'
                    type='email'
                    value={email.current}
                    onInput={value => setEmail({ current: value, origin: email.origin })}
                    onKeyDown={handleKeyDown}
                />
            </Row>
            <Row align='center' verticalMargin='1rem'>
                <label style={{ width: '6rem', textAlign: 'right', marginRight: '0.5rem' }} htmlFor='username'>Username</label>
                <Input
                    id='username'
                    type='text'
                    value={username.current}
                    onInput={value => setUsername({ current: value, origin: username.origin })}
                    onKeyDown={handleKeyDown}
                />
            </Row>
            <Row align='center' verticalMargin='1rem'>
                <div style={{ width: '6rem', display: "flex", justifyContent: 'flex-end' }}>
                    <Checkbox id='anonymous' checked={stayAnonymous.current} onChange={bool => setStayAnonymous({ current: bool, origin: stayAnonymous.origin })}/>
                </div>
                <label htmlFor='anonymous'  style={{ marginLeft: '0.5rem' }}>Stay anonymous</label>
            </Row>
            <Row align='center' verticalMargin='2rem'>
                <Button template='primary' margin='0 6.5rem' onClick={updateUserInfos} disabled={!unsavedChanges}>Save changes</Button>
            </Row>
        </Container>
        </>);
}

export default AccountView;