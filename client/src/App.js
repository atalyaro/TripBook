import React from 'react';
import { useState, useEffect } from 'react';
import LoginPage from './components/LoginPage';
import RegisterPage from './components/RegisterPage';
import HomepageAdmin from './components/HomepageAdmin';
import HomepageUser from './components/HomepageUser';
import VacationForm from './components/VacationForm';
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

function App() {
  const [User, setUser] = useState({})
  const dispatch = useDispatch()
  const token = useSelector(state => state.token)
  const [loginOrSignin, setloginOrSignin] = useState(true)

  useEffect(() => {
    (async () => {
      const res = await fetch("http://localhost:1000/auth/refresh", {
        method: "GET",
        headers: { "refresh": `${localStorage.getItem("refresh_token")}` },
      })
      const data = await res.json()
      if (!data.err) {
        dispatch({
          type: 'REFRESH',
          payload: { token: `${data.access_token}` },
        })
        setUser(data.user)
      } else {
        setUser({})
      }
    })()
  }, [])

  useEffect(() => {
    (async () => {
      const res = await fetch("http://localhost:1000/auth/checkinglogin", {
        method: "GET",
        headers: { token },
      })
      const data = await res.json()
      if (!data.err) {
        setUser(data)
      } else {
        setUser({})
      }
    })()
  }, [token])


  return (
    <Router>
      <div className="App">
        {(() => {
          switch (User.access) {
            case 0:
              return (
                <HomepageUser />
              )
            case 1:
              return (
                <HomepageAdmin />
              )
            default:
              return (
                loginOrSignin ? <LoginPage setloginOrSignin={setloginOrSignin} loginOrSignin={loginOrSignin} /> :
                  <RegisterPage setloginOrSignin={setloginOrSignin} loginOrSignin={loginOrSignin} />
              )
          }
        })()}
        <Switch>
          <Route path="/login" component={LoginPage} />
          <Route path="/register" component={RegisterPage} />
          <Route path="/add" component={VacationForm} />
          <Route path="/home" component={App} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
