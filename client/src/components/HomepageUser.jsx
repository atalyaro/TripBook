import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import VacationCardUser from "./VacationCardUser";

export default function HomepageUser() {
    const vacations = useSelector(state => state.vacationsuser)
    const dispatch = useDispatch()
    const token = useSelector(state => state.token)
    const follows = useSelector(state => state.follows)

    useEffect(() => {
        (async () => {
            const res = await fetch("http://localhost:1000/follows/howmanyfollows", {
                method: "GET",
                headers: { "token": token }
            })
            const data = await res.json()
            if (!data.err) {
                dispatch({
                    type: 'RIGTHNOW',
                    payload: { follows: data.follows[0]['COUNT(user_id)'] }
                })
            } else {
                console.log(data.err)
            }
        })()
    }, [])

    useEffect(() => {
        (async () => {
            const res = await fetch("http://localhost:1000/vacations/userall", {
                method: "GET",
                headers: { "token": token }
            })
            const data = await res.json()
            if (!data.err) {
                dispatch({
                    type: 'START',
                    payload: { vacations: data.allVacByOrder }
                })
            } else {
                console.log(data.msg)
            }
        })()
    }, [follows])

    const logout = async () => {
        const res = await fetch("http://localhost:1000/auth/logout")
        const data = await res.json()
        if (!data.err) {
            dispatch({
                type: 'LOGOUT',
            })
            delete localStorage["refresh_token"]
        } else {
            console.log(data.err)
        }
    }

    return (
        <div>
            <header>
                <button onClick={logout}>Logout</button>
            </header>
            <main>
                {vacations.map(v => <VacationCardUser key={v.id} vacation={v} />)}
            </main>
        </div>
    )
}
