import React from 'react';
import { useState, useEffect } from 'react';
import Home from './components/Home';
import LoginPage from './components/LoginPage';
import RegisterPage from './components/RegisterPage';
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

function App() {
  const [User, setUser] = useState({})
  const dispatch = useDispatch()
  let token = useSelector(state => state.tokenReducer)

  useEffect(() => {
    (async () => {
      const res = await fetch("http://localhost:1000/auth/checkinglogin", {
        method: "GET",
        headers: { token },
      })
      const data = await res.json()
      if (!data.err) {
        setUser(data)
      } else if (data.err && data.msg === "jwt expired") {
        (async () => {
          const res = await fetch("http://localhost:1000/auth/refresh")
          const data = await res.json()
          if (!data.err) {
            dispatch({
              type: 'REFRESH',
              payload: { token: `${data.access_token}` },
            })
          } else {
            setUser({})
          }
        })()
      } else {
        setUser({})
      }
    })()
  }, [])

  return (
    <Router>
      <div className="App">
        <Home User={User} />
        <Switch>
          <Route path="/login" component={LoginPage} />
          <Route path="/register" component={RegisterPage} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
