import React, { useState, useEffect } from 'react'
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
import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';

const useStyles = makeStyles((theme) => ({
    root: {
        maxWidth: 345,
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
    },
}))

export default function VacationCard({ vacation }) {
    const [follow, setfollow] = useState(false)
    const token = useSelector(state => state.token)
    const vacations = useSelector(state => state.vacationsuser)
    const classes = useStyles()
    const dispatch = useDispatch()
    const date_start = new Date(vacation.date_start)
    const date_finish = new Date(vacation.date_finish)

    useEffect(() => {
        (async () => {
            const res = await fetch("http://localhost:1000/follows/checkingfollow", {
                method: "POST",
                headers: { "token": token, "Content-Type": "application/json" },
                body: JSON.stringify({ "vacation_id": vacation.vacation_id })
            })
            const data = await res.json()
            if (!data.err) {
                setfollow(data.follow)
            } else {
                alert(data.err)
            }
        })()
    }, [vacations])

    const addfollow = async () => {
        const res = await fetch('http://localhost:1000/follows/addfollow', {
            method: "POST",
            headers: { token, "Content-Type": "application/json" },
            body: JSON.stringify({ "vacation_id": vacation.vacation_id })
        })
        const data = await res.json()
        if (data.err) {
            alert("there is some problem")
        } else {
            dispatch({
                type: 'ADD'
            })
        }
    }

    const deletefollow = async () => {
        const res = await fetch('http://localhost:1000/follows/deletefollow', {
            method: "DELETE",
            headers: { token, "Content-Type": "application/json" },
            body: JSON.stringify({ "vacation_id": vacation.vacation_id })
        })
        const data = await res.json()
        if (data.err) {
            alert("there is some problem")
        } else {
            dispatch({
                type: 'DISMISS'
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
                {follow ? <IconButton aria-label="add to follow" onClick={() => { setfollow(!follow); addfollow(); }}>
                    <FavoriteBorderIcon />
                </IconButton> :
                    <IconButton aria-label="delete follow" onClick={() => { setfollow(!follow); deletefollow(); }}>
                        <FavoriteIcon />
                    </IconButton>}
            </CardActions>
        </Card>
    )
}