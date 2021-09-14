import React, { useEffect } from 'react'
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import './App.css';
import Checkout from './components/Checkout';
import Header from './components/Header';
import Home from './components/Home';
import Login from './components/Login';
import { useStateValue } from './StateProvider';
import { auth } from './firebase';
import Payment from './components/Payment';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import Orders from './components/Orders';


const promise = loadStripe("pk_test_51JXlzRDJ45MoNMqTLhgGM2PnPakGVpwBtXxtEmqrJrVF6d3MzKksy6kHEA1Qxjm9OgDccaBudtb8DvYbwnGNddmN00SP60Wd1X");

function App() {
  const [{ user }, dispatch] = useStateValue();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (authUser){
        // user is logged in..
        dispatch({
          type: 'SET_USER',
          user: authUser,
        })
      } else {
        // user is logged out..
        dispatch({
          type: 'SET_USER',
          user: null,
        })
      }
    })
    return () => {
      unsubscribe();
    }
  }, []);

  
  return (
      <Router>
        <div className="app">
          <Switch>
            <Route path='/checkout'>
              <Header />
              <Checkout />
            </Route>
            <Route path='/orders'>
              <Header />
              <Orders />
            </Route>
            <Route path='/login'>
              <Login />
            </Route>
            <Route path='/payment'>
              <Header displaySearch />
              <Elements stripe={promise}>
                <Payment />
              </Elements>
            </Route>
            <Route path='/'>
              <Header />
              <Home />
            </Route>
          </Switch>
        </div>
      </Router>
  );
}

export default App;
