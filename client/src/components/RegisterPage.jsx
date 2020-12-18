import React from 'react'

export default function RegisterPage({ setloginOrSignin, loginOrSignin }) {

    return (
        <div>
            <input type="text" placeholder="private name" />
            <input type="text" placeholder="family name" />
            <input type="text" placeholder="username" />
            <input type="text" placeholder="password" />
            <button onClick={() => setloginOrSignin(!loginOrSignin)}>Sign-up</button>
        </div>
    )
}
