import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import VacationCardAdmin from './VacationCardAdmin';
import { NavLink } from 'react-router-dom';
import { useEffect } from 'react';

export default function HomepageAdmin() {
    const vacations = useSelector(state => state.vacationsadmin)
    const token = useSelector(state => state.token)
    const dispatch = useDispatch()

    useEffect(() => {
        (async () => {
            const res = await fetch("http://localhost:1000/vacations/adminall", {
                method: "GET",
                headers: { "token": token }
            })
            const data = await res.json()
            if (!data.err) {
                dispatch({
                    type: 'GETALL',
                    payload: { vacations: data.vacations }
                })
            } else {
                alert(data.err)
            }
        })()
    }, [vacations])

    const logout = async () => {
        const res = await fetch("http://localhost:1000/auth/logout")
        const data = await res.json()
        if (!data.err) {
            dispatch({
                type: 'LOGOUT',
            })
            delete localStorage["refresh_token"]
        } else {
            alert("there is some problem")
        }
    }
    return (
        <div>
            <header>
                <button onClick={logout}>Logout</button>
                <button>CHARTS</button>
            </header>
            <main>
                <NavLink to="/add">Add Vacation</NavLink>
                {vacations.map(v => <VacationCardAdmin key={v.id} vacation={v} />)}
            </main>
        </div>
    )
}
