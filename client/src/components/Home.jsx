import React from 'react';
import HomepageUser from './HomepageUser';
import HomepageAdmin from './HomepageAdmin';
import LoginPage from './LoginPage';
import RegisterPage from './RegisterPage';
import { useState } from 'react';

export default function Home({ User }) {
    const [loginOrSignin, setloginOrSignin] = useState(true)
    return (
        <div>
            {(() => {
                switch (User.access) {
                    case 0:
                        return (
                            <HomepageUser user={User} />
                        )
                    case 1:
                        return (
                            <HomepageAdmin user={User} />
                        )
                    default:
                        return (
                            loginOrSignin ? <LoginPage setloginOrSignin={setloginOrSignin} loginOrSignin={loginOrSignin} /> :
                                <RegisterPage setloginOrSignin={setloginOrSignin} loginOrSignin={loginOrSignin} />
                        )
                }
            })()}
        </div>
    )
}
