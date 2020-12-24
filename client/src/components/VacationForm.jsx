import React, { useState } from 'react';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import { KeyboardDatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import InputAdornment from '@material-ui/core/InputAdornment';
import SaveAltIcon from '@material-ui/icons/SaveAlt';
import Button from '@material-ui/core/Button';
import { createMuiTheme } from '@material-ui/core/styles';
import { green } from '@material-ui/core/colors';
import { useDispatch, useSelector } from 'react-redux';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    margin: {
        margin: theme.spacing(1),
    },
    withoutLabel: {
        marginTop: theme.spacing(3),
    },
    textField: {
        width: '25ch',
    },
    palette: {
        primary: green,
    },
}));


export default function VacationForm({ setaddorall, addorall }) {
    const [country, setcountry] = useState("")
    const [description, setdescription] = useState("")
    const [image, setimage] = useState("")
    const [date_start, setdate_start] = useState(new Date())
    const [date_finish, setdate_finish] = useState(new Date())
    const [price, setprice] = useState()
    const classes = useStyles()
    const dispatch = useDispatch()
    const token = useSelector(state => state.token)

    const addvacation = async () => {
        const res = await fetch('http://localhost:1000/vacations/add', {
            method: "POST",
            headers: { token, "Content-Type": "application/json" },
            body: JSON.stringify({
                country, description, image, price,
                date_start: date_start.toISOString().slice(0, 10), date_finish: date_finish.toISOString().slice(0, 10)
            })
        })
        const data = await res.json()
        if (data.err) {
            alert(data.error.msg)
        } else {
            dispatch({
                type: 'ADDVAC',
                payload: { vacations: data.vacations }
            })
        }
    }

    return (
        <div>
            <FormHelperText id="outlined-weight-helper-text">country:</FormHelperText>
            <OutlinedInput
                id="outlined-adornment-weight" value={country} onChange={(e) => setcountry(e.target.value)}
                aria-describedby="outlined-weight-helper-text" inputProps={{
                    'aria-label': 'country',
                }} labelWidth={0} />
            <FormHelperText id="outlined-weight-helper-text">description:</FormHelperText>
            <OutlinedInput
                id="outlined-adornment-weight" value={description} onChange={(e) => setdescription(e.target.value)}
                aria-describedby="outlined-weight-helper-text" inputProps={{
                    'aria-label': 'description',
                }} labelWidth={0} />
            <FormHelperText id="outlined-weight-helper-text">image url:</FormHelperText>
            <OutlinedInput
                id="outlined-adornment-weight" value={image} onChange={(e) => setimage(e.target.value)}
                aria-describedby="outlined-weight-helper-text" inputProps={{
                    'aria-label': 'image',
                }} labelWidth={0} />
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <FormHelperText id="outlined-weight-helper-text">Date of starting:</FormHelperText>
                <KeyboardDatePicker disableToolbar variant="inline" format="dd/MM/yyyy" margin="normal" id="date-picker-inline"
                    value={date_start} onChange={(e) => setdate_start(e)} KeyboardButtonProps={{
                        'aria-label': 'start date',
                    }} />
                <FormHelperText id="outlined-weight-helper-text">Date of ending:</FormHelperText>
                <KeyboardDatePicker disableToolbar variant="inline" format="dd/MM/yyyy" margin="normal" id="date-picker-inline"
                    value={date_finish} onChange={(e) => setdate_finish(e)} KeyboardButtonProps={{
                        'aria-label': 'end date',
                    }} />
            </MuiPickersUtilsProvider>
            <FormHelperText id="outlined-weight-helper-text">price:</FormHelperText>
            <OutlinedInput
                id="outlined-adornment-weight" value={price} type="number" onChange={(e) => setprice(e.target.value)}
                aria-describedby="outlined-weight-helper-text" inputProps={{
                    'aria-label': 'price',
                }} labelWidth={0} startAdornment={<InputAdornment position="start">$</InputAdornment>} />
            <Button variant="contained" size="large" className={classes.button}
                onClick={() => { setaddorall(!addorall); addvacation(); }} startIcon={<SaveAltIcon />}>Add</Button>
        </div>
    )
}
