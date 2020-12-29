import React from 'react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
// import FormControlLabel from '@material-ui/core/FormControlLabel';
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    root: {
        height: '100vh',
    },
    image: {
        backgroundImage: 'url(https://kedm.co.il/wp-content/uploads/2019/12/%D7%97%D7%95%D7%A4%D7%A9%D7%94-%D7%91%D7%9E%D7%9C%D7%93%D7%99%D7%91%D7%99%D7%9D-%D7%A2%D7%9D-%D7%A7%D7%93%D7%9D-1.jpg)',

        backgroundRepeat: 'no-repeat',
        backgroundColor:
            theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
        backgroundSize: 'cover',
        backgroundPosition: 'center',
    },
    paper: {
        margin: theme.spacing(8, 4),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%',
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

export default function LoginPage({ loginOrSignin, setloginOrSignin }) {
    const classes = useStyles();
    const [user_name, setuser_name] = useState("")
    const [password, setpassword] = useState("")
    const [error, seterror] = useState("")

    const dispatch = useDispatch()

    const login = async () => {
        const res = await fetch('http://localhost:1000/auth/login', {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ user_name, password })
        })
        const data = await res.json()
        if (data.err) {
            seterror(data.msg)
        } else {
            dispatch({
                type: 'LOGIN',
                payload: { token: `${data.access_token}` },
            })
            localStorage.setItem("refresh_token", data.refresh_token)
        }
    }

    return (
        <div>
            <Grid container component="main" className={classes.root}>
                <CssBaseline />
                <Grid item xs={false} sm={4} md={7} className={classes.image} />
                <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
                    <div className={classes.paper}>
                        <Avatar className={classes.avatar}>
                            <LockOutlinedIcon />
                        </Avatar>
                        <Typography component="h1" variant="h5">
                            Sign in
          </Typography>
                        <form className={classes.form} noValidate>
                            <TextField
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                id="username"
                                label="username"
                                name="username"
                                autoComplete="username"
                                autoFocus
                                onChange={e => setuser_name(e.target.value)}
                            />
                            <TextField
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                name="password"
                                label="Password"
                                type="password"
                                id="password"
                                autoComplete="current-password"
                                onChange={e => setpassword(e.target.value)}
                            />
                            <p className="error">{error}</p>
                            <Button
                                fullWidth
                                variant="contained"
                                color="primary"
                                className={classes.submit}
                                onClick={login}
                            >
                                Sign In
            </Button>
                            <Grid container>
                                <Grid item>
                                    <Link onClick={() => setloginOrSignin(!loginOrSignin)} variant="body2">
                                        {"Don't have an account? Sign Up"}
                                    </Link>
                                </Grid>
                            </Grid>
                        </form>
                    </div>
                </Grid>
            </Grid>

        </div>
    )
}
