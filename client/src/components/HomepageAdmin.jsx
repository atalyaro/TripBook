import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import VacationCardAdmin from './VacationCardAdmin';
import { useState, useEffect } from 'react';
import Button from '@material-ui/core/Button';
import VacationForm from './VacationForm';
import VacationsChart from './VacationsChart';

export default function HomepageAdmin() {
    const vacations = useSelector(state => state.vacationsadmin)
    const token = useSelector(state => state.token)
    const dispatch = useDispatch()
    const [addorall, setaddorall] = useState(true)
    const [chartsorall, setchartsorall] = useState(true)

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
                console.log(data.err)
            }
        })()
    }, [])

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
                <button onClick={() => { setchartsorall(!chartsorall) }}>CHARTS</button>
            </header>
            <main>
                <Button variant="contained" onClick={() => setaddorall(!addorall)}>Add Vacation</Button>
                {(() => {
                    switch (addorall) {
                        case false && chartsorall:
                            return (
                                <VacationForm setaddorall={setaddorall} addorall={addorall} />
                            )
                        case true && (!chartsorall):
                            return (
                                <VacationsChart />
                            )
                        default:
                            return (
                                vacations.map(v => <VacationCardAdmin key={v.id} vacation={v} />)
                            )
                    }
                })()}
                {/* //    chartsorall ? vacations.map(v => <VacationCardAdmin key={v.id} vacation={v} />) :
        //             <VacationForm setaddorall={setaddorall} addorall={addorall} />} */}
            </main>
        </div>
    )
}
