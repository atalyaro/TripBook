import React, { useState } from 'react';
import AddIcon from '@material-ui/icons/Add';
import { useSelector, useDispatch } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { KeyboardDatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import CssBaseline from '@material-ui/core/CssBaseline';

const useStyles = makeStyles((theme) => ({
    root: {
        maxWidth: 450,
    },
    media: {
        height: 0,
        paddingTop: '56.25%', // 16:9
    },
    paper: {
        margin: theme.spacing(2, 4),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
    input: {
        margin: theme.spacing(0.6)
    }
}))

export default function VacationForm({ setwhichpage }) {
    const classes = useStyles()
    const token = useSelector(state => state.token)
    const dispatch = useDispatch()
    const [description, setdescription] = useState()
    const [country, setcountry] = useState()
    const [image, setimage] = useState()
    const [date_start, setdate_start] = useState(new Date().toISOString().slice(0, 10))
    const [date_finish, setdate_finish] = useState(new Date().toISOString().slice(0, 10))
    const [price, setprice] = useState()

    const addvac = async () => {
        const res = await fetch("http://localhost:1000/vacations/add", {
            method: "POST",
            headers: { "token": token, "Content-Type": "application/json" },
            body: JSON.stringify({ description, country, image, date_start, date_finish, price })
        })
        const data = await res.json()
        if (!data.err) {
            dispatch({
                type: 'ADDVAC',
                payload: { vacations: data.vacations }
            })

            setwhichpage(0)
        } else {
            alert(data.msg)

        }
    }

    return (
        <Grid container component="main" className={classes.root}>
            <CssBaseline />
            <Grid item xs={12} sm={8} md={12} component={Paper} elevation={6} square direction="column">
                {/* <CardContent> */}
                <div className={classes.paper}>
                    <form className={classes.form} noValidate>
                        <TextField
                            className={classes.input}
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="country"
                            label="country"
                            name="country"
                            autoComplete="country"
                            autoFocus
                            defaultValue={country}
                            onChange={(e) => setcountry(e.target.value)}
                        />
                        <TextField
                            className={classes.input}
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            name="description"
                            label="description"
                            type="description"
                            id="description"
                            autoComplete="description"
                            defaultValue={description}
                            onChange={(e) => setdescription(e.target.value)}
                        />
                        <TextField
                            className={classes.input}
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            name="image url"
                            label="image url"
                            type="image url"
                            id="image url"
                            autoComplete="image url"
                            defaultValue={image}
                            onChange={(e) => setimage(e.target.value)}
                        />
                        <Grid container justify="center" >
                            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                <KeyboardDatePicker className={classes.input} label="date of staring" disableToolbar variant="inline" format="dd/MM/yyyy" margin="normal" id="date-picker-inline"
                                    value={date_start} onChange={(e) => setdate_start(e.toISOString().slice(0, 10))} KeyboardButtonProps={{
                                        'aria-label': 'change date',
                                    }} />
                                <KeyboardDatePicker className={classes.input} label="date of ending" disableToolbar variant="inline" format="dd/MM/yyyy" margin="normal" id="date-picker-inline"
                                    value={date_finish} onChange={(e) => setdate_finish(e.toISOString().slice(0, 10))} KeyboardButtonProps={{
                                        'aria-label': 'change date',
                                    }} />
                            </MuiPickersUtilsProvider>
                        </Grid>
                        <TextField
                            className={classes.input}
                            type="number"
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            name="price"
                            label="price"
                            id="price"
                            autoComplete="price"
                            defaultValue={price}
                            onChange={(e) => setprice(e.target.value)}
                        />
                        {/* <p>{error}</p> */}
                        <Button
                            fullWidth
                            variant="contained"
                            color="primary"
                            className={`${classes.submit} ${classes.input}`}
                            onClick={() => addvac()}
                            startIcon={<AddIcon />}
                        >
                            Add Vacation
            </Button>
                        <Grid container>
                            <Grid item>
                                <Link onClick={() => setwhichpage(0)} variant="body2">
                                    {"Back to homepage"}
                                </Link>
                            </Grid>
                        </Grid>
                    </form>
                </div>
            </Grid>
        </Grid>
    )
}
