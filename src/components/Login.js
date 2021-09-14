import React, { useState } from 'react'
import './Login.css'
import { Link, useHistory } from 'react-router-dom';
import { auth } from '../firebase';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const history = useHistory();

    const login = (e) => {
        e.preventDefault();
        auth.signInWithEmailAndPassword(email, password)
            .then((auth) => {
                //loged in + redirect to HomePage..
                history.push('/')
            })
            .catch((error) => alert(error.message))
        setEmail('');
        setPassword('');
    }
    
    const register = (e) => {
        e.preventDefault();
        auth.createUserWithEmailAndPassword(email, password)
            .then((auth) => {
                //create user and log in + redirect to HomePage..
                history.push('/')
            })
            .catch((error) => alert(error.message))
            setEmail('');
            setPassword('');    
    }

    return (
        <div className="login">
            <Link to='/'>
                <img src="https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg" alt="logo" />
            </Link>
            <div className="login__container">
                <h1>Sign-in</h1>
                <form>
                    <h5>E-mail</h5>
                    <input value={email} onChange={e => setEmail(e.target.value)} type="email" />
                    <h5>Password</h5>
                    <input value={password} onChange={e => setPassword(e.target.value)} type="password" />
                    <button onClick={login} type='submit' className='login__signBtn'>Sign In</button>
                </form>
                <p>By signing-in you agree to this clones Conditions of Use.
                        Please adhere to community guidlines.</p>
                <button onClick={register} className='login__createBtn'>Create your Amazon Account</button>
            </div>
        </div>
    )
}

export default Login
