import React, { useState } from 'react';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import { useSelector, useDispatch } from 'react-redux';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import { red } from '@material-ui/core/colors';
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import Collapse from '@material-ui/core/Collapse';
import TextField from '@material-ui/core/TextField';
import { KeyboardDatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import Button from '@material-ui/core/Button';
import SaveIcon from '@material-ui/icons/Save';
import FormHelperText from '@material-ui/core/FormHelperText';

const useStyles = makeStyles((theme) => ({
    root: {
        maxWidth: 345,
        marginTop: theme.spacing(1.75)
    },
    media: {
        height: 0,
        paddingTop: '56.25%', // 16:9
    },
    expand: {
        transform: 'rotate(0deg)',
        marginLeft: 'auto',
        transition: theme.transitions.create('transform', {
            duration: theme.transitions.duration.shortest,
        }),
    },
    expandOpen: {
        transform: 'rotate(180deg)',
    },
    avatar: {
        backgroundColor: red[500],
    }
}))

export default function VacationCard({ vacation }) {
    const token = useSelector(state => state.token)
    const classes = useStyles()
    const dispatch = useDispatch()
    const [description, setdescription] = useState(vacation.description)
    const [country, setcountry] = useState(vacation.country)
    const [image, setimage] = useState(vacation.image)
    const [date_start, setdate_start] = useState(new Date(vacation.date_start))
    const [date_finish, setdate_finish] = useState(new Date(vacation.date_finish))
    const [price, setprice] = useState(vacation.price)
    const [expanded, setExpanded] = useState(false)

    const handleExpandClick = () => {
        setExpanded(!expanded);
    }

    const deletevacation = async () => {
        const res = await fetch('http://localhost:1000/vacations/delete', {
            method: "DELETE",
            headers: { token, "Content-Type": "application/json" },
            body: JSON.stringify({ "vacation_id": vacation.vacation_id })
        })
        const data = await res.json()
        if (data.err) {
            alert(data.err)
        } else {
            dispatch({
                type: 'DELETE',
                payload: { vacations: data.vacations }
            })
        }
    }

    const editvacation = async () => {
        const res = await fetch('http://localhost:1000/vacations/edit', {
            method: "PUT",
            headers: { token, "Content-Type": "application/json" },
            body: JSON.stringify({ "vacation_id": vacation.vacation_id, country, description, image, date_start, date_finish, price })
        })
        const data = await res.json()
        if (data.err) {
            alert("there is some problem")
        } else {
            dispatch({
                type: 'EDIT',
                payload: { vacations: data.vacations }
            })
        }
    }

    return (
        <Card className={classes.root}>
            <CardHeader
                title={vacation.country}
                subheader={date_start.getDate() + "/" + (date_start.getMonth() + 1) + "/" + date_start.getFullYear() + "-" + date_finish.getDate() + "/" + (date_finish.getMonth() + 1) + "/" + date_finish.getFullYear()}
            />
            <CardMedia
                className={classes.media}
                image={vacation.image}
                title="country image"
            />
            <CardContent>
                <Typography variant="body2" color="textSecondary" component="p">
                    {vacation.description}</Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                    {vacation.price}$</Typography>
            </CardContent>
            <CardActions disableSpacing>
                <IconButton aria-label="delete vacation" onClick={deletevacation}>
                    <DeleteIcon />
                </IconButton>
                <IconButton className={clsx(classes.expand, {
                    [classes.expandOpen]: expanded,
                })}
                    onClick={handleExpandClick}
                    aria-expanded={expanded}
                    aria-label="open edit form">
                    <EditIcon />
                </IconButton>
            </CardActions>
            <Collapse in={expanded} timeout="auto" unmountOnExit>
                <CardContent>
                    <TextField labal="country" id="standard-basic" defaultValue={country} onChange={(e) => setcountry(e.target.value)} />
                    <TextField label="description" id="standard-basic" defaultValue={description} onChange={(e) => setdescription(e.target.value)} />
                    <TextField label="image url" id="standard-basic" defaultValue={image} onChange={(e) => setimage(e.target.value)} />
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <KeyboardDatePicker label="date of staring" disableToolbar variant="inline" format="dd/MM/yyyy" margin="normal" id="date-picker-inline"
                            value={date_start} onChange={(e) => setdate_start(e)} KeyboardButtonProps={{
                                'aria-label': 'change date',
                            }} />
                        <KeyboardDatePicker label="date of ending" disableToolbar variant="inline" format="dd/MM/yyyy" margin="normal" id="date-picker-inline"
                            value={date_finish} onChange={(e) => setdate_finish(e)} KeyboardButtonProps={{
                                'aria-label': 'change date',
                            }} />
                    </MuiPickersUtilsProvider>
                    <TextField label="price" id="standard-basic" defaultValue={price} onChange={(e) => setprice(e.target.value)} />
                    <p></p>
                    <Button variant="contained" color="primary" size="large" className={classes.button}
                        onClick={() => { handleExpandClick(); editvacation(); }} startIcon={<SaveIcon />}>Save Changes</Button>
                </CardContent>
            </Collapse>
        </Card>
    )
}
