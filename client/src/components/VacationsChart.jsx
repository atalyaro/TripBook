import React from 'react';
import Paper from '@material-ui/core/Paper';
import { Chart, BarSeries, Title, ArgumentAxis, ValueAxis } from '@devexpress/dx-react-chart-material-ui';
import { Stack, Animation } from '@devexpress/dx-react-chart';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    root: {
        margin: theme.spacing(1.2)
    }
})
)

export default function VacationsChart() {
    const [chartData, setchartData] = useState([])
    const token = useSelector(state => state.token)
    const classes = useStyles()

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
                console.log(data.err)
            }
        })()
    }, [])

    return (
        <div>
            <Paper className={classes.root}>
                <Chart
                    data={chartData}>
                    <ArgumentAxis />
                    <ValueAxis />

                    <BarSeries
                        name="followers"
                        valueField="followers"
                        argumentField="country"
                        color="#ffd700"
                    />
                    <Animation />
                    <Title text="Vacations Followers" />
                    <Stack />
                </Chart>
            </Paper>
        </div>
    )
}
