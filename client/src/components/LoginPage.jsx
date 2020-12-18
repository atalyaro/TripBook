import React from 'react';

export default function LoginPage({ loginOrSignin, setloginOrSignin }) {
    return (
        <div>
            <input type="text" placeholder="username" />
            <input type="password" placeholder="password" />
            <button>LOG IN</button>
            <button onClick={() => setloginOrSignin(!loginOrSignin)}>New here? create new account</button>
        </div>
    )
}
