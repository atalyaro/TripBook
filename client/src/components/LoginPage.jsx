import React from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

export default function LoginPage({ loginOrSignin, setloginOrSignin }) {
    const [user_name, setuser_name] = useState("")
    const [password, setpassword] = useState("")
    const [error, seterror] = useState("")

    const dispatch = useDispatch()
    const token = useSelector(state => state.token)

    const login = async () => {
        const res = await fetch('http://localhost:1000/auth/login', {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ user_name, password })
        })
        const data = await res.json()
        if (data.err) {
            seterror(data.msg)
        } else {
            dispatch({
                type: 'LOGIN',
                payload: { token: `${data.access_token}` },
            })
            localStorage.setItem("refresh_token", data.refresh_token)
        }
    }

    return (
        <div>
            <input type="text" placeholder="username" onChange={e => setuser_name(e.target.value)} />
            <input type="password" placeholder="password" onChange={e => setpassword(e.target.value)} />
            <button onClick={login}>LOG IN</button>
            <p>{error}</p>
            <button onClick={() => setloginOrSignin(!loginOrSignin)}>New here? create new account</button>
        </div>
    )
}
