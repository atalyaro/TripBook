import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import VacationCardAdmin from './VacationCardAdmin';
import { useState, useEffect } from 'react';
import VacationForm from './VacationForm';
import VacationsChart from './VacationsChart';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import AddIcon from '@material-ui/icons/Add';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import BarChartIcon from '@material-ui/icons/BarChart';
import HomeOutlinedIcon from '@material-ui/icons/HomeOutlined';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    toolbar: {
        paddingRight: 24, // keep right padding when drawer closed
    },
    toolbarIcon: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: '0 8px',
        ...theme.mixins.toolbar,
    },
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    appBarShift: {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    menuButton: {
        marginRight: 36,
    },
    menuButtonHidden: {
        display: 'none',
    },
    title: {
        flexGrow: 1,
    },
    drawerPaper: {
        position: 'relative',
        whiteSpace: 'nowrap',
        width: drawerWidth,
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    drawerPaperClose: {
        overflowX: 'hidden',
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        width: theme.spacing(7),
        [theme.breakpoints.up('sm')]: {
            width: theme.spacing(9),
        },
    },
    appBarSpacer: theme.mixins.toolbar,
    content: {
        flexGrow: 1,
        height: '100vh',
        overflow: 'auto',
    },
    container: {
        paddingTop: theme.spacing(4),
        paddingBottom: theme.spacing(4)
    },
    paper: {
        padding: theme.spacing(2),
        display: 'flex',
        overflow: 'auto',
        flexDirection: 'column',
    },
}))

export default function HomepageAdmin() {
    const vacations = useSelector(state => state.vacationsadmin)
    const token = useSelector(state => state.token)
    const dispatch = useDispatch()
    const [whichpage, setwhichpage] = useState(0)

    const classes = useStyles();
    const [open, setOpen] = useState(false)
    const handleDrawerOpen = () => {
        setOpen(true)
    }
    const handleDrawerClose = () => {
        setOpen(false)
    }

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
                console.log(data.error)
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
            <div className={classes.root}>
                <CssBaseline />
                <AppBar position="absolute" className={clsx(classes.appBar, open && classes.appBarShift)}>
                    <Toolbar className={classes.toolbar}>
                        <IconButton
                            edge="start"
                            color="inherit"
                            aria-label="open drawer"
                            onClick={handleDrawerOpen}
                            className={clsx(classes.menuButton, open && classes.menuButtonHidden)}
                        >
                            <MenuIcon />
                        </IconButton>
                        <Typography component="h1" variant="h6" color="inherit" noWrap className={classes.title}>
                            {/* MENU */}
                        </Typography>
                    </Toolbar>
                </AppBar>
                <Drawer
                    variant="permanent"
                    classes={{
                        paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose),
                    }}
                    open={open}
                >
                    <div className={classes.toolbarIcon}>
                        <IconButton onClick={handleDrawerClose}>
                            <ChevronLeftIcon />
                        </IconButton>
                    </div>
                    <Divider />
                    <List>
                        <ListItem button onClick={() => { setwhichpage(0) }}>
                            <ListItemIcon>
                                <HomeOutlinedIcon />
                            </ListItemIcon>
                            <ListItemText primary="Home" />
                        </ListItem>
                        <ListItem button onClick={() => { setwhichpage(2) }}>
                            <ListItemIcon>
                                <BarChartIcon />
                            </ListItemIcon>
                            <ListItemText primary="Charts" />
                        </ListItem>
                        <ListItem button onClick={() => { setwhichpage(1) }}>
                            <ListItemIcon>
                                <AddIcon />
                            </ListItemIcon>
                            <ListItemText primary="Add Vacation" />
                        </ListItem>
                        <ListItem button onClick={logout}>
                            <ListItemIcon>
                                <ExitToAppIcon />
                            </ListItemIcon>
                            <ListItemText primary="Logout" />
                        </ListItem>
                    </List>
                </Drawer>
                <main className={classes.content}>
                    <div className={classes.appBarSpacer} />
                    <Container maxWidth="md" component="main">
                        {(() => {
                            switch (whichpage) {
                                case 1:
                                    return (
                                        <Grid container justify="center" >
                                            <VacationForm whichpage={whichpage} setwhichpage={setwhichpage} />
                                        </Grid>
                                    )
                                case 2:
                                    return (
                                        <VacationsChart whichpage={whichpage} setwhichpage={setwhichpage} />
                                    )
                                default:
                                    return (
                                        <Grid container spacing={5} alignItems="flex-end">
                                            {vacations.map((v) => (
                                                <Grid item xs={12} sm={12} md={4}>
                                                    <VacationCardAdmin key={v.id} vacation={v} />
                                                </Grid>)
                                            )}
                                        </Grid>
                                    )
                            }
                        })()}
                    </Container>
                </main>
            </div>
        </div>
    )
}
