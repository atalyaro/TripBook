import React from 'react';
import { useState, useEffect } from 'react';

export default function RegisterPage({ setloginOrSignin, loginOrSignin }) {
    const [private_name, setprivate_name] = useState("")
    const [family_name, setfamily_name] = useState("")
    const [user_name, setuser_name] = useState("")
    const [password, setpassword] = useState("")
    const [error, seterror] = useState("")

    const adduser = async () => {
        const res = await fetch("http://localhost:1000/auth/register", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ private_name, family_name, user_name, password })
        })
        const data = await res.json()
        if (data.err) {
            seterror(data.msg)
        } else {
            seterror("you have signed in succesfully")
            setTimeout(() => {
                setloginOrSignin(!loginOrSignin)
            }, 2000)
        }
    }
    return (
        <div>
            <input type="text" placeholder="private name" onChange={(e) => setprivate_name(e.target.value)} />
            <input type="text" placeholder="family name" onChange={(e) => setfamily_name(e.target.value)} />
            <input type="text" placeholder="username" onChange={(e) => setuser_name(e.target.value)} />
            <input type="text" placeholder="password" onChange={(e) => setpassword(e.target.value)} />
            <button onClick={adduser}>Sign-up</button>
            <p>{error}</p>
            <p>already have an account? <button onClick={setloginOrSignin(!loginOrSignin)}>CLICK HERE</button></p>
        </div>
    )
}
