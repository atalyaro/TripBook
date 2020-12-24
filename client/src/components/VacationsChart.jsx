import React from 'react';
import Paper from '@material-ui/core/Paper';
import { Chart, BarSeries, Title, ArgumentAxis, ValueAxis } from '@devexpress/dx-react-chart-material-ui';
import { Animation } from '@devexpress/dx-react-chart';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

export default function VacationsChart() {
    const [chartData, setchartData] = useState([])
    const token = useSelector(state => state.token)

    useEffect(() => {
        (async () => {
            const res = await fetch("http://localhost:1000/vacations/admincharts", {
                method: "GET",
                headers: { "token": token }
            })
            const data = await res.json()
            console.log(data.vacations)
            if (!data.err) {
                setchartData(data.vacations)
            } else {
                alert(data.err)
            }
        })()
    }, [])

    return (
        <div>
            <Paper>
                <Chart
                    data={chartData}>
                    <ArgumentAxis />
                    <ValueAxis max={chartData.length} />

                    <BarSeries
                        valueField="followers"
                        argumentField="vacation_id"
                        barWidth={10}
                    />

                    <Title text="Vacation followers" />
                    <Animation />
                </Chart>
            </Paper>
        </div>
    )
}
